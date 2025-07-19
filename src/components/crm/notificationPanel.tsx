"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, X } from "lucide-react";
import React, { useState } from "react";
import { useGetNotificationsQuery, useMarkAsReadMutation } from "@/redux/notificationApi";

type Notification = {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const NotificationPanel = ({ userId }: { userId: string }) => {
  const {
    data: notifications = [],
    refetch,
    isLoading,
  } = useGetNotificationsQuery(userId, { pollingInterval: 3600000 });

  const [markAsRead] = useMarkAsReadMutation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      refetch();
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  /* --- shared content renderer --- */
  const Content = () => (
    <>
      <h4 className="text-lg font-bold text-black mb-2">Notifications</h4>
      <hr className="mb-3 border-gray-200" />
      <div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((item: Notification) => (
            <div key={item._id} className="flex justify-between items-start">
              <div>
                <p className="text-black font-medium text-sm">{item.title}</p>
                <p className="text-gray-700 text-sm">{item.message}</p>
                <p className="text-yellow-500 text-xs mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              {!item.read && (
                <button
                  className="p-2 rounded-lg text-black opacity-75 text-sm cursor-pointer hover:opacity-100"
                  onClick={() => handleMarkAsRead(item._id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <>
      {/* DESKTOP / TABLET – unchanged dropdown */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-[#ffb700]"></span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4 bg-white shadow-lg rounded-xl" align="end">
            <Content />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* MOBILE – full-width drawer */}
      <div className="md:hidden">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setDrawerOpen(true)}
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-[#ffb700]"></span>
          )}
        </button>

        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setDrawerOpen(false)}
          >
            <aside
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl flex flex-col p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-black">Notifications</span>
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