'use client'

import Link from 'next/link'

import { Button, ButtonProps } from '@/components/ui/button'

interface BackButtonProps extends ButtonProps {
  questionLabel: string
  actionLabel?: string
  href: string
}

export const BackButton = ({
  questionLabel,
  actionLabel,
  href,
  ...props
}: BackButtonProps) => {
  return (
    <div>
      <Button
        asChild
        variant="link"
        size="sm"
        className="w-full font-normal"
        {...props}
      >
        <Link href={href} className="gap-1 text-xs text-[#3C4B57]">
          {questionLabel}
          {actionLabel && <span className="font-semibold">{actionLabel}</span>}
        </Link>
      </Button>
    </div>
  )
}
