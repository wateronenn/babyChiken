"use client"

import Image from "next/image"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react"
import { Dayjs } from "dayjs"
import { updateRent } from "@/libs/function/Rent"
import { useRouter } from "next/navigation"
import { MenuItem, Select } from "@mui/material"

export default function EditBookingForm({bid, token, cars = []}: {bid: string, token: string, cars?: string[]}) {

    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [car, setCar] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async () => {
        if (!startDate || !endDate) return
        await updateRent(bid, {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            car: car
        }, token)
        router.push('/booking')
    }

    const handleStartDateChange = (value: Dayjs | null) => {
        setStartDate(value)
    }
    const handleEndDateChange = (value: Dayjs | null) => {
        setEndDate(value)
    }
    const handleCarChange = (event: any) => {
        setCar(event.target.value)
    }

    return (
        <main className="text-center p-10">
            <h1 className="text-[var(--color-second-purple)] text-3xl font-bold">
                Edit Your Bookings
            </h1>
            <div className="flex flex-row my-10 p-5 gap-10 rounded-lg bg-[var(--color-pastel-blue)]">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="bg-white" value={startDate} onChange={handleStartDateChange}/>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="bg-white" value={endDate} onChange={handleEndDateChange}/>
                    </LocalizationProvider>
                    <Select variant="standard" name="car" label="car" id="car" value={car} onChange={handleCarChange}
                    className="h-[2em] w-[200px]">
                        {cars.map((carName) => (
                            <MenuItem key={carName} value={carName}>
                                {carName}
                            </MenuItem>
                        ))}
                    </Select>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
                    onClick={handleSubmit}>
                        Edit
                    </button>
                </form>
            </div>
        </main>
    )
}