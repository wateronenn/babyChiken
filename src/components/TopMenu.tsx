'use client'

import TopMenuItem from "./TopMenuItem"
import { useSession } from "next-auth/react"

export default function TopMenu(){

    // ดึง session ของ user
    const { data: session } = useSession()

    // ดึง role
    const role = (session?.user as any)?.role

    return (
        <div className="text-white fixed top-0 left-0 bg-[var(--color-primary-purple)] w-full h-[50px] z-30 flex flex-row justify-between items-center px-6">
            
            {/* Left */}
            <div>
                <TopMenuItem title="Rental Car Center" pageRef="/" />
            </div>

            {/* Right */}
            <div className="flex flex-row gap-6 items-center">

                {/* role-based menu */}
                {session && (
                    role === "admin" ? (
                        <TopMenuItem title="Dashboard" pageRef="/admin" />
                    ) : (
                        <TopMenuItem title="Bookings" pageRef="/bookings" />
                    )
                )}

                {/* Account logic */}
                <TopMenuItem 
                    title="Account" 
                    pageRef={session ? "/account" : "/api/auth/signin"} 
                />

            </div>
        </div>
    )
}