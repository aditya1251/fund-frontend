"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { useCreateWithdrawMutation, useGetMyWithdrawalsQuery } from "@/redux/services/withdrawalApi";
import { Button } from "@/components/ui/button";
import CommissionsPage from "./commissionblock";
import { useGetMyCommissionsQuery, CommissionResponse } from "@/redux/services/commissionApi";

export default function WithdrawalsPage() {
  const { data: commissionsData } = useGetMyCommissionsQuery();
  const commissions = commissionsData?.commissions || [];
  const summary = commissionsData?.summary || { balance: 0, totalCommissionEarned: 0 };
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number | "">("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null); // error state
  const [success, setSuccess] = useState<string | null>(null); // success state
  const [createWithdraw, { isLoading: creating }] = useCreateWithdrawMutation();
  const { data = [], isLoading, refetch } = useGetMyWithdrawalsQuery();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // Check if amount exceeds balance
    const currentBalance = Number(summary?.balance || 0);
    if (Number(amount) > currentBalance) {
      setError("Withdrawal amount cannot exceed your available balance");
      return;
    }

    try {
      await createWithdraw({ amount: Number(amount), remarks }).unwrap();
      setAmount("");
      setRemarks("");
      refetch();
      setSuccess("Withdraw request submitted successfully");
    } catch (err: any) {
      setError(err?.data?.message || "Error submitting withdrawal");
    }
  };

  // if (isLoading) return <Loading />;

  return (
    <div className="container text-black mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row bg-white p-4 rounded shadow mb-6 justify-between items-center gap-2">
        <h5>Balance: <strong>₹ {Number(summary?.balance).toLocaleString("en-IN")}</strong></h5>
        <h5>Total Commissions Earned: <strong>₹ {Number(summary?.totalCommissionEarned).toLocaleString("en-IN")}</strong></h5>
        <h5>No. of Commissions: <strong>{commissions?.length}</strong></h5>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Withdrawals</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3 relative">
          <div className="w-full md:w-1/3 relative">
            <input
              type="number"
              min={1}
              max={Number(summary?.balance)}
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
              className={`border rounded px-3 py-2 w-full ${
                amount && Number(amount) > Number(summary?.balance) 
                  ? 'border-red-500 focus:outline-red-500' 
                  : 'focus:outline-blue-500'
              }`}
            />
            {amount && Number(amount) > Number(summary?.balance) && (
              <div className="text-red-500 text-xs mt-1">
                Cannot exceed ₹{Number(summary?.balance).toLocaleString("en-IN")}
              </div>
            )}
          </div>
          <input
            placeholder="Remarks (optional)"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/2"
          />
          <Button 
            type="submit" 
            disabled={creating || (!!amount && Number(amount) > Number(summary?.balance))} 
            className="w-full md:w-auto"
          >
            {creating ? "Requesting..." : "Request Withdraw"}
          </Button>
        </form>

        {/* Error message */}
        {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

        {/* Success message */}
        {success && <div className="mt-3 text-green-600 text-sm">{success}</div>}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">My Withdrawal Requests</h3>
        {Array.isArray(data) && data.length === 0 && <div>No requests yet.</div>}
        <ul className="space-y-2">
          {Array.isArray(data) && data.map((w: any) => (
            <li key={w._id} className="flex justify-between items-center border p-3 rounded">
              <div>
                <div className="font-medium">₹ {Number(w.amount).toLocaleString("en-IN")}</div>
                <div className="text-xs text-gray-600">Status: {w.status}</div>
              </div>
              <div>
                {w.remarks && <div className="text-sm">Remarks: {w.remarks}</div>}
                <div className="text-sm text-gray-500">{new Date(w.createdAt).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CommissionsPage commissions={commissions} />
    </div>
  );
}
