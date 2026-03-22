'use client';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function UserProfileClient({ profile, token }: any) {
  const router = useRouter();
  const createdAt = new Date(profile.data.createdAt);

  return (
     <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">User profile {profile.data.username}</div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                  <tr><td>Name </td><td>{profile.data.firstname}{" "}{profile.data.lastname}</td></tr>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Tel</td><td>{profile.data.tel}</td></tr>
                    <tr><td>Member since </td><td>{createdAt.toString()}</td></tr>
                </tbody>
            </table>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut({ callbackUrl: '/car-rentals' })}>
          Sign Out
        </button>  
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/account/edit')}>
          Edit profile
        </button> 
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/account/reset-password')}>
          Reset Password
        </button> 
        </main>
      
   
  );
}