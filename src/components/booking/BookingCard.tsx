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
            <div className='flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-pastel-yellow)]'>
                {
                    carRental?.picture ?
                    <div>
                        <Image
                        src={carRental.picture}
                        alt='place picture'
                        width={0}
                        height={0}
                        sizes="30"
                        className='object-cover w-full h-auto'
                        />
                    </div>
                    : null
                }
            </div>
            <div>
                <h2 className='text-[1.5em]'>
                    {rentItem._id}
                </h2>
                <h3 className='text-[1.25em]'>
                    {carRental?.name}
                </h3>
                <h3 className='text-[1.25em]'>
                    {rentItem.car}
                </h3>
                <h3 className='text-[1.25em]'>
                    {formatDate(rentItem.startDate)} - {formatDate(rentItem.endDate)}
                </h3>
            </div>
            <div className="flex items-center ml-auto text-[52px] font-light text-black">
                ›
            </div>
        </InteractiveBookingCard>
    )
}