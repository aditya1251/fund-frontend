// src/app/crm/commissions/page.tsx
"use client";
import React from "react";
import Loading from "@/components/Loading";
import {
  useGetMyCommissionsQuery,
} from "@/redux/services/commissionApi";

export default function CommissionsPage() {
  const { data = [], isLoading } = useGetMyCommissionsQuery();

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">My Commissions</h2>
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Loan</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td className="p-4" colSpan={5}>
                  No commissions found.
                </td>
              </tr>
            )}
            {data.map((c: any) => (
              <tr key={c._id} className="border-t">
                <td className="p-3">{c.loanId ?? c.loanRef ?? c._id}</td>
                <td className="p-3">
                  ₹ {Number(c.amount ?? 0).toLocaleString("en-IN")}
                </td>
                <td className="p-3">{c.status}</td>
                <td className="p-3">{c.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
