import Link from "next/link";
import { RentJson, RentResponse } from "../../../interface";
import BookingCard from "./BookingCard";


export default async function BookingCardCatalog({rentJson}:{rentJson:Promise<RentJson>}) {

    const rentJsonReady = await rentJson

    if (!rentJsonReady.data || rentJsonReady.data.length === 0) {
        return (
            <div className="px-14 py-8">
                <p>No Booking</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col gap-5 w-full">
            {
                rentJsonReady.data.map((rentItem:RentResponse)=>(
                    <Link href={`/bookings/${rentItem._id}`} key={rentItem._id}>
                        <BookingCard rentItem={rentItem}/>
                    </Link>
                ))
            }
            
        </div>
    )
}