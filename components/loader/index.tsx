import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

export const Loader = ({
  className,
  size,
}: {
  className?: string
  size?: number
}) => {
  return (
    <Loader2Icon
      size={size ?? 34}
      className={cn('mx-auto animate-spin text-mth-blue-400', className)}
    />
  )
}
