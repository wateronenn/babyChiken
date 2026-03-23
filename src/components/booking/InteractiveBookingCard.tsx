'use client'
import React from 'react'

export default function InteractiveBookingCard({children} : {children:React.ReactNode}) {

    function onCardMouseAction(event:React.SyntheticEvent) {
        if(event.type == 'mouseover') {
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
        <div className='w-[1000] h-fit p-5 shadow-lg rounded-lg bg-[var(--color-primary-blue)]
        text-black flex flex-row space-x-10'
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut={(e)=>onCardMouseAction(e)}
        >
            {children}
        </div>
    )
}