import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BookingCard from "@/components/booking/BookingCard";
import { getOneRent } from "@/libs/function/Rent";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { formatDate } from "../../../../../../../utils";
import { CarRentalResponse } from "../../../../../../../interface";
import StyledButton from "@/components/booking/Button";

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
            <div className="w-[1000] h-fit p-5 shadow-lg rounded-lg bg-[var(--color-primary-blue)]
            text-black flex flex-row gap-10">
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
                        {rent._id}
                    </h2>
                    <h3 className='text-[1.25em]'>
                        {carRental?.name}
                    </h3>
                    <h3 className='text-[1.25em]'>
                        {rent.car}
                    </h3>
                    <h3 className='text-[1.25em]'>
                        {formatDate(rent.startDate)} - {formatDate(rent.endDate)}
                    </h3>
                </div>
            </div>
            <StyledButton type="purple" title="Back To Menu" pageRef="/car-rentals"/>
            <StyledButton type="purple" title="View Bookings" pageRef="/bookings"/>
        </main>
    )
}