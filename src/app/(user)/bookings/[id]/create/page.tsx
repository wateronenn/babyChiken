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

    return <CreateBookingForm token={session.user.token} carRentalItem={carRental}/>
}