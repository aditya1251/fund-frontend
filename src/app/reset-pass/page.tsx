"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useResetPassMutation, useVerifyResetPassMutation } from "../../redux/services/superadminApi";
import Image from "next/image";
import ui4 from "../../../public/assets/Team.png";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession();

  const [resetPass, { isLoading: isResetLoading }] = useResetPassMutation();
  const [verifyResetPass, { isLoading: isVerifyLoading }] = useVerifyResetPassMutation();

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setEmail(session.user.email as string);
    }
  }, [status, session]);

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const response = await resetPass({ email }).unwrap();
      setSuccess("Reset code sent to your email. It will expire in 15 minutes.");
      setStep(2);
    } catch (error) {
      setError("Failed to send reset code. Please verify your email address.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await verifyResetPass({ 
        email, 
        resetCode: parseInt(resetCode), 
        newPassword 
      }).unwrap();
      
      setSuccess("Password reset successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError("Failed to reset password. Please check your code and try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col justify-center w-full max-w-md mx-auto px-4 md:px-8 py-12 md:max-w-none md:w-1/2">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-6">
            <Link href="/login" className="flex items-center text-sm text-black hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to login
            </Link>
          </div>
          
          <h1 className="text-2xl text-black text-center mb-2">RESET PASSWORD</h1>
          <p className="text-center text-sm text-[#474747] mb-10">
            {step === 1 
              ? "Enter your email to receive a reset code" 
              : "Enter the code sent to your email and create a new password"}
          </p>

          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleSendResetCode}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-black">
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
                  disabled={status === "authenticated" && !!session?.user?.email}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f7c430] py-3 px-4 rounded-md font-medium text-black cursor-pointer hover:bg-[#f7c430]/90 transition-colors duration-200 disabled:opacity-70"
                disabled={isResetLoading}
              >
                {isResetLoading ? "Sending..." : "Send Reset Code"}
              </button>

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center">{success}</div>}
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div className="space-y-2">
                <label htmlFor="resetCode" className="block text-sm font-medium text-black">
                  Reset Code
                </label>
                <input
                  id="resetCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full px-3 py-3 bg-[#f1f1f1] rounded-md border-0 outline-none text-black"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-black">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-3 py-3 bg-[#f1f1f1] rounded-md border-0 outline-none text-black"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-3 bg-[#f1f1f1] rounded-md border-0 outline-none text-black"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#f7c430] py-3 px-4 rounded-md font-medium text-black cursor-pointer hover:bg-[#f7c430]/90 transition-colors duration-200 disabled:opacity-70"
                disabled={isVerifyLoading}
              >
                {isVerifyLoading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                className="w-full bg-gray-200 py-3 px-4 rounded-md font-medium text-black cursor-pointer hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center">{success}</div>}
            </form>
          )}
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-8">
        <Image
          src={ui4}
          alt="Reset Password Illustration"
          width={500}
          height={500}
          className="max-w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
