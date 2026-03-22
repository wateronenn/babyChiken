"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import CarRentalForm from "@/components/CarRentalForm"
import { CarRentalItem, CarRentalResponse } from "../../../../../../../interface"
import { getCarRentalById, updateCarRental } from "@/libs/function/carRental"

export default function EditCarRentalPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()

  const id = params.id as string

  const [defaultData, setDefaultData] = useState<Partial<CarRentalItem>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchCarRental = async () => {
      try {
        setIsLoading(true)

        const item: CarRentalResponse = await getCarRentalById(id)

        setDefaultData({
          name: item.name,
          address: item.address,
          district: item.district,
          province: item.province,
          postalcode: item.postalcode,
          tel: item.tel ?? "",
          region: item.region,
          car: item.car ?? [""],
          picture: item.picture ?? "",
        })
      } catch (error) {
        console.error(error)
        alert("Failed to load car rental")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchCarRental()
    }
  }, [id])

  const handleSubmit = async (data: CarRentalItem) => {
    const token = (session?.user as any)?.token

    if (!token) {
      alert("Please login first")
      return
    }

    try {
      setIsSubmitting(true)
      await updateCarRental(id, data, token)
      alert("Update car rental successfully")
      router.push(`/admin/car-rentals/${id}`)
    } catch (error) {
      console.error(error)
      alert("Failed to update car rental")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pt-24 px-6">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-24 px-6">
      <CarRentalForm
        mode="edit"
        defaultData={defaultData}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isSubmitting}
      />
    </main>
  )
}