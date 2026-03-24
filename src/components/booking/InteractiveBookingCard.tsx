'use client'
import React from 'react'

export default function InteractiveBookingCard({children} : {children:React.ReactNode}) {

    function onCardMouseAction(event:React.SyntheticEvent) {
        if(event.type == 'mouseenter') {
            event.currentTarget.classList.remove('shadow-lg')
            event.currentTarget.classList.add('shadow-2xl')

            event.currentTarget.classList.remove('bg-[var(--color-primary-blue)]')
            event.currentTarget.classList.add('bg-[var(--color-second-blue)]')

            event.currentTarget.classList.remove('text-black')
            event.currentTarget.classList.add('text-white')
        } else {
            event.currentTarget.classList.remove('shadow-2xl')
            event.currentTarget.classList.add('shadow-lg')

            event.currentTarget.classList.remove('bg-[var(--color-second-blue)]')
            event.currentTarget.classList.add('bg-[var(--color-primary-blue)]')

            event.currentTarget.classList.remove('text-white')
            event.currentTarget.classList.add('text-black')
        }
    }
    
    return (
        <div className="w-full min-h-[120px] flex items-stretch gap-10 rounded-[28px] bg-[var(--color-primary-blue)] px-6 py-4 shadow-md transition hover:scale-[1.01]"
        onMouseEnter={(e)=>onCardMouseAction(e)}
        onMouseLeave={(e)=>onCardMouseAction(e)}
        >
            {children}
        </div>
    )
}