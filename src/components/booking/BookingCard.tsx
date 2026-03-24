import Image from "next/image";
import InteractiveBookingCard from "./InteractiveBookingCard";
import { CarRentalResponse, RentResponse } from "../../../interface";
import { formatDate, getCarRentalName } from "../../../utils";

export default function BookingCard({rentItem}:{rentItem:RentResponse}) {

    const carRental = typeof rentItem.carRental === 'object' 
        ? rentItem.carRental as CarRentalResponse
        : null

    return (
        <InteractiveBookingCard>
            <div className="flex h-[150px] w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-[var(--color-pastel-yellow)]">
                {
                    carRental?.picture ?
                    <Image
                    src={carRental.picture}
                    alt='place picture'
                    width={0}
                    height={0}
                    sizes="30"
                    className='object-cover w-full h-auto'
                    />
                    : null
                }
            </div>
            <div>
                <h2 className="text-2xl font-medium">
                    {carRental?.name}
                </h2>
                <div className="text-[16px] py-2">
                    <p>{carRental?.name}</p>
                    <p>🚗 {rentItem.car}</p>
                </div>
                <div className="mt-4 text-[16px]">
                    🗓️ {formatDate(rentItem.startDate)} - {formatDate(rentItem.endDate)}
                </div>
            </div>
            <div className="ml-auto pr-2 text-[52px] font-light">
                ›
            </div>
        </InteractiveBookingCard>
    )
}