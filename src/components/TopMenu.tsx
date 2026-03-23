'use client';

import TopMenuItem from "./TopMenuItem";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TopMenu() {
  const { data: session, status } = useSession();

  return (
    <div className="text-white fixed top-0 left-0 bg-[var(--color-primary-purple)] w-full h-[50px] z-30 flex flex-row justify-between items-center px-6">
      <div>
        <TopMenuItem title="Rental Car Center" pageRef="/car-rentals" />
      </div>
      <div className="flex flex-row gap-6">
        <TopMenuItem title="Bookings" pageRef="/bookings" />
        <div>
          {status === 'loading' ? (
            <div className="px-3 py-1">...</div>
          ) : session ? (
            <Link href="/account">
              <div className="px-3 py-1 text-white font-bold">
                Account ({session.user?.username})
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div className="px-3 py-1 text-white font-bold">
                Sign In
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}