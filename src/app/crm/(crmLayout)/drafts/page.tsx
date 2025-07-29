"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  FileText, 
  Clock, 
  ChevronRight, 
  History,
  ClipboardEdit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RequireFeature } from "@/components/RequireFeature";
import Loading from "@/components/Loading";

interface Draft {
  id: string;
  templateId: string;
  templateName: string;
  formData: Record<string, any>;
  currentPage: number;
  timestamp: string;
  loanType: string;
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load all drafts
  useEffect(() => {
    const loadDrafts = () => {
      try {
        const storedDrafts = localStorage.getItem("loanFormDrafts");
        if (storedDrafts) {
          const parsedDrafts = JSON.parse(storedDrafts);
          // Sort by most recent first
          setDrafts(
            parsedDrafts.sort(
              (a: Draft, b: Draft) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            )
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading drafts:", error);
        setIsLoading(false);
      }
    };

    loadDrafts();
  }, []);

  // Function to delete a draft
  const deleteDraft = (id: string) => {
    try {
      const updatedDrafts = drafts.filter(draft => draft.id !== id);
      localStorage.setItem("loanFormDrafts", JSON.stringify(updatedDrafts));
      setDrafts(updatedDrafts);
    } catch (error) {
      console.error("Error deleting draft:", error);
    }
  };

  // Function to continue a draft
  const continueDraft = (draft: Draft) => {
    router.push(`/crm/loan-form?id=${draft.templateId}&draft=${draft.id}`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Group drafts by loan type
  const groupedDrafts: Record<string, Draft[]> = {};
  drafts.forEach(draft => {
    const loanType = draft.loanType || "Other";
    if (!groupedDrafts[loanType]) {
      groupedDrafts[loanType] = [];
    }
    groupedDrafts[loanType].push(draft);
  });

  return (
    <RequireFeature feature="Loans">
      {isLoading ? (
        <Loading />
      ) : (
      <div className="container mx-auto py-6 text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Saved Application Drafts</h1>
            <p className="text-gray-600 mt-1">
              Continue your previously saved applications
            </p>
          </div>
          {drafts.length > 0 && (
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => {
                if (confirm("Are you sure you want to delete all drafts?")) {
                  localStorage.removeItem("loanFormDrafts");
                  setDrafts([]);
                }
              }}
            >
              Clear All Drafts
            </Button>
          )}
        </div>

        {drafts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <History className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                No Saved Drafts Found
              </h2>
              <p className="text-gray-500 text-center mb-6">
                When you start filling out applications, they will be
                automatically saved here
              </p>
              <Button onClick={() => router.push("/crm/loans")}>
                Start a New Application
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedDrafts).map(([loanType, typeDrafts]) => (
              <div key={loanType}>
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> {loanType.charAt(0).toUpperCase() + loanType.slice(1)} Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {typeDrafts.map((draft) => (
                    <Card key={draft.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                          {draft.templateName}
                        </CardTitle>
                        <CardDescription className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(draft.timestamp)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 mb-1">
                            Progress: Page {draft.currentPage + 1}
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full">
                            <div
                              className="h-1.5 bg-yellow-400 rounded-full"
                              style={{
                                width: `${
                                  ((draft.currentPage + 1) / 
                                   (Object.keys(draft.formData).length / 5 || 1)) * 100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 justify-between">
                          <Button
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteDraft(draft.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-400 text-black hover:bg-yellow-500"
                            onClick={() => continueDraft(draft)}
                          >
                            <ClipboardEdit className="h-4 w-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </RequireFeature>
  );
}
