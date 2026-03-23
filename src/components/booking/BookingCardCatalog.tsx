import Link from "next/link";
import { RentJson, RentResponse } from "../../../interface";
import BookingCard from "./BookingCard";


export default async function BookingCardCatalog({rentJson}:{rentJson:Promise<RentJson>}) {

    const rentJsonReady = await rentJson

    return (
        <div className="px-14 py-8 flex flex-col gap-5">
            {
                rentJsonReady.data.map((rentItem:RentResponse)=>(
                    <Link href={`/booking/${rentItem._id}`} key={rentItem._id}>
                        <BookingCard rentItem={rentItem}/>
                    </Link>
                ))
            }
            
        </div>
    )
}