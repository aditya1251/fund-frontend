"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ui4 from "../../../public/assets/Team.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.replace("/");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col justify-center w-full max-w-md mx-auto px-4 md:px-8 py-12 md:max-w-none md:w-1/2">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl text-black text-center mb-2">WELCOME BACK</h1>
          <p className="text-center text-sm text-[#474747] mb-10">
            Sign in with your social account or enter your details
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-3 bg-[#f1f1f1] rounded-md border-0 outline-none text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 bg-[#f1f1f1] rounded-md border-0 outline-none text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <Link
              href="/reset-pass"
              className="text-sm underline text-black float-right"
            >
              Forgot Password ?
            </Link>{" "}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f7c430] py-3 px-4 rounded-md font-medium text-black cursor-pointer hover:bg-[#f7c430]/90 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
            {error && (
              <div className="text-red-600 text-sm text-center mt-2">
                {error}
              </div>
            )}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <div className="text-center text-sm text-black">
              Don't have an account?{" "}
              <Link href="/contact" className="font-semibold">
                contact us
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-8">
        <Image
          src={ui4}
          alt="Collaboration illustration"
          width={500}
          height={500}
          className="max-w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
