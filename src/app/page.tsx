// app/page.tsx
'use client'
import Link from "next/link";
export default function HomePage() {
  return (
    <main>
      <div  className="flex flex-col bg-[var(--color-pastel-yellow)] items-center justify-between min-h-screen">
        <h1> For bg Image with cool text above</h1>
        <div className="flex flex-col items-center gap-4 mb-20">
          <Link href="/login">
          <button className="w-full px-8 cursor-pointer mt-2 bg-[var(--color-primary-purple)] text-white py-2 rounded-2xl shadow-xl shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)]  hover:opacity-90 transition" >Login</button>
        </Link>

        <Link href="/register">
          <button className ="cursor-pointer text-[var(--color-second-purple)]" >Register</button>
        </Link>
        </div>
        
      </div>
      
    </main>
  );
}