import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getOneRent } from "@/libs/function/Rent";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CarRentalResponse } from "../../../../../interface";
import { formatDate } from "../../../../../utils";
import Link from "next/link";
import DeleteButton from "@/components/booking/DeleteButton";

export default async function BookingDetailPage({params} : {params:Promise<{id:string}>}) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    
    const {id} = await params;
    const bookingDetail = await getOneRent(id, session.user.token)

    const carRental = typeof bookingDetail.carRental === 'object' 
    ? bookingDetail.carRental as CarRentalResponse 
    : null

    if (!carRental) return <h1 className="text-center text-xl my-5">CarRental not found</h1>

    return (
        <main className="min-h-screen bg-[#f7f7fb] px-6 pt-24">
  <div className="mx-auto max-w-5xl">
    <div className="rounded-[32px] bg-[var(--color-primary-blue)] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
      
      <div className="flex flex-col gap-8 md:flex-row">
        
        {/* LEFT: IMAGE + SUMMARY */}
        <div className="w-full shrink-0 md:w-[260px]">
          
          <div className="flex h-[240px] w-full items-center justify-center rounded-[28px] bg-[var(--color-pastel-yellow)] p-5">
            {
              carRental.picture &&
              <Image
                src={carRental.picture}
                alt="Car Image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full object-contain"
              />
            }
          </div>

          <div className="mt-5 rounded-[24px] bg-white/40 p-4 text-black">
            <h2 className="text-lg font-semibold">Booking Summary</h2>
            <div className="mt-3 space-y-2 text-sm">
              <p>🚗 {bookingDetail.car}</p>
              <p>🗓️ {formatDate(bookingDetail.startDate)} - {formatDate(bookingDetail.endDate)}</p>
              <p>💰 1000 baht</p>
            </div>
          </div>
        </div>

        {/* RIGHT: DETAIL */}
        <div className="flex-1">
          
          <div className="inline-block rounded-full bg-white/40 px-4 py-1 text-sm font-medium text-[var(--color-second-blue)]">
            Booking Detail
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-black">
            {carRental.name}
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            
            <div className="rounded-[22px] bg-white/35 p-4">
              <p className="text-sm font-medium text-black/60">Car</p>
              <p className="mt-1 text-black">{bookingDetail.car}</p>
            </div>

            <div className="rounded-[22px] bg-white/35 p-4">
              <p className="text-sm font-medium text-black/60">Booking ID</p>
              <p className="mt-1 text-black break-words">{bookingDetail._id}</p>
            </div>

            <div className="rounded-[22px] bg-white/35 p-4">
              <p className="text-sm font-medium text-black/60">Start Date</p>
              <p className="mt-1 text-black">{formatDate(bookingDetail.startDate)}</p>
            </div>

            <div className="rounded-[22px] bg-white/35 p-4">
              <p className="text-sm font-medium text-black/60">End Date</p>
              <p className="mt-1 text-black">{formatDate(bookingDetail.endDate)}</p>
            </div>

            <div className="rounded-[22px] bg-white/35 p-4 sm:col-span-2">
              <p className="text-sm font-medium text-black/60">Total Price</p>
              <p className="mt-1 text-black">-- calculate later --</p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex items-center justify-between">
            
            <Link
              href="/bookings"
              className="rounded-full bg-[var(--color-primary-purple)] px-6 py-3 font-medium text-white shadow-sm transition hover:scale-[1.02]"
            >
              Back
            </Link>

            <div className="flex items-center gap-4">
              
              <Link
                href={`/bookings/${bookingDetail._id}/edit`}
                className="rounded-full bg-[var(--color-second-blue)] px-7 py-3 font-medium text-white shadow-sm transition hover:scale-[1.02]"
              >
                Edit
              </Link>

              <DeleteButton bid={bookingDetail._id} token={session.user.token}/>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</main>
    )
}