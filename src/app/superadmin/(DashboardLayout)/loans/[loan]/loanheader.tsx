"use client";

import React, { JSX, useEffect, useState } from "react";
import { Plus, User, Home, Building2, Car, Landmark, X } from "lucide-react";
import {
  useGetLoanTemplatesByTypeQuery,
  useCreateLoanTemplateMutation,
} from "@/redux/services/loanTemplateApi";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

const iconMap: Record<string, JSX.Element> = {
  personal: <User className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  business: <Building2 className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
  property: <Landmark className="w-5 h-5" />,
};

const getIcon = (name: string): JSX.Element => {
  const key = name.toLowerCase();
  if (key.includes("personal")) return iconMap.personal;
  if (key.includes("home")) return iconMap.home;
  if (key.includes("business")) return iconMap.business;
  if (key.includes("car")) return iconMap.car;
  if (key.includes("property")) return iconMap.property;
  return <User className="w-5 h-5" />;
};

const LoanHeader = ({
  loan,
  selected,
  setSelected,
}: {
  loan: string;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { data: session, status } = useSession(); // ✅ safe way to handle session in client components
  const { data, isLoading, error, refetch } =
    useGetLoanTemplatesByTypeQuery(loan);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [createLoanTemplate] = useCreateLoanTemplateMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    description: "",
  });

  const handleCreate = async () => {
    try {
      await createLoanTemplate({
        ...formData,
        loanType: loan,
        createdBy: session ? session.user.email : "Admin123",
        pages: [
          {
            title: "Personal Info",
            pageNumber: 1,
            fixed: true,
            fields: [
              { label: "Name", type: "text", required: true, fixed: true },
              { label: "Email", type: "text", required: true, fixed: true },
              { label: "Phone", type: "text", required: true, fixed: true },
              { label: "Age", type: "number", required: true, fixed: true },  
            ],
          },
        ],
      }).unwrap();
      setShowModal(false);
      setFormData({ name: "", icon: "", description: "" });
      refetch();
    } catch (err) {
      console.error("Error creating loan:", err);
    }
  };

  if (isLoading) return <Loading/>;
  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading loan templates
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black">
          {loan.charAt(0).toUpperCase() + loan.slice(1)} Loans
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded-full border-2 border-black hover:bg-gray-900 transition-all">
          <Plus className="w-4 h-4" />
          Add Loan Template
        </button>
      </div>

      {/* Loan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data?.map(
          (template: { id: string; name: string; description: string }) => (
            <div
              key={template.id}
              onClick={() => setSelected(template.id)}
              className={`flex items-start gap-4 p-4 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#000] cursor-pointer transition-all duration-200 ${
                selected === template.id ? "bg-[#FFD439]" : "bg-white"
              } hover:shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5`}>
              <div className="text-black">{getIcon(template.name)}</div>
              <div>
                <div className="font-semibold text-lg text-black capitalize">
                  {template.name}
                </div>
                <p className="!text-xs  text-gray-600">
                  {template.description}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl border-2 border-black shadow-[8px_8px_0_0_#000] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-black hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-black">
              Create New Loan
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border-2 border-black px-4 py-2 rounded-lg bg-white"
                  placeholder="Loan name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Icon Keyword
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full border-2 border-black px-4 py-2 rounded-lg bg-white"
                  placeholder="e.g., car, home"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border-2 border-black px-4 py-2 rounded-lg bg-white"
                  placeholder="Loan description"
                />
              </div>

              <div className="text-right pt-4">
                <button
                  onClick={handleCreate}
                  className="bg-black text-white px-6 py-2 rounded-full border-2 border-black hover:bg-gray-900 transition-all">
                  Create Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanHeader;
