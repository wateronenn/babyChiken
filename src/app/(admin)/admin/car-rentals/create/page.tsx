"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import CarRentalForm from "@/components/CarRentalForm"
import { CarRentalItem } from "../../../../../../interface"
import { createCarRental } from "@/libs/function/carRental"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"

export default function CreateCarRentalPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CarRentalItem) => {
    console.log("FORM DATA:", data) 
    const token = (session?.user as any)?.token
    console.log("SESSION:", session)
    console.log("TOKEN:", token)

    if (!token) {
      alert("Please login first")
      return
    }

    try {
      setIsSubmitting(true)

      const payload: CarRentalItem = {
        ...data,
        picture: data.picture?.trim()
          ? convertGoogleDriveUrl(data.picture)
          : "/img/logo.png",
      }

      console.log("create payload:", payload)

      const result: any = await createCarRental(payload, token)
      console.log("create result:", result)

      if (result?.success === false) {
        throw new Error(result?.message || "Create car rental failed")
      }

      alert("Create car rental successfully")
      router.push("/admin/car-rentals")
    } catch (error) {
      console.error("create error:", error)
      alert("Failed to create car rental")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 pt-24">
      <CarRentalForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/car-rentals")}
        isSubmitting={isSubmitting}
      />
    </main>
  )
}