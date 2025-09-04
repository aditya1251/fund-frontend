"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useCreateWithdrawMutation,
  useGetMyWithdrawalsQuery,
} from "@/redux/services/withdrawalApi";
import { Button } from "@/components/ui/button";
import CommissionsPage from "./commissionblock";
import { useGetMyCommissionsQuery } from "@/redux/services/commissionApi";
import { useRouter } from "next/navigation";
import { useGetBankInfoQuery } from "@/redux/services/dsaApi";

export default function WithdrawalsPage() {
  const { data: commissionsData, isLoading: commissionsLoading } =
    useGetMyCommissionsQuery();
  const commissions = commissionsData?.commissions || [];
  const summary = commissionsData?.summary || {
    balance: 0,
    totalCommissionEarned: 0,
  };
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number | "">("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hasBankInfo, setBankInfo] = useState<boolean>(false);
  const [createWithdraw, { isLoading: creating }] = useCreateWithdrawMutation();
  const {
    data = [],
    isLoading: withdrawalsLoading,
    refetch,
  } = useGetMyWithdrawalsQuery();
  const userId = session?.user?.id;

  const { data: bankInfo, isLoading: bankLoading } = useGetBankInfoQuery(userId!, {
    skip: !userId, // 🚀 prevents the empty-string call
  });


  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

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

  useEffect(() => {
    if (bankInfo && bankInfo.accountNumber !== "" && bankInfo.bankName !== "") {
      setBankInfo(true);
    }
  }, [bankInfo]);

  return (
    <div className="container text-black mx-auto py-6 px-4">
      {/* Balance & Summary Section */}
      <div className="flex flex-col md:flex-row bg-white p-4 rounded shadow mb-6 justify-between items-center gap-2">
        {commissionsLoading ? (
          <div className="w-full flex justify-between gap-4 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <h5>
              Balance:{" "}
              <strong>
                ₹ {Number(summary?.balance).toLocaleString("en-IN")}
              </strong>
            </h5>
            <h5>
              Total Commissions Earned:{" "}
              <strong>
                ₹{" "}
                {Number(summary?.totalCommissionEarned).toLocaleString("en-IN")}
              </strong>
            </h5>
            <h5>
              No. of Commissions: <strong>{commissions?.length}</strong>
            </h5>
          </>
        )}
      </div>

      {/* Bank Info Missing */}
      {bankLoading ? (
        <div className="bg-white p-4 rounded shadow mb-6 animate-pulse">
          <div className="h-5 w-1/2 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      ) : !hasBankInfo && !commissionsLoading ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex flex-col justify-between md:flex-row gap-3 relative">
            Update your bank details to withdraw funds.
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => router.push("/crm/profile")}>
              Update Bank Details
            </button>
          </div>
        </div>
      ) : null}

      {hasBankInfo && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Withdrawals</h2>

          {/* Withdraw Form */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <form
              onSubmit={onSubmit}
              className="flex flex-col md:flex-row gap-3 relative">
              <div className="w-full md:w-1/3 relative">
                <input
                  type="number"
                  min={1}
                  max={Number(summary?.balance)}
                  placeholder="Amount (₹)"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={`border rounded px-3 py-2 w-full ${
                    amount && Number(amount) > Number(summary?.balance)
                      ? "border-red-500 focus:outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
                {amount && Number(amount) > Number(summary?.balance) && (
                  <div className="text-red-500 text-xs mt-1">
                    Cannot exceed ₹
                    {Number(summary?.balance).toLocaleString("en-IN")}
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
                disabled={
                  creating ||
                  (!!amount && Number(amount) > Number(summary?.balance))
                }
                className="w-full md:w-auto">
                {creating ? "Requesting..." : "Request Withdraw"}
              </Button>
            </form>

            {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}
            {success && (
              <div className="mt-3 text-green-600 text-sm">{success}</div>
            )}
          </div>

          {/* Withdrawal Requests */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">My Withdrawal Requests</h3>
            {withdrawalsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border p-3 rounded animate-pulse">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    <div className="w-40 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : Array.isArray(data) && data.length === 0 ? (
              <div>No requests yet.</div>
            ) : (
              <ul className="space-y-2">
                {Array.isArray(data) &&
                  data.map((w: any) => (
                    <li
                      key={w._id}
                      className="flex justify-between items-center border p-3 rounded">
                      <div>
                        <div className="font-medium">
                          ₹ {Number(w.amount).toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs text-gray-600">
                          Status: {w.status}
                        </div>
                      </div>
                      <div>
                        {w.remarks && (
                          <div className="text-sm">Remarks: {w.remarks}</div>
                        )}
                        <div className="text-sm text-gray-500">
                          {new Date(w.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </>
      )}

      {!commissionsLoading && <CommissionsPage commissions={commissions} />}
    </div>
  );
}
