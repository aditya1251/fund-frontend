import { DashboardContextProvider } from './context/DashboardContext';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "SUPERADMIN") {
    redirect("/login");
  }
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
        <title>Super Admin</title>
      </head>
      <body>
        <DashboardContextProvider>
          {children}
        </DashboardContextProvider>
      </body>
    </html>
  );
}
