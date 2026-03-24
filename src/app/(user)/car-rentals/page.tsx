import { getCarRentals } from "@/libs/function/carRental"
import CarRentalCard from "@/components/CarRentalCard"
import { CarRentalResponse } from "../../../../interface"
import SearchForm from "@/components/SearchForm"

type PageProps = {
  searchParams?: Promise<{
    search?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const search = resolvedSearchParams?.search?.trim() || ""

  const carRentalsJson = (await getCarRentals(search)) as {
    data?: CarRentalResponse[]
  }

  const carRentals = carRentalsJson?.data ?? []

  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="mx-auto min-h-screen max-w-5xl bg-white">
        <div className="relative h-[260px] overflow-hidden rounded-b-[40px]">
          <img
            src="/img/banner.png"
            alt="banner"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r
            from-[var(--color-primary-purple)]/40
            via-[var(--color-primary-blue)]/30
            to-[var(--color-pastel-yellow)]/30"
          />

          <div className="relative z-10 flex h-full items-center px-10">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow">
                Find Your Ride
              </h1>
              <p className="mt-2 text-white/90">Easy booking ✨</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center pt-6 pb-10">
          <h1 className="text-5xl font-semibold text-[var(--color-second-purple)]">
            Car Rental
          </h1>
        </div>

        <SearchForm
          color="purple"
          defaultValue={search}
          action="/car-rentals"
        />

        <div className="mb-6 px-14 text-sm text-gray-500">
          {search ? (
            <p>
              Result for: <span className="font-medium text-black">{search}</span>
            </p>
          ) : (
            <p>Showing all car rentals</p>
          )}
        </div>

        <div className="space-y-5 px-14 py-8">
          {carRentals.length > 0 ? (
            carRentals.map((item) => (
              <CarRentalCard
                key={item._id}
                href={`/car-rentals/${item._id}`}
                item={item}
              />
            ))
          ) : (
            <div className="py-10 text-center text-gray-500">
              No car rentals found
            </div>
          )}
        </div>
      </div>
    </main>
  )
}