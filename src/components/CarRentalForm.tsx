"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { CarRentalItem } from "../../interface"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"
import StyledButton from "@/components/StyledButtonCarRental"

type CarRentalFormProps = {
  mode?: "create" | "edit"
  defaultData?: Partial<CarRentalItem>
  onSubmit?: (data: CarRentalItem) => void | Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
}

export default function CarRentalForm({
  mode = "create",
  defaultData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CarRentalFormProps) {
  const [formData, setFormData] = useState<CarRentalItem>({
    name: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    region: "",
    car: [""],
    picture: "",
    pricePerDay: 0,
    rentedUser: 0,
  })

  const [preview, setPreview] = useState("")
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!defaultData) return

    const pictureUrl = defaultData.picture ?? ""

    setFormData({
      name: defaultData.name ?? "",
      address: defaultData.address ?? "",
      district: defaultData.district ?? "",
      province: defaultData.province ?? "",
      postalcode: defaultData.postalcode ?? "",
      tel: defaultData.tel ?? "",
      region: defaultData.region ?? "",
      car: defaultData.car && defaultData.car.length > 0 ? defaultData.car : [""],
      picture: pictureUrl,
      pricePerDay: defaultData.pricePerDay ?? 0,
      rentedUser: defaultData.rentedUser ?? 0,
    })

    setPreview(convertGoogleDriveUrl(pictureUrl))
    setImageError(false)
  }, [defaultData])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === "picture") {
      setFormData((prev) => ({
        ...prev,
        picture: value,
      }))
      setPreview(convertGoogleDriveUrl(value))
      setImageError(false)
      return
    }

    if (name === "pricePerDay" || name === "rentedUser") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCarChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedCars = [...(prev.car ?? [""])]
      updatedCars[index] = value
      return {
        ...prev,
        car: updatedCars,
      }
    })
  }

  const addCarField = () => {
    setFormData((prev) => ({
      ...prev,
      car: [...(prev.car ?? []), ""],
    }))
  }

  const removeCarField = (index: number) => {
    setFormData((prev) => {
      const currentCars = prev.car ?? [""]

      if (currentCars.length === 1) {
        return {
          ...prev,
          car: [""],
        }
      }

      return {
        ...prev,
        car: currentCars.filter((_, i) => i !== index),
      }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const cleanedData: CarRentalItem = {
      ...formData,
      picture: formData.picture ?? "",
      car: (formData.car ?? [])
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      pricePerDay: Number(formData.pricePerDay),
      rentedUser: Number(formData.rentedUser),
    }

    await onSubmit?.(cleanedData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl rounded-3xl bg-[#f3ecff] p-6 shadow-sm md:p-8"
    >
      <h1 className="mb-8 text-center text-2xl font-bold uppercase text-[#5b52c8] md:text-3xl">
        {mode === "create" ? "Add Car Rental" : "Edit Car Rental Details"}
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center">
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-[#e8e0c8] bg-[#f5f2df]">
            {preview && !imageError ? (
              <img
                src={preview}
                alt="car rental"
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center px-4 text-center">
                <span className="text-5xl text-gray-500">+</span>
                {formData.picture ? (
                  <p className="mt-2 break-all text-xs text-red-500">
                    Image preview unavailable
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <input
            type="text"
            name="picture"
            placeholder="Picture URL"
            value={formData.picture ?? ""}
            onChange={handleChange}
            className="mt-4 w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#8b80f9]"
          />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Car rental name"
            className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
            required
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="District"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
              required
            />

            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Province"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
              required
            />

            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
              placeholder="Postal code"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="tel"
              value={formData.tel ?? ""}
              onChange={handleChange}
              placeholder="Telephone"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
            />

            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
              required
            >
              <option value="">Select region</option>
              <option value="North">North</option>
              <option value="Northeast">Northeast</option>
              <option value="Central">Central</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="South">South</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              placeholder="Price per day"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
              required
              min={0}
            />

            <input
              type="number"
              name="rentedUser"
              value={formData.rentedUser}
              onChange={handleChange}
              placeholder="Rented user"
              className="w-full border-b border-gray-400 bg-transparent px-1 py-2 outline-none"
              required
              min={0}
            />
          </div>

          <div>
            <p className="mb-2">Car list</p>

            <div className="space-y-2">
              {(formData.car ?? [""]).map((carName, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={carName}
                    onChange={(e) => handleCarChange(index, e.target.value)}
                    placeholder={`Car ${index + 1}`}
                    className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => removeCarField(index)}
                    className="h-9 w-9 rounded-full bg-pink-200 text-pink-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addCarField}
              className="mt-3 rounded-full border border-gray-300 bg-white px-4 py-2"
            >
              + Add car
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <StyledButton
          title="Cancel"
          color="red"
          href="/admin/car-rentals"
        />

        <StyledButton
          title="Confirm"
          type="submit"
          loading={isSubmitting}
        />
      </div>
    </form>
  )
}