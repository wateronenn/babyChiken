"use client"

import { MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CarRentalResponse } from "../../../interface";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createRent } from "@/libs/function/Rent";
import StyledButton from "../StyledButton";

export default function CreateBookingForm({token, carRentalItem}:{token:string, carRentalItem:CarRentalResponse}) {

    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(null))
    const [car, setCar] = useState<string>("")
    const router = useRouter()

    const handleStartDateChange = (value: Dayjs | null) => {
        setStartDate(value)
    }
    const handleEndDateChange = (value: Dayjs | null) => {
        setEndDate(value)
    }
    const handleCarChange = (event: any) => {
        setCar(event.target.value)
    }

    const handleSubmit = async () => {
        if (!startDate || !endDate || !car) return
        try {
            const rent = await createRent(
                {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    carRental: carRentalItem._id,
                    car: car
                },
                token)
            router.push(`/bookings/${rent._id}/create/success`)
        } catch (error: any) {
            console.log("error message:", error.message)
            if (error.message.includes('already has 3 rents')) {
                alert("You have reached the maximum of 3 bookings")
            } else {
                alert("Error")
            }
        }
    }

    return (
        <div className="rounded-[32px] bg-[var(--color-pastel-purple)] p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">

            <div className="flex flex-col md:flex-row gap-8">

            {/* IMAGE */}
            <div className="w-full md:w-[260px] shrink-0">
                <div className="flex h-[220px] items-center justify-center rounded-[24px] bg-[var(--color-pastel-yellow)] p-4">
                <Image
                    src={carRentalItem.picture ?? ''}
                    alt="place"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-contain rounded-lg"
                />
                </div>
            </div>

            {/* FORM */}
            <div className="flex-1">

                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {carRentalItem.name}
                </h2>

                <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
                className="grid gap-6 sm:grid-cols-2"
                >

                    {/* START */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black/70">Pick-up Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="bg-white rounded-md"
                        />
                        </LocalizationProvider>
                    </div>

                    {/* END */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black/70">Return Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="bg-white rounded-md"
                        />
                        </LocalizationProvider>
                    </div>

                    {/* CAR */}
                    <div className="sm:col-span-2 flex flex-col gap-2">
                        <label className="text-sm text-black/70">Select Car</label>
                        <Select
                        value={car}
                        onChange={handleCarChange}
                        className="bg-white rounded-md"
                        >
                        {(carRentalItem.car ?? []).map((carName) => (
                            <MenuItem key={carName} value={carName}>
                            {carName}
                            </MenuItem>
                        ))}
                        </Select>
                    </div>

                    {/* BUTTONS */}
                    <div className="sm:col-span-2 flex justify-end gap-4 mt-4">
                        <StyledButton color="red" title="Cancel" pageRef={`/car-rentals/${carRentalItem._id}`}/>
                        <StyledButton color="purple" title="Confirm" type="submit"/>
                    </div>

                </form>
            </div>
        </div>
    </div>
    )
}