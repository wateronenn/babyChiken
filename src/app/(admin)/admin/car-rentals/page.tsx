import Link from "next/link"
import CarRentalCard from "@/components/CarRentalCard"
import { getCarRentals } from "@/libs/function/carRental"

export default async function Page() {
  const res: any = await getCarRentals()
  const carRentals = res.data || []

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-16">
      <section className="h-[220px] w-full bg-[#ecebd9] flex items-center justify-center">
        <h1 className="text-4xl font-medium text-black">Some cool Banner</h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex justify-center mb-10">
          <Link
            href="/admin/car-rentals/create"
            className="rounded-full bg-[#b7b0ff] px-10 py-4 text-xl text-white shadow-md transition hover:scale-[1.02]"
          >
            add car rental
          </Link>
        </div>

        <div className="mb-10 flex items-center justify-between gap-4">
          <input
            placeholder="search"
            className="w-full max-w-[760px] rounded-full bg-[#e9e7f7] px-6 py-4 text-lg outline-none placeholder:text-gray-500"
          />

          <button className="flex items-center gap-3 whitespace-nowrap text-xl text-black">
            <span>by user</span>
            <span className="text-3xl">⌁</span>
          </button>
        </div>

        <div className="space-y-5">
          {carRentals.map((item: any) => {
            if (!item) return null

            return (
              <CarRentalCard
                key={item._id}
                href={`/admin/car-rentals/${item._id}`}
                item={{
                  _id: item._id,
                  name: item.name,
                  address: item.address,
                  tel: item.tel,
                  car: item.car || [],
                  picture: item.picture || "/img/logo.png",
                  rents: item.rents || [],
                }}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}