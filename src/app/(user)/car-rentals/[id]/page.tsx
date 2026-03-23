import Link from "next/link"

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
      <div className="p-10 text-center">
        <h1>Not Found</h1>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-16 bg-white flex justify-center">
      <div className="w-full max-w-3xl mt-10">
        <div className="bg-[var(--color-primary-purple)] rounded-2xl p-6 shadow-md">
          <div className="flex gap-6">
            <div className="w-[120px] h-[120px] bg-[var(--color-pastel-yellow)] rounded-xl flex items-center justify-center">
              <img
                src="/img/logo.png"
                alt={data.name}
                className="w-[80px] h-[80px] object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-black">{data.name}</h1>
              <p className="text-black mt-2">
                📍 {data.address}, {data.district}, {data.province}, {data.postalcode}
              </p>
              <p className="text-black mt-1">☎ {data.tel || "-"}</p>
              <p className="text-black mt-1">🌍 {data.region}</p>
              <p className="text-black mt-2">
                👤 {data.rents?.length ?? 0} คนเคยเช่า
              </p>

              <div className="mt-4">
                <h2 className="font-semibold text-black mb-1">Car List</h2>
                <ul className="list-disc pl-5 text-black">
                  {data.car && data.car.length > 0 ? (
                    data.car.map((car: string, index: number) => (
                      <li key={index}>{car}</li>
                    ))
                  ) : (
                    <li>No car data</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link href="/car-rentals">
              <button className="px-6 py-2 rounded-full bg-[var(--color-primary-blue)] text-black">
                Back
              </button>
            </Link>

            <Link href="/bookings/create">
              <button className="px-6 py-2 rounded-full bg-[var(--color-second-purple)] text-white">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}