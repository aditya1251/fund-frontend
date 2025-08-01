"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, X } from "lucide-react";
import React, { useState } from "react";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from "@/redux/services/notificationApi";

type Notification = {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  priority?: "high" | "medium" | "low";
};

const PAGE_SIZE = 10;

const NotificationPanel = ({
  userId,
  pane,
}: {
  userId: string;
  pane: "left" | "right";
}) => {
  const [page, setPage] = useState(1);
  const {
    data,
    refetch,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({ userId, page, limit: PAGE_SIZE });

  const [markAsRead] = useMarkAsReadMutation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const notifications: Notification[] = data?.notifications || [];
  const total = data?.total || 0;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      refetch();
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.read);
      await Promise.all(unread.map((n) => markAsRead(n._id)));
      refetch();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const NotificationItem = ({ item }: { item: Notification }) => {
    const priorityColor =
      item.priority === "high"
        ? "bg-red-500"
        : item.priority === "medium"
        ? "bg-yellow-500"
        : "bg-green-500";

    return (
      <div
        className={`p-4 rounded-md border shadow-sm transition-all ${
          item.read ? "bg-white" : "bg-yellow-50 border-yellow-300"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-2">
            <span className={`w-2 h-2 rounded-full mt-1 ${priorityColor}`} />
            <div>
              <h5 className="font-semibold text-sm text-gray-900">
                {item.title}
              </h5>
              <p className="text-sm text-gray-700 mt-1">{item.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {!item.read && (
            <button
              onClick={() => handleMarkAsRead(item._id)}
              className="text-xs text-blue-600 hover:text-blue-800 border border-blue-500 px-2 py-0.5 rounded hover:bg-blue-50 transition"
            >
              <Check className="w-3 h-3 inline-block mr-1" />
              Read
            </button>
          )}
        </div>
      </div>
    );
  };

  const Content = () => (
    <>
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-white z-10 pb-1">
        <h4 className="text-lg font-bold text-black">Notifications</h4>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 border px-2 py-1 rounded hover:bg-blue-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      <hr className="mb-3 border-gray-200" />

      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
        {isLoading || isFetching ? (
          <div className="space-y-3">
            <div className="h-16 bg-gray-100 rounded animate-pulse" />
            <div className="h-16 bg-gray-100 rounded animate-pulse" />
            <div className="h-16 bg-gray-100 rounded animate-pulse" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        ) : (
          <>
            {notifications.map((item) => (
              <NotificationItem key={item._id} item={item} />
            ))}
            {page * PAGE_SIZE < total && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="text-center text-sm text-blue-600 hover:text-blue-800 hover:underline mt-2"
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb700] text-black text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[480px] p-4 bg-white shadow-lg rounded-xl max-h-[600px] overflow-y-auto"
            align={pane === "right" ? "start" : "end"}
          >
            <Content />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setDrawerOpen(true)}
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-[#ffb700]" />
          )}
        </button>

        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setDrawerOpen(false)}
          >
            <aside
              className="fixed top-0 right-0 h-full w-[90vw] max-w-sm bg-white shadow-xl flex flex-col p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-white pb-2 flex items-center justify-between mb-2">
                <span className="font-bold text-black text-lg">Notifications</span>
                <button onClick={() => setDrawerOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Content />
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
