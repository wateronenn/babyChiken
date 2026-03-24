'use client'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function StyledButton({color, title, pageRef, type, onClick} : {
  color:'purple'|'red',
  title:string,
  pageRef?:string,
  type?: 'button' | 'submit' | 'reset',
  onClick?:Function}) {

    const colorClass =
    color === 'purple'
      ? "bg-[var(--color-second-purple)] hover:bg-[var(--color-primary-purple)]"
      : "bg-[var(--color-primary-red)] hover:bg-[var(--color-second-red)]"

    const button = ( <Button
        type={type ?? 'button'}
        onClick={() => onClick?.()}
        sx={{
            borderRadius: '999px',
            px: 3,
            py: 1.5,
            fontWeight: 500,
            color: 'white',
            boxShadow: 1,
            textTransform: 'none',
            backgroundColor:
            color === 'purple'
                ? 'var(--color-primary-purple)'
                : 'var(--color-primary-red)',
            '&:hover': {
            backgroundColor:
                color === 'purple'
                ? 'var(--color-second-purple)'
                : 'var(--color-second-red)',
            },
        }}
      >
        {title}
      </Button>
    )

    return pageRef ? <Link href={pageRef}>{button}</Link> : button
}