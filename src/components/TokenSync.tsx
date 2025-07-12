"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/store";

export default function TokenSync() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToken(session?.user?.token || null));
  }, [session, dispatch]);
  return null;
} 