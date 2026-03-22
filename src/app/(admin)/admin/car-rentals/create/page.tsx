"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import CarRentalForm from "@/components/CarRentalForm"
import { CarRentalItem } from "../../../../../../interface"
import { createCarRental } from "@/libs/function/carRental"

export default function CreateCarRentalPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CarRentalItem) => {
    const token = (session?.user as any)?.token

    if (!token) {
      alert("Please login first")
      return
    }

    try {
      setIsSubmitting(true)
      await createCarRental(data, token)
      alert("Create car rental successfully")
      router.push("/admin/car-rentals")
    } catch (error) {
      console.error(error)
      alert("Failed to create car rental")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pt-24 px-6">
      <CarRentalForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/car-rentals")}
        isSubmitting={isSubmitting}
      />
    </main>
  )
}