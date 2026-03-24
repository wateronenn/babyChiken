import Link from "next/link"
import { convertGoogleDriveUrl } from "@/libs/function/convertGoogleDriveUrl"

type CarRentalCardProps = {
  item: {
    _id: string
    name: string
    address: string
    district: string
    province: string
    tel?: string
    car?: string[]
    picture?: string
    rents?: any[]
  }
  href: string
}

export default function CarRentalCard({ item, href }: CarRentalCardProps) {
  return (
    <Link href={href} className="block">
      <div className="flex items-center gap-5 rounded-[28px] bg-[#b7b0ff] px-6 py-4 shadow-md transition hover:scale-[1.01]">
        <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-white">
          <img
            src={convertGoogleDriveUrl(item.picture)}
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

          <div className="mt-4 text-black">
            <div className="text-[16px]">👤 {item.rents?.length || 0} rentals</div>
          </div>
        </div>

        <div className="pr-2 text-[52px] font-light text-black">
          ›
        </div>
      </div>
    </Link>
  )
}