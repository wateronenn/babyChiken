import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import EditBookingForm from "@/components/booking/EditBookingForm"
import { getOneRent } from "@/libs/function/Rent"
import { getCarRentalById } from "@/libs/function/carRental"

export default async function EditBookingPage({params}: {params: Promise<{id: string}>}) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    
    const {id} = await params
    const rent = await getOneRent(id, session.user.token)

    const carRentalId = typeof rent.carRental === 'string' ? rent.carRental : rent.carRental._id
    const carRental = await getCarRentalById(carRentalId)

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-[var(--color-second-purple)] text-3xl font-bold">
                Edit Booking
            </h1>
            <EditBookingForm bid={id} token={session.user.token} rentItem={rent} carRentalItem={carRental} isAdmin={session.user.role === 'admin'}/>
        </main>
    )
}