import Image from "next/image";
import InteractiveBookingCard from "./InteractiveBookingCard";
import { CarRentalResponse, RentResponse } from "../../../interface";
import { formatDate, getCarRentalName } from "../../../utils";
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl";

export default function BookingCard({rentItem, isAdmin}:{rentItem:RentResponse, isAdmin:boolean}) {

    const carRental = typeof rentItem.carRental === 'object' 
        ? rentItem.carRental as CarRentalResponse
        : null

    const carRentalName = rentItem.carRental && typeof rentItem.carRental === 'object'
    ? rentItem.carRental.name
    : typeof rentItem.carRental === 'string'
    ? rentItem.carRental
    : 'Unknown'

    return (
        <InteractiveBookingCard>
            <div className="flex h-[150px] w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-[var(--color-pastel-yellow)]">
                {
                    carRental?.picture ?
                    <Image
                    src={convertGoogleDriveUrl(carRental.picture)}
                    alt='place picture'
                    width={0}
                    height={0}
                    sizes="30"
                    className='object-cover w-full h-auto'
                    />
                    : null
                }
            </div>
            {
                isAdmin ? 
                <div className="flex flex-col justify-between h-full py-1 min-h-[150px]">
                    <div>
                        {
                            rentItem.user === null ? null
                            : typeof rentItem.user === 'object' 
                            ? <h2 className="text-2xl font-medium">{rentItem.user.username}</h2>
                            : <h2 className="text-2xl font-medium">{rentItem.user}</h2>
                        }
                        <p>ID: {rentItem._id}</p>
                    </div>
                    <div className="text-[16px]">
                        <p><span className="mr-3">📍</span>{carRental?.name}</p>
                        <p><span className="mr-3">🚗</span>{rentItem.car}</p>
                        <p><span className="mr-3">🗓️</span>{formatDate(rentItem.startDate)} - {formatDate(rentItem.endDate)}</p>
                    </div>
                </div>
                : <div className="flex flex-col justify-between h-full py-1 min-h-[150px]">
                    <div>
                        <h2 className="text-2xl font-medium">
                        <span className="mr-3">📍</span>{carRental?.name}
                        </h2>
                        <div className="text-[20px] mt-1">
                            <p><span className="mr-3">🚗</span>{rentItem.car}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-[20px]">
                            <span className="mr-3">🗓️</span>{formatDate(rentItem.startDate)} - {formatDate(rentItem.endDate)}
                        </div>
                    </div>
                </div>
                
            }
            <div className="ml-auto pr-2 flex items-center text-[52px] font-light">
                ›
            </div>
        </InteractiveBookingCard>
    )
}