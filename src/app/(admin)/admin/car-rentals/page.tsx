import Link from "next/link"
import CarRentalCard from "@/components/CarRentalCard"
import { getCarRentals } from "@/libs/function/carRental"
import SearchForm from "@/components/SearchForm"
import { CarRentalResponse } from "../../../../../interface"
export const dynamic = "force-dynamic"

type PageProps = {
  searchParams?: Promise<{
    search?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const search = resolvedSearchParams?.search?.trim() || ""

  const carRentalsJson = (await getCarRentals(search)) as unknown as {
    data?: CarRentalResponse[]
  }

  const carRentals = carRentalsJson?.data || []

  const filteredCarRentals = carRentals
  
  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-16">
      <section className="relative h-[260px] w-full overflow-hidden">
        <img
          src="/img/banner.png"
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r
          from-[var(--color-primary-purple)]/60
          via-[var(--color-primary-blue)]/40
          to-[var(--color-pastel-yellow)]/40"
        />

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white drop-shadow">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-white/90">
              Manage your car rentals 🚗
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10 flex justify-center">
          <Link
            href="/admin/car-rentals/create"
            className="rounded-full bg-[#b7b0ff] px-10 py-4 text-xl text-white shadow-md transition hover:scale-[1.02]"
          >
            add car rental
          </Link>
        </div>

        <SearchForm color="purple" defaultValue={search} action="/admin/car-rentals/"/>

        <div className="mb-6 text-sm text-gray-500">
          {search ? (
            <p>
              Result for: <span className="font-medium text-black">{search}</span>
            </p>
          ) : (
            <p>Showing all car rentals</p>
          )}
        </div>

        <div className="space-y-5">
          {filteredCarRentals.length > 0 ? (
            filteredCarRentals.map((item: any) => {
              if (!item) return null

              return (
                <CarRentalCard
                  key={item._id}
                  href={`/admin/car-rentals/${item._id}`}
                  item={{
                    _id: item._id,
                    name: item.name,
                    address: item.address,
                    district: item.district,
                    province: item.province,
                    tel: item.tel,
                    car: item.car || [],
                    picture: item.picture || "/img/logo.png",
                    rents: item.rents || [],
                  }}
                />
              )
            })
          ) : (
            <div className="py-10 text-center text-gray-500">
              No car rentals found
            </div>
          )}
        </div>
      </section>
    </main>
  )
}