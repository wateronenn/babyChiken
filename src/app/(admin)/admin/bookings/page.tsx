import BookingCard from "@/components/booking/BookingCard";
import BookingBox from "@/components/booking/BookingCard";
import { getManyRents } from "@/libs/function/Rent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import BookingCardCatalog from "@/components/booking/BookingCardCatalog";
import SearchForm from "@/components/SearchForm";
import { RentJson } from "../../../../../interface";

type PageProps = {
  searchParams?: Promise<{
    search?: string
  }>
}

export default async function Booking({ searchParams }: PageProps) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const rentJson = await getManyRents(session.user.token)

    const resolvedSearchParams = await searchParams
    const search = resolvedSearchParams?.search?.trim() || ""

    const filteredData = search
    ? rentJson.data.filter((rent) => {
        if (typeof rent.carRental === 'string') {
            return rent.carRental.toLowerCase().includes(search.toLowerCase())
        }
        const name = rent.carRental?.name ?? ''
        return name.toLowerCase().includes(search.toLowerCase())
    })
    : rentJson.data

    const filteredRents: Promise<RentJson> = Promise.resolve({
        ...rentJson,
        data: filteredData,
        count: filteredData.length
    })

    return (
        <main className="min-h-screen">
            <h1 className="text-[var(--color-second-purple)] text-3xl font-bold text-center m-10">
                Bookings
            </h1>
            <div className="max-w-5xl mx-auto px-10">
                <SearchForm color="blue" defaultValue={search} action="/admin/bookings/"/>
            </div>
            <div className="max-w-5xl mx-auto px-10 text-sm text-gray-500">
                {search ? (
                    <p>
                    Result for: <span className="font-medium text-black">{search}</span>
                    </p>
                ) : (
                    <p>Showing all Bookings</p>
                )}
            </div>
            <BookingCardCatalog rentJson={filteredRents}/>
        </main>
    )
}