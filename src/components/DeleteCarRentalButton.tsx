"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { deleteCarRental } from "@/libs/function/carRental"

type DeleteCarRentalButtonProps = {
  id: string
  name?: string
}

export default function DeleteCarRentalButton({
  id,
  name,
}: DeleteCarRentalButtonProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `ต้องการลบ ${name || "car rental"} ใช่ไหม?`
    )

    if (!confirmed) return

    const token = (session?.user as any)?.token

    if (!token) {
      alert("Please login first")
      return
    }

    try {
      setIsDeleting(true)
      await deleteCarRental(id, token)
      alert("Delete car rental successfully")
      router.push("/admin/car-rentals")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete car rental")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-full bg-[#f4b8b8] px-7 py-3 font-medium text-white shadow-sm transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  )
}