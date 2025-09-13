"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RequireFeature } from "@/components/RequireFeature"; // adjust the import path if needed

export default function TrainingSupportPage() {
  const router = useRouter();

  return (
    <RequireFeature feature="Training-Support">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-lg p-10 max-w-xl text-center">
          <svg
            width="64"
            height="64"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-yellow-400 mb-4 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Training & Marketing Support
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            Kindly contact your RM for customized marketing material and training
            support tutorials and guidance for better understanding.
          </p>
          <p className="text-gray-800 font-semibold mb-8">Thank you!</p>
          <button
            onClick={() => router.push("/profile/rm-details")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow transition-all"
          >
            View RM Details
          </button>
        </div>
      </div>
    </RequireFeature>
  );
}
