import Link from "next/link"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"
import { CarRentalResponse } from "../../interface"

type CarRentalCardProps = {
  item: CarRentalResponse
  href: string
}

export default function CarRentalCard({ item, href }: CarRentalCardProps) {
  const imageSrc = item.picture
    ? convertGoogleDriveUrl(item.picture)
    : "/img/logo.png"

  return (
    <Link href={href} className="block">
      <div className="flex items-center gap-5 rounded-[28px] bg-[#b7b0ff] px-6 py-4 shadow-md transition hover:scale-[1.01]">

        <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-white">
          <img
            src={imageSrc}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-[22px] font-medium text-black">
            {item.name}
          </h2>

          <div className="text-[16px] text-black/80">
            <p>{item.address}</p>
            <p className="text-[14px] text-black/60">
              📍 {[item.district, item.province].filter(Boolean).join(", ")}
            </p>
          </div>

          <div className="mt-4 text-black space-y-1">
            <div className="text-[16px]">
              👤 {item.rentedUser ?? 0} users
            </div>

            <div className="text-[16px]">
              💸 {item.pricePerDay ?? 0} THB/day
            </div>
          </div>
        </div>

        <div className="pr-2 text-[52px] font-light text-black">
          ›
        </div>
      </div>
    </Link>
  )
}