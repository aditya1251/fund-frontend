"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { useCreateWithdrawMutation, useGetMyWithdrawalsQuery } from "@/redux/services/withdrawalApi";
import { Button } from "@/components/ui/button";
import CommissionsPage from "./commissionblock";

export default function WithdrawalsPage() {
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

  if (isLoading) return <Loading />;

  return (
    <div className="container text-black mx-auto py-6 px-4">
      <CommissionsPage />
      <h2 className="text-2xl font-semibold mb-4">Withdrawals</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="number"
            min={1}
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded px-3 py-2 w-full md:w-1/3"
          />
          <input
            placeholder="Remarks (optional)"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-1/2"
          />
          <Button type="submit" disabled={creating} className="w-full md:w-auto">
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
        {data.length === 0 && <div>No requests yet.</div>}
        <ul className="space-y-2">
          {data.map((w: any) => (
            <li key={w._id} className="flex justify-between items-center border p-3 rounded">
              <div>
                <div className="font-medium">₹ {Number(w.amount).toLocaleString("en-IN")}</div>
                <div className="text-xs text-gray-600">Status: {w.status}</div>
                {w.remarks && <div className="text-sm mt-1">{w.remarks}</div>}
              </div>
              <div className="text-sm text-gray-500">{new Date(w.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
