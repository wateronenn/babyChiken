// app/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"

const carImages = [
  "/img/bg1.png",
  "/img/bg2.png",
  "/img/bg3.png",
  "/img/bg4.png",
  "/img/bg5.png",
]

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0)

  const handleChangeImage = () => {
    setCurrentImage((prev) => (prev + 1) % carImages.length)
  }

  return (
    <main
      onClick={handleChangeImage}
      className="relative min-h-screen cursor-pointer overflow-hidden pt-[70px]"
    >

      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${carImages[currentImage]})`,
        }}
      />

      <div className="absolute inset-0 bg-[var(--color-pastel-yellow)]/60" />

      <div className="relative z-10 flex min-h-[calc(100vh-70px)] flex-col items-center justify-center px-6 text-center font-sans">
        
        <h1
          className="font-serif mb-6 text-5xl md:text-7xl text-[var(--color-second-purple)]"
          style={{
            textShadow: "1px 1px 0 rgba(0,0,0,0.2)",
          }}
        >
          Find rental cars near you
        </h1>

        <p className="mb-8 max-w-xl text-base md:text-lg text-[var(--color-second-purple)]">
          Search, compare, and book your ride in seconds.
        </p>

        <div className="flex flex-col items-center gap-3 mt-8">
          <Link href="/login">
            <button className="min-w-[220px] px-10 py-3 text-2xl font-medium text-white rounded-full bg-[var(--color-primary-purple)] shadow-xl shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)] transition">
              LOG IN
            </button>
          </Link>

          <Link href="/register">
            <button className="text-xl font-medium text-[var(--color-second-purple)] hover:underline">
              Register
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}