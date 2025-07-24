"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetAdminByIdQuery } from '@/redux/services/superadminApi';
import { useCreateNotificationMutation } from "@/redux/services/notificationApi";

const NotifyUserPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('id');

  const { data: user, isLoading: userLoading, error: userError } = useGetAdminByIdQuery(userId!, { skip: !userId });
  const [createNotification, { isLoading: isNotifying }] = useCreateNotificationMutation();

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
    } else if (name === "title") {
      setTitle(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (!message.trim()) {
      setSnackbar({ open: true, message: "Please enter a message", severity: "error" });
      return;
    }
    
    if (!title.trim()) {
      setSnackbar({ open: true, message: "Please enter a notification title", severity: "error" });
      return;
    }

    try {
      await createNotification({
        userId: userId,
        message: message.trim(),
        title: title.trim(),
      }).unwrap();
      
      setSnackbar({ open: true, message: "Notification sent successfully!", severity: "success" });
      setTimeout(() => router.push('/superadmin/users'), 1200);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.data?.error?.message || "Failed to send notification",
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
          Notify <span className="text-[#FFD439]">{user?.name || 'Admin'}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Notification Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
              placeholder="Enter notification title..."
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Notification Message</label>
            <textarea
              name="message"
              value={message}
              onChange={handleChange}
              required
              placeholder="Enter notification message here..."
              rows={4}
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isNotifying}
              className={`px-6 py-2 rounded-xl font-semibold border-2 border-black transition-all duration-300 ${
                isNotifying ? "bg-gray-300 cursor-not-allowed text-black" : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isNotifying ? "Sending..." : "Send Notification"}
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

export default NotifyUserPage;
