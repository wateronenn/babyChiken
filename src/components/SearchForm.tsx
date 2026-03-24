'use client'

import Link from 'next/link'
import StyledButton from '@/components/StyledButton'

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
      ? "bg-[#e9e7f7] focus:bg-[#D6D1EB]"
      : "bg-[#edf9fe] focus:bg-[#D0E6F7]"

  return (
    <form action={action} method="GET" className="mb-10">
      <div className="flex items-center justify-between gap-4">

        <input
          type="text"
          name="search"
          defaultValue={defaultValue}
          placeholder="Search..."
          className={`w-full rounded-full px-6 py-4 text-lg outline-none placeholder:text-gray-500 ${colorClass}`}
        />

        <div className="flex items-center gap-3">

          <StyledButton
            title="Search"
            type="submit"
          />

          {defaultValue && (
            <StyledButton
              title="Clear"
              color="red"
              href={action}
            />
          )}
        </div>

      </div>
    </form>
  )
}