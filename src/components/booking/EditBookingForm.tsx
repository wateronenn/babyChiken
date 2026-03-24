"use client"

import Image from "next/image"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { updateRent } from "@/libs/function/Rent"
import { useRouter } from "next/navigation"
import { MenuItem, Select } from "@mui/material"
import { CarRentalResponse, RentResponse } from "../../../interface"
import StyledButton from "../StyledButton"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"

export default function EditBookingForm({
  bid,
  token,
  rentItem,
  carRentalItem,
  isAdmin
}: {
  bid: string
  token: string
  rentItem: RentResponse
  carRentalItem: string | CarRentalResponse
  isAdmin: boolean
}) {

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(rentItem.startDate))
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(rentItem.endDate))
    const [car, setCar] = useState<string>(rentItem.car)
    const router = useRouter()

   const cancelPath = isAdmin
    ? '/admin/bookings'
    : `/bookings/${bid}`

    const successPath = isAdmin
    ? `/admin/bookings/${bid}`
    : '/bookings'

  const handleSubmit = async () => {
    if (!startDate || !endDate) return
    await updateRent(bid, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      car
    }, token)
    router.push(successPath)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">

      {/* CARD */}
      <div className="rounded-[32px] bg-[var(--color-pastel-blue)] p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">

        <div className="flex flex-col md:flex-row gap-8">

          {/* LEFT: IMAGE */}
          {
            typeof carRentalItem !== 'string' && (
              <div className="w-full md:w-[260px] shrink-0">
                <div className="flex h-[220px] w-full items-center justify-center rounded-[24px] bg-[var(--color-pastel-yellow)] p-4">
                  <Image
                    src={convertGoogleDriveUrl(carRentalItem.picture)}
                    alt="place"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-contain rounded-lg"
                  />
                </div>
              </div>
            )
          }

          {/* RIGHT: FORM */}
          <div className="flex-1">

            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
              {typeof carRentalItem === 'string'
                ? carRentalItem
                : carRentalItem.name}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              className="grid gap-6 sm:grid-cols-2"
            >

              {/* START DATE */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black/70">Pick-up Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(v) => setStartDate(v)}
                    className="bg-white rounded-md"
                  />
                </LocalizationProvider>
              </div>

              {/* END DATE */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black/70">Return Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(v) => setEndDate(v)}
                    className="bg-white rounded-md"
                  />
                </LocalizationProvider>
              </div>

              {/* CAR SELECT */}
              {
                typeof carRentalItem !== 'string' && (
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className="text-sm text-black/70">Select Car</label>
                    <Select
                      value={car}
                      onChange={(e) => setCar(e.target.value)}
                      className="bg-white rounded-md"
                    >
                      {(carRentalItem.car ?? []).map((carName) => (
                        <MenuItem key={carName} value={carName}>
                          {carName}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )
              }

              {/* BUTTONS */}
              <div className="sm:col-span-2 flex justify-end gap-4 mt-4">
                <StyledButton color="red" title="Cancel" pageRef={cancelPath}/>
                <StyledButton color="purple" title="Confirm" type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}