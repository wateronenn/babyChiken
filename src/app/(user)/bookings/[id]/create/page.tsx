import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import { getOneRent } from "@/libs/function/Rent"
import { getCarRentalById } from "@/libs/function/carRental"
import CreateBookingForm from "@/components/booking/CreateBookingForm"

export default async function CreateBookingPage({params}: {params: Promise<{id: string}>}) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const {id} = await params
    const carRental = await getCarRentalById(id)

    return (
        <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10">

            <h1 className="text-center text-3xl sm:text-4xl font-bold text-[var(--color-second-purple)] my-10">
                Create Your Booking
            </h1>

            <CreateBookingForm 
                token={session.user.token} 
                carRentalItem={carRental}
            />

        </main>
    )
}