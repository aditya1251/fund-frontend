"use client";
import { useEffect, useState } from "react";
import { useGetPlansQuery } from '@/redux/services/plansApi';
import { useUpdateAdminMutation, useGetAdminByIdQuery, useGetUsersByRoleQuery } from '@/redux/services/superadminApi';
import { useSearchParams, useRouter } from 'next/navigation';

const EditUserPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('id');

  const { data: plans = [], isLoading: plansLoading, error: plansError } = useGetPlansQuery();
  const { data: user, isLoading: userLoading, error: userError } = useGetAdminByIdQuery(userId!, { skip: !userId });
  const { data: rmUsers = [], isLoading: rmLoading } = useGetUsersByRoleQuery("RM");

  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({ name: "", email: "", role: "", planId: "", rmId: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        planId: user.planId,
        rmId: user.rmId?._id || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (!form.planId) {
      setSnackbar({ open: true, message: "Please select a plan", severity: "error" });
      return;
    }
    
    if (form.role === "DSA" && !form.rmId) {
      setSnackbar({ open: true, message: "Please select a RM for the DSA", severity: "error" });
      return;
    }

    try {
      const update: any = { id: userId, type: "adminUpdation" };
      if (form.name !== user.name) update.name = form.name;
      if (form.email !== user.email) update.email = form.email;
      if (form.role !== user.role) update.role = form.role;
      if (form.planId !== user.planId) update.planId = form.planId;
      
      // Only include rmId if role is DSA
      if (form.role === "DSA") {
        const currentRmId = user.rmId?._id || "";
        if (form.rmId !== currentRmId) update.rmId = form.rmId;
      } else {
        // If role is not DSA, set rmId to null/empty
        if (user.rmId) update.rmId = "";
      }

      await updateAdmin({ id: userId, body: update }).unwrap();
      setSnackbar({ open: true, message: "Admin updated successfully!", severity: "success" });
      setTimeout(() => router.push('/superadmin/users'), 1200);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.data?.error?.message || "Failed to update admin",
        severity: "error"
      });
    }
  };

  if (userLoading) return <div className="p-6">Loading user...</div>;
  if (userError) return <div className="p-6 text-red-600 font-semibold">Failed to load user.</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white border-2 border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
          Edit <span className="text-[#FFD439]">Admin</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="">Select a role</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
              <option value="RM">RM</option>
              <option value="DSA">DSA</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Plan{" "}
              {user && user.planName && (
                <span className="text-sm text-gray-500">(Current: {user.planName})</span>
              )}
            </label>
            <select
              name="planId"
              value={form.planId}
              onChange={handleChange}
              required
              disabled={plansLoading}
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
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

          {/* RM Selection for DSA role */}
          {form.role === "DSA" && (
            <div>
              <label className="block mb-1 text-sm font-medium">
                Select RM{" "}
                {user && user.rmId && (
                  <span className="text-sm text-gray-500">(Current: {user.rmId.name})</span>
                )}
              </label>
              <select
                name="rmId"
                value={form.rmId}
                onChange={handleChange}
                required={form.role === "DSA"}
                disabled={rmLoading}
                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
              >
                {rmLoading ? (
                  <option value="">Loading RMs...</option>
                ) : (
                  <>
                    <option value="">Select a RM</option>
                    {rmUsers.map((rm: any) => (
                      <option value={rm._id} key={rm._id}>
                        {rm.name} ({rm.email})
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className={`px-6 py-2 rounded-xl font-semibold border-2 border-black transition-all duration-300 ${
                isUpdating ? "bg-gray-300 cursor-not-allowed text-black" : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isUpdating ? "Updating..." : "Update Admin"}
            </button>
          </div>
        </form>

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
};

export default EditUserPage;
