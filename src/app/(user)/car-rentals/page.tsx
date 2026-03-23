import { getCarRentals } from "@/libs/function/carRental"
import CarRentalCard from "@/components/CarRentalCard"
import { CarRentalResponse } from "../../../../interface"

type PageProps = {
  searchParams?: Promise<{
    search?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const search = resolvedSearchParams?.search?.trim() || ""

  const rentalsJson = (await getCarRentals()) as unknown as {
    data?: CarRentalResponse[]
  }

  const rentals = rentalsJson?.data || []

  const filteredRentals = rentals.filter((item) => {
    const keyword = search.toLowerCase()

    return (
      item.name.toLowerCase().includes(keyword) ||
      item.address.toLowerCase().includes(keyword) ||
      item.province.toLowerCase().includes(keyword) ||
      item.district.toLowerCase().includes(keyword) ||
      item.region.toLowerCase().includes(keyword)
    )
  })

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

        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-5xl font-semibold text-[var(--color-second-purple)]">
            Car Rental
          </h1>
        </div>

        <form action="/car-rentals" method="GET" className="mt-10 px-16">
          <div className="flex items-center gap-4">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="search"
              className="w-[90%] rounded-full bg-[var(--color-primary-purple)] px-5 py-2 text-black outline-none"
            />

            <button
              type="submit"
              className="rounded-full bg-[var(--color-second-purple)] px-5 py-2 text-white"
            >
              Search
            </button>

            {search && (
              <a
                href="/car-rentals"
                className="rounded-full border border-gray-300 px-5 py-2 text-gray-700"
              >
                Clear
              </a>
            )}
          </div>
        </form>

        <div className="px-14 pt-6 text-sm text-gray-500">
          {search ? (
            <p>
              Result for: <span className="font-medium text-black">{search}</span>
            </p>
          ) : (
            <p>Showing all car rentals</p>
          )}
        </div>

        <div className="space-y-5 px-14 py-8">
          {filteredRentals.length > 0 ? (
            filteredRentals.map((item) => (
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