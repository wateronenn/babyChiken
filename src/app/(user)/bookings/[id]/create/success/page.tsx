import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BookingCard from "@/components/booking/BookingCard";
import { getOneRent } from "@/libs/function/Rent";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { formatDate } from "../../../../../../../utils";
import { CarRentalResponse } from "../../../../../../../interface";
import StyledButton from "@/components/StyledButton";
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl";

export default async function SuccessBookingPage({params}: {params: Promise<{id: string}>}) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const {id} = await params
    const rent = await getOneRent(id, session.user.token)

    const carRental = typeof rent.carRental === 'object' 
            ? rent.carRental as CarRentalResponse
            : null

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-10">
            <h1 className="text-[var(--color-second-purple)] text-3xl font-bold">
                Successfully Booking 🎉
            </h1>
            <div className="w-[1000] h-fit p-5 shadow-lg rounded-[28px] bg-[var(--color-primary-blue)]
            text-black flex flex-row gap-10">
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
                <div className="flex flex-col justify-between h-full py-1 min-h-[150px]">
                    <div>
                        <h2 className="text-2xl font-medium">
                        <span className="mr-3">📍</span>{carRental?.name}
                        </h2>
                        <div className="text-[20px] mt-1">
                            <p><span className="mr-3">🚗</span>{rent.car}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-[20px]">
                            <span className="mr-3">🗓️</span>{formatDate(rent.startDate)} - {formatDate(rent.endDate)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:col-span-2 flex gap-20 mt-4">
                <StyledButton color="purple" title="Back To Menu" pageRef="/car-rentals"/>
                <StyledButton color="purple" title="View Bookings" pageRef="/bookings"/>
            </div>
        </main>
    )
}