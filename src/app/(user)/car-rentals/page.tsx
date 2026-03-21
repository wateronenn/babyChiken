import Link from "next/link"

const mockCarRentals = [
  {
    id: "1",
    name: "DRIVE CAR RENTAL",
    address: "address",
    rentedCount: 600,
    image: "/img/logo.png",
  },
  {
    id: "2",
    name: "ThaiRent a car",
    address: "address",
    rentedCount: 127,
    image: "/img/logo.png",
  },
  {
    id: "3",
    name: "Alamo",
    address: "address",
    rentedCount: 888,
    image: "/img/logo.png",
  },
  {
    id: "4",
    name: "Chic Car Rent",
    address: "address",
    rentedCount: 560,
    image: "/img/logo.png",
  },
]

export default function Page() {
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
          <div className="flex items-center gap-3 text-sm text-black">
            <span>by something</span>
            <span className="text-xl">▽</span>
          </div>
        </div>

        <div className="px-14 py-8 space-y-5">
          {mockCarRentals.map((item) => (
            <Link key={item.id} href={`/car-rentals/${item.id}`}>
              <div className="bg-[var(--color-primary-purple)] rounded-[22px] px-5 py-4 flex items-center gap-5 shadow-md hover:scale-[1.01] transition mb-4">
                <div className="w-[95px] h-[95px] rounded-[18px] bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[70px] h-[70px] object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-[34px] leading-none text-black">
                    {item.name}
                  </h2>
                  <p className="text-xl text-black mt-1">{item.address}</p>

                  <div className="mt-4 text-black">
                    <p className="text-lg">👤 {item.rentedCount}</p>
                  </div>
                </div>

                <div className="text-5xl text-black pr-3">{">"}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}