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
    <main>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="currentPassword"
          type="password"
          placeholder="Current Password"
          required
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </main>
  );
}