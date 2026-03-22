'use client';

import TopMenuItem from "./TopMenuItem";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TopMenu() {
  const { data: session, status } = useSession();

  const role = (session?.user as any)?.role;

  return (
    <div className="text-white fixed top-0 left-0 bg-[var(--color-primary-purple)] w-full h-[50px] z-30 flex flex-row justify-between items-center px-6">
      
      <div>
        <TopMenuItem title="Rental Car Center" pageRef="/car-rentals" />
      </div>

      <div className="flex flex-row gap-6 items-center">

        {status !== "loading" && session && (
          role === "admin" ? (
            <TopMenuItem title="Dashboard" pageRef="/admin/car-rentals" />
          ) : (
            <TopMenuItem title="Bookings" pageRef="/bookings" />
          )
        )}

        <div>
          {status === "loading" ? (
            <div className="px-3 py-1">...</div>
          ) : session ? (
            <Link href="/account">
              <div className="px-3 py-1 font-bold hover:underline cursor-pointer">
                Account ({(session.user as any)?.username || session.user?.email})
              </div>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <div className="px-3 py-1 font-bold hover:underline cursor-pointer">
                Sign In
              </div>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}