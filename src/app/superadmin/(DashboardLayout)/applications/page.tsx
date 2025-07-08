"use client";

import { useState, useEffect } from "react";
import ApplicationCard from "@/components/ApplicationCard";

// TypeScript interface for application data
interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  rejectionReason?: string;
  credentials?: {
    username: string;
    password: string;
  };
}

export default function SuperAdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  
  // Current date and admin info
  const currentDate = "2025-06-27 15:35:11"; // You can use dynamic date if needed
  const adminUsername = "yashsingh9651";
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be a fetch call to your external backend API
        // Example: const response = await fetch('https://your-backend-api.com/applications');
        
        // For demo purposes, use mock data
        const mockApplications: Application[] = [
          {
            id: "app-1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "555-123-4567",
            organization: "Doe Foundation",
            purpose: "nonprofit",
            description: "Looking to raise funds for our community outreach program.",
            status: "pending",
            createdAt: "2025-06-25T10:30:00Z",
          },
          {
            id: "app-2",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "555-987-6543",
            organization: "Smith Enterprises",
            purpose: "business",
            description: "Need funding for our startup expansion.",
            status: "pending",
            createdAt: "2025-06-26T14:45:00Z",
          },
          {
            id: "app-3",
            firstName: "Michael",
            lastName: "Johnson",
            email: "michael.j@example.com",
            phone: "555-456-7890",
            organization: "Johnson College",
            purpose: "education",
            description: "Fundraising for scholarship programs.",
            status: "approved",
            createdAt: "2025-06-20T09:15:00Z",
            credentials: {
              username: "michaelj",
              password: "Edu$2025!X"
            }
          },
          {
            id: "app-4",
            firstName: "Emily",
            lastName: "Williams",
            email: "emily.w@example.com",
            phone: "555-789-1234",
            organization: "",
            purpose: "personal",
            description: "Medical expenses fundraising.",
            status: "rejected",
            createdAt: "2025-06-18T16:20:00Z",
            rejectionReason: "Insufficient information provided about fundraising purpose. Please reapply with more details about your medical expenses and fundraising goal."
          },
        ];
        
        setApplications(mockApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        showNotification("Failed to load applications", "error");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, []);
  
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    // Hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };
  
  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected", data: any) => {
    try {
      setIsLoading(true);
      
      // Prepare API request payload
      const requestBody = {
        status: newStatus,
        ...(newStatus === "approved" && { credentials: data.credentials }),
        ...(newStatus === "rejected" && { rejectionReason: data.rejectionReason })
      };
      
      // This would be your actual API call to the external backend
      // Replace this comment with your actual API call
      // Example:
      // const response = await fetch(`https://your-backend-api.com/applications/${id}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${accessToken}`
      //   },
      //   body: JSON.stringify(requestBody)
      // });
      // 
      // if (!response.ok) throw new Error('Failed to update application status');
      // const result = await response.json();
      
      // For demo purposes, simulate API success
      // In production, remove this simulation and uncomment the actual API call above
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state to reflect changes
      setApplications(prevApplications => {
        return prevApplications.map(app => {
          if (app.id === id) {
            if (newStatus === "approved") {
              return {
                ...app,
                status: newStatus,
                credentials: data.credentials
              };
            } else if (newStatus === "rejected") {
              return {
                ...app,
                status: newStatus,
                rejectionReason: data.rejectionReason
              };
            }
          }
          return app;
        });
      });
      
      // Show success notification
      showNotification(
        newStatus === "approved"
          ? "User application approved and credentials sent successfully!"
          : "User application rejected and notification sent.",
        "success"
      );
    } catch (error) {
      console.error(`Error ${newStatus === "approved" ? "approving" : "rejecting"} application:`, error);
      showNotification(
        `Failed to ${newStatus === "approved" ? "approve" : "reject"} user application.`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredApplications = applications.filter(app => app.status === activeTab);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-center ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {notification.message}
        </div>
      )}
      
      <div className="p-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Applications</h1>
            <p className="mt-2 text-gray-600">Review and manage user account requests.</p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "pending"
                  ? "border-[#F7C430] text-[#F7C430]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Pending
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {applications.filter(app => app.status === "pending").length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("approved")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "approved"
                  ? "border-[#F7C430] text-[#F7C430]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Approved
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {applications.filter(app => app.status === "approved").length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("rejected")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "rejected"
                  ? "border-[#F7C430] text-[#F7C430]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rejected
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {applications.filter(app => app.status === "rejected").length}
              </span>
            </button>
          </nav>
        </div>
        
        {/* Applications List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7C430]"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">No {activeTab} applications found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}