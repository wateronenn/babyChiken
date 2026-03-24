import BookingCard from "@/components/booking/BookingCard";
import BookingBox from "@/components/booking/BookingCard";
import { getManyRents } from "@/libs/function/Rent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import BookingCardCatalog from "@/components/booking/BookingCardCatalog";

export default async function Booking() {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const rents = getManyRents(session.user.token)

    return (
        <main className="w-[100%] flex flex-col items-center py-10 space-y-10">
            <h1 className="text-[var(--color-second-purple)] text-3xl font-bold">
                Your Bookings
            </h1>
            <BookingCardCatalog rentJson={rents} isAdmin={session.user.role === 'admin'}/>
        </main>
    )
}