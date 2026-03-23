'use client'
import { deleteRent } from "@/libs/function/Rent"
import { useRouter } from "next/navigation"

export default function CancelButton({bid, token}: {bid: string, token: string}) {
    const router = useRouter()
    
    const handleCancel = async () => {
        await deleteRent(bid, token)
        router.push('/booking')
    }

    return (
        <button className="rounded-md bg-[var(--color-primary-red)] hover:bg-[var(--color-second-red)] 
        px-3 py-2 text-white shadow-sm"
        onClick={handleCancel}>
            Delete
        </button>
    )
}