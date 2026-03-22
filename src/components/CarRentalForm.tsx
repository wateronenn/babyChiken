"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { CarRentalItem } from "../../interface"

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
  })

  useEffect(() => {
    if (!defaultData) return

    setFormData({
      name: defaultData.name ?? "",
      address: defaultData.address ?? "",
      district: defaultData.district ?? "",
      province: defaultData.province ?? "",
      postalcode: defaultData.postalcode ?? "",
      tel: defaultData.tel ?? "",
      region: defaultData.region ?? "",
      car: defaultData.car && defaultData.car.length > 0 ? defaultData.car : [""],
      picture: defaultData.picture ?? "",
    })
  }, [defaultData])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
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
      car: (formData.car ?? [])
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    }

    await onSubmit?.(cleanedData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-[#f3ecff] rounded-3xl p-6 md:p-8 shadow-sm"
    >
      <h1 className="text-center text-2xl md:text-3xl font-bold text-[#5b52c8] mb-8 uppercase">
        {mode === "create" ? "Add Car Rental" : "Edit Car Rental Details"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-square rounded-3xl bg-[#f5f2df] border border-[#e8e0c8] flex items-center justify-center overflow-hidden">
            {formData.picture ? (
              <img
                src={formData.picture}
                alt="car rental"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-gray-500">+</span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-9 h-9 rounded-full bg-pink-200 text-pink-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addCarField}
              className="mt-3 px-4 py-2 rounded-full bg-white border border-gray-300"
            >
              + Add car
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          type="button"
          onClick={onCancel}
          className="min-w-[140px] rounded-full bg-pink-300 px-6 py-2.5 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[140px] rounded-full bg-[#9e95ff] px-6 py-2.5 text-white disabled:opacity-60"
        >
          {isSubmitting
            ? "Submitting..."
            : mode === "create"
            ? "Add car rental"
            : "Confirm"}
        </button>
      </div>
    </form>
  )
}