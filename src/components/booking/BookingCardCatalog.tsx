import Link from "next/link";
import { RentJson, RentResponse } from "../../../interface";
import BookingCard from "./BookingCard";


export default async function BookingCardCatalog({rentJson, isAdmin}:{rentJson:Promise<RentJson>, isAdmin:boolean}) {

    const rentJsonReady = await rentJson

    if (!rentJsonReady.data || rentJsonReady.data.length === 0) {
        return (
            <div className="flex-1 w-full flex justify-center">
                <p className="text-lg text-gray-500">No Booking</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col gap-5 w-full">
            {
                rentJsonReady.data.map((rentItem:RentResponse)=>(
                    <Link href={isAdmin ? `/admin/bookings/${rentItem._id}` : `/bookings/${rentItem._id}`}
                    key={rentItem._id}>
                        <BookingCard rentItem={rentItem} isAdmin={isAdmin}/>
                    </Link>
                ))
            }
            
        </div>
    )
}