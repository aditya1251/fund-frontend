// src/app/crm/commissions/page.tsx
"use client";
import React from "react";
import {
  Commission
} from "@/redux/services/commissionApi";

export default function CommissionsPage({commissions}) {
  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">My Commissions</h2>
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Loan</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {commissions.length === 0 && (
              <tr>
                <td className="p-4" colSpan={5}>
                  No commissions found.
                </td>
              </tr>
            )}
            {commissions.map((c: Commission) => (
              <tr key={c._id} className="border-t">
                <td className="p-3">{c.loanId ?? c.loanRef ?? c._id}</td>
                <td className="p-3">
                  ₹ {Number(c.amount ?? 0).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
