'use client'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function StyledButton({type, title, pageRef, onClick} : {type:'purple'|'red', title:string, pageRef:string, onClick?:Function}) {
    const colorClass =
    type === 'purple'
      ? "bg-[var(--color-second-purple)] hover:bg-[var(--color-primary-purple)]"
      : "bg-[var(--color-primary-red)] hover:bg-[var(--color-second-red)]"

    return (
    <Link href={pageRef}>
      <Button
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
            type === 'purple'
                ? 'var(--color-primary-purple)'
                : 'var(--color-primary-red)',
            '&:hover': {
            backgroundColor:
                type === 'purple'
                ? 'var(--color-second-purple)'
                : 'var(--color-second-red)',
            },
        }}
      >
        {title}
      </Button>
    </Link>
  )
}