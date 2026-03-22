import Link from "next/link"

type CarRentalCardProps = {
  item: {
    _id: string
    name: string
    address: string
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
            src={item.picture || "/img/logo.png"}
            alt={item.name}
            className="h-[72px] w-[94px] object-contain"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-[22px] font-medium text-black">
            {item.name}
          </h2>

          <p className="text-[16px] text-black/80">
            {item.address}
          </p>

          <div className="mt-4 text-black">
            <div className="text-[16px]">👤 {item.rents?.length || 0}</div>
            <div className="text-[14px] tracking-wide">★★★★☆</div>
          </div>
        </div>

        <div className="pr-2 text-[52px] font-light text-black">
          ›
        </div>
      </div>
    </Link>
  )
}