// src/app/crm/commissions/page.tsx
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { useGetMyCommissionsQuery, useUpdateCommissionMutation, useCreditCommissionMutation } from "@/redux/services/commissionApi";
import { Button } from "@/components/ui/button";

export default function CommissionsPage() {
  const { data: session } = useSession();
  const { data = [], isLoading, refetch } = useGetMyCommissionsQuery();
  const [updateCommission] = useUpdateCommissionMutation();
  const [creditCommission] = useCreditCommissionMutation();
  const role = session?.user?.role;

  const [editId, setEditId] = useState<string | null>(null);
  const [editRemarks, setEditRemarks] = useState("");

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
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr><td className="p-4" colSpan={5}>No commissions found.</td></tr>
            )}
            {data.map((c: any) => (
              <tr key={c._id} className="border-t">
                <td className="p-3">{c.loanId ?? c.loanRef ?? c._id}</td>
                <td className="p-3">₹ {Number(c.amount ?? 0).toLocaleString("en-IN")}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3">
                  {editId === c._id ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editRemarks}
                      onChange={(e) => setEditRemarks(e.target.value)}
                    />
                  ) : (
                    c.remarks || "-"
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {/* RM and SUPERADMIN can update */}
                  {(role === "RM" || role === "SUPERADMIN") && editId !== c._id && (
                    <Button size="sm" onClick={() => { setEditId(c._id); setEditRemarks(c.remarks || ""); }}>
                      Edit
                    </Button>
                  )}
                  {editId === c._id && (
                    <>
                      <Button size="sm" onClick={async () => {
                        await updateCommission({ id: c._id, data: { remarks: editRemarks } });
                        setEditId(null);
                        refetch();
                      }}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditId(null)}>Cancel</Button>
                    </>
                  )}
                  {role === "SUPERADMIN" && c.status !== "credited" && (
                    <Button size="sm" onClick={async () => {
                      await creditCommission({ id: c._id });
                      refetch();
                    }}>Mark Credited</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
