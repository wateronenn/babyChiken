import { getCarRentals } from "@/libs/function/carRental"
import CarRentalCard from "@/components/CarRentalCard"
import { CarRentalResponse } from "../../../../interface"

export default async function Page() {
    const rentalsJson = await getCarRentals() as unknown as { data: CarRentalResponse[] }
    const rentals = rentalsJson.data

    return (
        <main className="min-h-screen pt-16 bg-white">
            <div className="mx-auto max-w-5xl bg-white min-h-screen">
                <div className="h-[220px] flex items-center justify-center">
                    <p className="text-[var(--color-second-purple)] text-2xl">
                        Some cool Banner
                    </p>
                </div>

                <div className="flex flex-col items-center mt-6">
                    <h1 className="text-5xl font-semibold text-[var(--color-second-purple)]">
                        Car Rental
                    </h1>
                </div>

                <div className="px-16 mt-10 flex items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="search"
                        className="w-[70%] rounded-full px-5 py-2 outline-none bg-[var(--color-primary-purple)] text-black"
                    />
                </div>

                <div className="px-14 py-8 space-y-5">
                    {rentals.map((item) => (
                        <CarRentalCard
                            key={item._id}
                            href={`/car-rentals/${item._id}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}