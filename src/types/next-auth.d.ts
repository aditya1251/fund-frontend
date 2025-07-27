import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      id?: string;
      token?: string;
      rmId?: string | null;
      planName?: string | null;
      planId?: string | null;
    };
  }
} 