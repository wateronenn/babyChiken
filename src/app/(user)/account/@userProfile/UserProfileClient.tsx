'use client';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function UserProfileClient({ profile, token }: any) {
  const router = useRouter();
  const createdAt = new Date(profile.data.createdAt);

  return (
     <main className="bg-[var(--color-pastel-yellow)] min-h-screen w-full pt-[20px]">
            <h1 className="pt-8  text-center text-5xl font-bold mt-8 text-[var(--color-second-purple)]">Welcome {profile.data.username} !</h1>
            <div className="h-full bg-[var(--color-primary-blue)] flex flex-row gap-4 w-[70%] mx-auto mt-10 p-6 rounded-2xl ">
              <div className="flex flex-col items-center gap-4">
                        <Image
                          src={profile.data.picture}
                          alt="profile picture"
                          width={120}
                          height={120}
                          className="rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>
              <div className="flex flex-col gap-4 w-[50%]">
                <h1 className="text-xl font-bold text-[var(--color-second-purple)]" >{profile.data.username}</h1>
                <table className="table-auto border-separate border-spacing-2 mb-8">
                  <tbody>
                    <tr><td className="font-bold text-gray-600">Name</td><td className="text-gray-600">{profile.data.firstname}{" "}{profile.data.lastname}</td></tr>
                      <tr><td className="font-bold text-gray-600" >Email</td><td className="text-gray-600">{profile.data.email}</td></tr>
                      <tr><td className="font-bold text-gray-600">Tel</td><td className="text-gray-600">{profile.data.tel}</td></tr>
                      <tr><td className="font-bold text-gray-600">Member since </td><td className="text-gray-600">{createdAt.toString()}</td></tr>
                  </tbody>
              </table>
              </div> 
            </div>
            
            <div className="flex flex-row justify-center mt-8  gap-6">
              <button className="w-[15%] cursor-pointer mt-2 bg-[var(--color-primary-red)] text-white py-2 rounded-2xl shadow-xl px-2
              shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-red)]  hover:opacity-90 transition"
               onClick={() => signOut({ callbackUrl: '/car-rentals' })}>
                Sign Out
              </button>  
              <button className="w-[15%] cursor-pointer mt-2 bg-[var(--color-primary-purple)] text-white py-2 rounded-2xl shadow-xl 
              shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)]  hover:opacity-90 transition"
              onClick={() => router.push('/account/edit')}>
                Edit profile
              </button> 
              <button  className="w-[15%] cursor-pointer mt-2 bg-[var(--color-primary-purple)] text-white py-2 rounded-2xl shadow-xl 
              shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)]  hover:opacity-90 transition"
              onClick={() => router.push('/account/reset-password')}>
                Reset Password
              </button> 
            </div>
            
          
        </main>
      
   
  );
}