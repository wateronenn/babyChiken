import Link from "next/link"
import { getCarRentalById } from "@/libs/function/carRental"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res: any = await getCarRentalById(id)
  const item = res?.data

  if (!item) {
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
        <div className="rounded-[32px] bg-[var(--color-primary-purple)] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full shrink-0 md:w-[260px]">
              <div className="flex h-[240px] w-full items-center justify-center rounded-[28px] bg-[var(--color-pastel-yellow)] p-5">
                <img
                  src={convertGoogleDriveUrl(item.picture)}
                  alt={item.name || "car rental"}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-5 rounded-[24px] bg-white/40 p-4 text-black">
                <h2 className="text-lg font-semibold">Rental Summary</h2>
                <div className="mt-3 space-y-2 text-sm">
                  <p>👤 คนเคยเช่า: {item.rents?.length ?? 0}</p>
                  <p>🚗 จำนวนรถ: {item.car?.length ?? 0}</p>
                  <p>🌍 ภูมิภาค: {item.region || "-"}</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-block rounded-full bg-white/40 px-4 py-1 text-sm font-medium text-[var(--color-second-purple)]">
                Admin View
              </div>

              <h1 className="mt-3 text-4xl font-extrabold text-black">
                {item.name}
              </h1>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Address</p>
                  <p className="mt-1 text-black">
                    {item.address || "-"}, {item.district || "-"}, {item.province || "-"},{" "}
                    {item.postalcode || "-"}
                  </p>
                </div>

                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Phone</p>
                  <p className="mt-1 text-black">{item.tel || "-"}</p>
                </div>

                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Region</p>
                  <p className="mt-1 text-black">{item.region || "-"}</p>
                </div>

                <div className="rounded-[22px] bg-white/35 p-4">
                  <p className="text-sm font-medium text-black/60">Total Rentals</p>
                  <p className="mt-1 text-black">{item.rents?.length ?? 0} คนเคยเช่า</p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] bg-white/35 p-5">
                <h2 className="text-xl font-semibold text-black">Car List</h2>

                {item.car && item.car.length > 0 ? (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-3">
                      {item.car.map((car: string, index: number) => (
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
                <Link
                  href="/admin/car-rentals"
                  className="rounded-full bg-[var(--color-primary-blue)] px-6 py-3 font-medium text-black shadow-sm transition hover:scale-[1.02]"
                >
                  Back
                </Link>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/car-rentals/${item._id}/edit`}
                    className="rounded-full bg-[var(--color-second-purple)] px-7 py-3 font-medium text-white shadow-sm transition hover:scale-[1.02]"
                  >
                    Edit
                  </Link>

                  <button className="rounded-full bg-[#f4b8b8] px-7 py-3 font-medium text-white shadow-sm transition hover:scale-[1.02]">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}