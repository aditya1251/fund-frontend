"use client";
import { useGetPlansQuery } from "@/redux/services/plansApi";
import {
  useCreateAdminMutation,
  useGetUsersByRoleQuery,
} from "@/redux/services/superadminApi";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    planId: "",
    phone: "",
    role: "DSA",
    rmId: "",
  });
  const {
    data: plans = [],
    isLoading: plansLoading,
    error: plansError,
  } = useGetPlansQuery();

  // Fetch RMs for assignment to DSAs using RTK Query
  const {
    data: rmUsers = [],
    isLoading: loadingRMs,
    error: rmError,
  } = useGetUsersByRoleQuery("RM", {
    // Skip the query if no token is available
    skip: !token,
  });

  // Handle RM fetch errors
  useEffect(() => {
    if (rmError) {
      setSnackbar({
        open: true,
        message: "Failed to load RMs",
        severity: "error",
      });
    }
  }, [rmError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // If role is changed, reset role-specific fields
    if (name === "role") {
      if (value === "DSA") {
        setForm((prev) => ({ ...prev, [name]: value }));
      } else {
        // For RM or SUPERADMIN, clear rmId
        setForm((prev) => ({ ...prev, [name]: value, rmId: "" }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!form.planId) {
      setSnackbar({
        open: true,
        message: "Please select a plan",
        severity: "error",
      });
      return;
    }
    try {
      await createAdmin({ ...form, type: "adminCreation" }).unwrap();
      setSnackbar({
        open: true,
        message: "User created successfully!",
        severity: "success",
      });
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        planId: "",
        role: "DSA",
        rmId: "",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.data?.error?.message || "Failed to create admin",
        severity: "error",
      });
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-[6px_6px_0_0_#000] border-2 border-black rounded-xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
          Register <span className="text-[#FFD439]">New User</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="DSA">DSA</option>
              <option value="RM">RM</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
            </select>
          </div>

          {/* Conditionally show RM selection for DSA users */}
          {form.role === "DSA" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Assign RM
              </label>
              <select
                name="rmId"
                value={form.rmId}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select a RM</option>
                {loadingRMs ? (
                  <option value="" disabled>
                    Loading RMs...
                  </option>
                ) : rmUsers.length > 0 ? (
                  rmUsers.map((rm: any) => (
                    <option value={rm._id} key={rm._id}>
                      {rm.name} ({rm.email})
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No RMs available
                  </option>
                )}
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Plan
            </label>
            <select
              name="planId"
              value={form.planId}
              onChange={handleChange}
              required
              disabled={plansLoading}
              className="w-full border-2 border-black rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              {plansLoading ? (
                <option value="">Loading...</option>
              ) : plansError ? (
                <option value="">Failed to load plans</option>
              ) : (
                <>
                  <option value="">Select a plan</option>
                  {plans
                    .filter((plan: any) => plan.isActive)
                    .map((plan: any) => (
                      <option value={plan._id} key={plan._id}>
                        {plan.name}
                      </option>
                    ))}
                </>
              )}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isCreating}
              className={`px-6 py-2 rounded-xl font-semibold border-2 border-black transition-all duration-300 cursor-pointer ${
                isCreating
                  ? "bg-gray-300 cursor-not-allowed text-black"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isCreating ? "Creating..." : `Register ${form.role}`}
            </button>
          </div>
        </form>

        {/* Snackbar/Alert */}
        {snackbar.open && (
          <div
            className={`mt-6 rounded-xl p-4 text-sm font-medium text-white transition-all ${
              snackbar.severity === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {snackbar.message}
          </div>
        )}
      </div>
    </div>
  );
}
