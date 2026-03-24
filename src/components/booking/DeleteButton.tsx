'use client'
import { deleteRent } from "@/libs/function/Rent"
import { useRouter } from "next/navigation"
import StyledButton from "../StyledButton"

export default function DeleteButton({bid, token}: {bid: string, token: string}) {
    const router = useRouter()
    
    const handleDelete = async () => {
        await deleteRent(bid, token)
        router.push('/bookings')
    }

    return (
        <StyledButton color="red" title="Delete" pageRef="" onClick={handleDelete}/>
    )
}