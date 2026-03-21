import Link from "next/link"

const mockCarRentals = [
    {
        id: "1",
        name: "DRIVE CAR RENTAL",
        address: "Bangkok, Thailand",
        tel: "02-123-4567",
        cars: ["Toyota Vios", "Honda City", "Mazda 2"],
        pricePerDay: 1200,
        rentedCount: 600,
        image: "/img/logo.png",
    },
    {
        id: "2",
        name: "ThaiRent a car",
        address: "Chiang Mai, Thailand",
        tel: "02-222-3333",
        cars: ["Toyota Altis", "Honda Civic"],
        pricePerDay: 1500,
        rentedCount: 400,
        image: "/img/logo.png",
    },
]

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const data = mockCarRentals.find((item) => item.id === id)

    if (!data) {
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
                                src={data.image}
                                alt={data.name}
                                className="w-[80px] h-[80px] object-contain"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-black">{data.name}</h1>
                            <p className="text-black mt-2">📍 {data.address}</p>
                            <p className="text-black mt-1">☎ {data.tel}</p>
                            <p className="text-black mt-2 font-semibold text-[var(--color-second-blue)]">
                                💰 {data.pricePerDay} บาท / วัน
                            </p>

                            <p className="text-black mt-1">
                                👤 {data.rentedCount} คนเคยเช่า
                            </p>

                            <div className="mt-4">
                                <h2 className="font-semibold text-black mb-1">Car List</h2>
                                <ul className="list-disc pl-5 text-black">
                                    {data.cars.map((car, index) => (
                                        <li key={index}>{car}</li>
                                    ))}
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