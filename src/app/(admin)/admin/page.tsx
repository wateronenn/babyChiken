import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (!session) {
      alert("you are not authorized to this path")
      router.push("/car-rentals");
      return null;
    }

  return (
    <main className="min-h-screen bg-[#f4f4f4] pt-16">

      {/* Banner */}
      <section className="h-[220px] w-full bg-[#ecebd9] flex items-center justify-center">
        <h1 className="text-4xl font-medium text-black">
          Admin Dashboard
        </h1>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-12">

        <div className="grid gap-6 md:grid-cols-2">

          {/* Car Rentals */}
          <Link
            href="/admin/car-rentals"
            className="block rounded-[28px] bg-[#b7b0ff] p-8 shadow-md transition hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-semibold text-black mb-2">
              Car Rentals
            </h2>
            <p className="text-black/80">
              Manage all car rental providers
            </p>
          </Link>

          {/* Bookings */}
          <Link
            href="/admin/bookings"
            className="block rounded-[28px] bg-[#b7b0ff] p-8 shadow-md transition hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-semibold text-black mb-2">
              Bookings
            </h2>
            <p className="text-black/80">
              View and manage user bookings
            </p>
          </Link>

        </div>

      </section>
    </main>
  )
}