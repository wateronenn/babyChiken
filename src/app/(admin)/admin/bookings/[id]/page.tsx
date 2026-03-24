import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getOneRent } from "@/libs/function/Rent";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CarRentalResponse } from "../../../../../../interface"; 
import { formatDate } from "../../../../../../utils"; 
import CancelButton from "@/components/booking/DeleteButton";
import Link from "next/link";

export default async function BookingDetailPage({params} : {params:Promise<{id:string}>}) {

    const session = await getServerSession(authOptions)
        if (!session || !session.user.token) return null
    
    const {id} = await params;
    const bookingDetail = await getOneRent(id, session.user.token)

    const carRental = typeof bookingDetail.carRental === 'object' 
    ? bookingDetail.carRental as CarRentalResponse 
    : null

    if (!carRental) return <h1 className="text-center text-xl my-5">CarRental not found</h1>

    return (
        <main className="text-center p-10">
            <div className="flex flex-row my-10 p-5 gap-10 rounded-lg bg-[var(--color-pastel-blue)]">
                <div className="w-[25%] overflow-hidden rounded-lg bg-[var(--color-pastel-yellow)]">
                    {
                        carRental.picture ?
                        <Image src={carRental.picture}
                        alt="Car Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover w-full h-auto rounded-lg"
                        />
                        : null
                    }
                </div>
                <div className="flex flex-col text-left">
                    <div>{carRental.name}</div>
                    <div>{bookingDetail.car}</div>
                    <div>{formatDate(bookingDetail.startDate)}</div>
                    <div>{formatDate(bookingDetail.endDate)}</div>
                    <div>Number of book day</div>
                    <div>Rate</div>
                    <div>Total Price:</div>
                </div>
            </div>
            <div className="flex justify-center gap-10">
                <CancelButton bid={id} token={session.user.token}/>
                <Link href={`/bookings/${id}/edit`}>
                    <button className="rounded-md bg-[var(--color-primary-purple)] hover:bg-[var(--color-second-purple)] 
                    px-3 py-2 text-white shadow-sm">
                        Edit
                    </button>
                </Link>
            </div>
        </main>
    )
}