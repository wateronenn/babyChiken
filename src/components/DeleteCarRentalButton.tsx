"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { deleteCarRental } from "@/libs/function/carRental"
import StyledButton from "@/components/StyledButton"

type DeleteCarRentalButtonProps = {
  id: string
  name?: string
}

export default function DeleteCarRentalButton({
  id,
  name,
}: DeleteCarRentalButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name || "this car rental"}?`
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
    <StyledButton
      title="Delete"
      color="red"
      onClick={handleDelete}
    />
  )
}