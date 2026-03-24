'use client'

import { Button } from '@mui/material'
import Link from 'next/link'

type Props = {
  color?: 'purple' | 'red' | 'blue'
  title: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

export default function StyledButton({
  color = 'purple',
  title,
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
}: Props) {

  const bgColor =
    color === 'purple'
      ? 'var(--color-primary-purple)'
      : color === 'blue'
      ? 'var(--color-primary-blue)'
      : 'var(--color-primary-red)'

  const hoverColor =
    color === 'purple'
      ? 'var(--color-second-purple)'
      : color === 'blue'
      ? 'var(--color-second-blue)'
      : 'var(--color-second-red)'

  return (
    <Button
      component={href ? Link : 'button'}   
      href={href}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        borderRadius: '999px',
        px: 3,
        py: 1.5,
        fontWeight: 500,
        color: 'white',
        boxShadow: 1,
        textTransform: 'none',
        backgroundColor: bgColor,
        '&:hover': {
          backgroundColor: hoverColor,
        },
      }}
    >
      {loading ? 'Loading...' : title}
    </Button>
  )
}