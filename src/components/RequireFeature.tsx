import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RequireFeature({ feature, children }: { feature: string; children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const features: string[] = (session?.user as any)?.features || [];

  if (!features.includes(feature)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-lg p-10 flex flex-col items-center">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Included in Your Plan</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">This feature is not available in your current subscription. Upgrade your plan to unlock access to this page and more powerful tools!</p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow transition-all"
            onClick={() => {
              router.push('/#home');
              setTimeout(() => {
                if (typeof window !== 'undefined') {
                  const el = document.getElementById('home');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }, 400);
            }}
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
} 