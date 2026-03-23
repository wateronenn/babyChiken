import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import EditBookingForm from "@/components/booking/EditBookingForm"
import { getOneRent } from "@/libs/function/Rent"
import { getCarRentalById } from "@/libs/function/carRental"

export default async function EditPage({params}: {params: Promise<{bid: string}>}) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    
    const {bid} = await params
    const rent = await getOneRent(bid, session.user.token)

    const carRentalId = typeof rent.carRental === 'string' ? rent.carRental : rent.carRental._id
    const carRental = await getCarRentalById(carRentalId)

    return <EditBookingForm bid={bid} token={session.user.token} cars={carRental.car ?? []}/>
}