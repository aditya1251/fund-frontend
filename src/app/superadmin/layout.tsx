import { DashboardContextProvider } from './context/DashboardContext';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ThemeClientProvider from "@/app/superadmin/theme-client-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "superadmin") {
    redirect("/");
  }
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>Spike Next.js + Ts + Mui</title>
      </head>
      <body>
        <DashboardContextProvider>
          <ThemeClientProvider>
            {children}
          </ThemeClientProvider>
        </DashboardContextProvider>
      </body>
    </html>
  );
}
