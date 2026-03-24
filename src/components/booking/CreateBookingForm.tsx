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
        <main className="text-center p-10">
            <h1 className="text-[var(--color-second-purple)] text-3xl font-bold">
                Create Your Bookings
            </h1>
            <div className="flex flex-row justify-center my-10 p-5 gap-10 rounded-lg bg-[var(--color-pastel-purple)]">
                {
                    typeof carRentalItem === 'string' ?
                    null
                    : <Image
                        src={carRentalItem.picture ?? ''}
                        alt='place picture'
                        width={0}
                        height={0}
                        sizes="30"
                        className='object-cover w-[25%] rounded-lg'
                        />
                }
                <div className="flex flex-col">
                    {
                        typeof carRentalItem === 'string' ?
                        <h3 className="text-[var(--color-second-purple)] text-3xl font-bold pt-5">{carRentalItem}</h3>
                        : <h3 className="text-[var(--color-second-purple)] text-3xl font-bold mt-5">{carRentalItem.name}</h3>
                    }
                    <form className="flex flex-col items-center justify-center p-5 gap-10"
                    onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <div>
                            <p>Select Pick-up Date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker className="bg-white" value={startDate} onChange={handleStartDateChange}/>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <p>Select Return Date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker className="bg-white" value={endDate} onChange={handleEndDateChange}/>
                            </LocalizationProvider>
                        </div>
                        {
                            typeof carRentalItem === 'string' ?
                            null
                            : <div>
                                <p className="mb-5">Select a Car</p>
                                <Select variant="standard" name="car" label="car" id="car" value={car} onChange={handleCarChange}
                                className="h-[2em] w-[200px]">
                                    {(carRentalItem.car ?? []).map((carName) => (
                                        <MenuItem key={carName} value={carName}>
                                            {carName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className="flex flex-row justify-center gap-10">
                <button className="rounded-md bg-[var(--color-primary-red)] hover:bg-[var(--color-second-red)] px-3 py-2 text-white shadow-sm"
                onClick={() => router.push(`/car-rentals/${carRentalItem._id}`)}>
                    Cancel
                </button>
                <button className="rounded-md bg-[var(--color-primary-purple)] hover:bg-[var(--color-second-purple)] px-3 py-2 text-white shadow-sm"
                onClick={handleSubmit}>
                    Confirm
                </button>
            </div>
        </main>
    )
}