"use client";
import { useState } from "react";
import { Pencil, Trash2, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
} from "@/redux/services/superadminApi";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  planName: string;
  createdAt: string;
  isDeleted?: boolean;
}

export default function ManageAdmins() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const {
    data: admins = [],
    isLoading,
    isError,
    refetch,
  } = useGetAdminsQuery(undefined);
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteAdmin(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete admin");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/superadmin/users/edit?id=${id}`);
  };

  const handleNotify = (id: string) => {
    router.push(`/superadmin/users/notify?id=${id}`);
  };
    
  const filteredAdmins = admins.filter((admin: Admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.planName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true :
      statusFilter === "active" ? !admin.isDeleted :
      admin.isDeleted;

    const matchesRole =
      roleFilter === "all" ? true :
      admin.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manage <span className="text-[#FFD439]">Users</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View, filter, and manage all your registered users.
          </p>
          
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name, email or plan"
            className="w-full border border-black rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-black rounded-xl px-4 py-3 text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full border border-black rounded-xl px-4 py-3 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button
            className=" px-6 py-3 bg-[#FFD439] text-black font-semibold rounded-xl shadow hover:bg-yellow-400 transition"
            onClick={() => router.push("/superadmin/users/add")}
          >
            + Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-black rounded-xl overflow-hidden">
            <thead className="bg-[#FFD439] text-black font-semibold">
              <tr>
                <th className="px-4 py-3 border-b border-black">Name</th>
                <th className="px-4 py-3 border-b border-black">Email</th>
                <th className="px-4 py-3 border-b border-black">Plan</th>
                <th className="px-4 py-3 border-b border-black">Role</th>
                <th className="px-4 py-3 border-b border-black">Created</th>
                <th className="px-4 py-3 border-b border-black">Status</th>
                <th className="px-4 py-3 border-b border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isDeleting ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-red-500">Failed to load admins.</td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">No matching admins found.</td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => {
                  const disabled = admin.isDeleted || admin.role === "SUPERADMIN";
                  return (
                    <tr key={admin._id} className="hover:bg-gray-100 transition-all">
                      <td className="px-4 py-3 border-b border-black">{admin.name}</td>
                      <td className="px-4 py-3 border-b border-black">{admin.email}</td>
                      <td className="px-4 py-3 border-b border-black">{admin.planName}</td>
                      <td className="px-4 py-3 border-b border-black font-medium uppercase text-xs">
                        <span className={`px-2 py-1 rounded-full ${admin.role === "SUPERADMIN" ? "bg-black text-white" : "bg-white border border-black text-black"}`}>
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-black">{new Date(admin.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 border-b border-black">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          admin.isDeleted ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        }`}>
                          {admin.isDeleted ? "Deleted" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-black flex gap-2">
                        <button
                          className={`p-2 rounded-full transition-all ${
                            disabled
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-black hover:bg-gray-800 text-white"
                          }`}
                          disabled={disabled}
                          onClick={() => handleNotify(admin._id)}
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-full transition-all ${
                            disabled
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-black hover:bg-gray-800 text-white"
                          }`}
                          disabled={disabled}
                          onClick={() => handleEdit(admin._id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-full transition-all ${
                            disabled
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                          disabled={disabled}
                          onClick={() => handleDelete(admin._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
