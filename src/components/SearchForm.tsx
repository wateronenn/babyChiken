'use client'

import Link from 'next/link'

type Props = {
  color?: 'purple' | 'blue'
  defaultValue?: string
  action: string
}

export default function SearchForm({
  color = 'purple',
  defaultValue = '',
  action
}: Props) {

  const colorClass =
    color === 'purple'
      ? "bg-[#e9e7f7] hover:bg-[#D6D1EB]"
      : "bg-[#edf9fe] hover:bg-[#D0E6F7]"

  return (
    <form action={action} method="GET" className="mb-10">
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder="search"
          className={`w-full max-w-[90%] rounded-full px-6 py-4 text-lg outline-none placeholder:text-gray-500 ${colorClass}`}
        />

        <button
          type="submit"
          className="rounded-full bg-[#b7b0ff] px-6 py-4 text-lg text-white shadow-md transition hover:scale-[1.02]"
        >
          Search
        </button>

        {defaultValue && (
          <Link
            href={action}
            className="rounded-full border border-gray-300 px-6 py-4 text-lg text-black"
          >
            Clear
          </Link>
        )}
      </div>
    </form>
  )
}