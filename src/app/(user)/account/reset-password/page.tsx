'use client';
import { useRouter } from "next/navigation"; 
import {resetPassword } from "@/libs/function/user";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function resetPasswordPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

    if (!session) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.newPassword.value !== form.confirmPassword.value) {
      alert("New password and confirm password do not match");
      return;
    }
    try{
        const res = await resetPassword(
        session?.user.token ,
        form.currentPassword.value,
        form.newPassword.value,
        form.confirmPassword.value,
      );
      alert('Password reset successfully, Please login again');
      signOut({ callbackUrl: '/login' })
      
    }
    catch(err){
      console.error(err);
      alert('Password reset failed');
    }
  };

  return (
    <main className="bg-[var(--color-pastel-yellow)] min-h-screen w-full pt-[20px]">
      <h1 className="text-center text-5xl font-bold mt-8 text-[var(--color-second-purple)]" >Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mx-auto mt-10 p-6" >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)] mb-3"> Current password </label>
          <input 
          name="currentPassword"
          type="password"
          required
          className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border 
          border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
        />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)] mb-3"> New password </label>
          <input
          name="newPassword"
          type="password"
          required
          className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border 
          border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)] mb-3"> Confirm new password </label>
          <input
          name="confirmPassword"
          type="password"
          required
          className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border 
          border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
          />
        </div>
        <div className="flex flex-row justify-center">
          <button
          onClick={() => router.push('/account')}
          className=" cursor-pointer mt-2 bg-[var(--color-primary-red)] text-white py-2 px-8 mx-3 rounded-2xl shadow-xl shadow-[var(--color-second-red)] hover:bg-[var(--color-second-red)]  hover:opacity-90 transition"
          > cancel </button>
          <button type="submit" className="w-[20%] cursor-pointer mt-2 bg-[var(--color-primary-purple)] text-white py-2 rounded-2xl shadow-xl 
          shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)]  hover:opacity-90 transition">Reset Password</button>
        </div>
        
      </form>
    </main>
  );
}