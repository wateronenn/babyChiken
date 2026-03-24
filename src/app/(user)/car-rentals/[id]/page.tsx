import Link from "next/link"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"
import StyledButton from "@/components/StyledButton"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not set")
  }

  const res = await fetch(`${baseUrl}/carRentals/${id}`, {
    cache: "no-store",
  })

  const rentalJson = await res.json()
  const data = rentalJson.data

  if (!res.ok || !data) {
    return (
      <main className="min-h-screen bg-[#f7f7fb] px-6 pt-24">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-black">Not Found</h1>
          <p className="mt-2 text-gray-500">Unable to load this car rental data.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb] px-6 pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] bg-[#F4EBFF] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[260px]">
              <div className="flex h-[240px] w-full items-center justify-center rounded-[28px] bg-white p-5">
                <img
                  src={convertGoogleDriveUrl(data.picture)}
                  alt={data.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-5 rounded-[24px] bg-white/40 p-4 text-black">
                <h2 className="text-lg font-semibold">Rental Summary</h2>
                <div className="mt-3 space-y-2 text-sm">
                  <p>👤 Customers: {data.rents?.length ?? 0}</p>
                  <p>🚗 Total Cars: {data.car?.length ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-block rounded-full bg-white/40 px-4 py-1 text-sm font-medium text-[var(--color-second-purple)]">
                Rental Car Center
              </div>

              <h1 className="mt-3 text-4xl font-extrabold text-black">
                {data.name}
              </h1>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Address</p>
                  <p className="mt-1 text-black">
                    {data.address}, {data.district}, {data.province}, {data.postalcode}
                  </p>
                </div>

                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Phone</p>
                  <p className="mt-1 text-black">{data.tel || "-"}</p>
                </div>

                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Region</p>
                  <p className="mt-1 text-black">{data.region || "-"}</p>
                </div>

                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Rental Count</p>
                  <p className="mt-1 text-black">{data.rents?.length ?? 0} rentals</p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] bg-white/35 p-5">
                <h2 className="text-xl font-semibold text-black">Car List</h2>

                {data.car && data.car.length > 0 ? (
                  <div className="mt-4 max-h-[140px] overflow-y-auto pr-2">
                    <div className="flex flex-wrap gap-3">
                      {data.car.map((car: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-sm"
                        >
                          {car}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-black/70">No car data</p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">

                <StyledButton
                  title="Back"
                  color="blue"
                  href="/car-rentals"
                />

                <StyledButton
                  title="Book Now"
                  href={`/bookings/${id}/create`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}