import Link from "next/link"
import { getCarRentalById } from "@/libs/function/carRental"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res: any = await getCarRentalById(id)
  const item = res.data

  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-16">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-10 text-center text-5xl font-bold text-[#4b4b91] drop-shadow-[1px_1px_0px_rgba(0,0,0,0.25)]">
          View carRental Data
        </h1>

        <div className="rounded-[32px] bg-[#ece4f8] px-8 py-8 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-[220px] w-full max-w-[250px] items-center justify-center overflow-hidden rounded-[28px] bg-[#ecebd9]">
              {item.picture ? (
                <img
                  src={item.picture}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="px-6 text-left text-3xl leading-tight text-black">
                  img
                  <br />
                  (can click to
                  <br />
                  change)
                </div>
              )}
            </div>

            <div className="flex-1 text-black">
              <h2 className="mb-4 text-5xl font-bold">{item.name}</h2>

              <p className="mb-4 text-3xl">
                <span className="font-semibold">address</span>{" "}
                {item.address}
              </p>

              <p className="mb-4 text-3xl">
                <span className="font-semibold">Contact</span>{" "}
                {item.tel || "-"}
              </p>

              <div>
                <p className="mb-2 text-3xl font-semibold">Car List</p>
                {item.car && item.car.length > 0 ? (
                  <ul className="list-disc pl-8 text-2xl">
                    {item.car.map((car: string, index: number) => (
                      <li key={index}>{car}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-2xl text-gray-600">No cars available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-20">
          <Link
            href={`/admin/car-rentals/${item._id}/edit`}
            className="min-w-[170px] rounded-full bg-[#b7b0ff] px-10 py-4 text-center text-3xl text-white shadow-md transition hover:scale-[1.02]"
          >
            Edit
          </Link>

          <button
            className="min-w-[170px] rounded-full bg-[#f4b8b8] px-10 py-4 text-3xl text-white shadow-md transition hover:scale-[1.02]"
          >
            Delete
          </button>
        </div>
      </section>
    </main>
  )
}