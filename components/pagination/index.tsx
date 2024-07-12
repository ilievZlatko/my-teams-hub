'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export type PaginationComponentProps = {
  nextPage: () => void
  previousPage: () => void
  sendCurrentPage: (data: number) => void
  currentPage: number
  countPages: number
}

export const PaginationComponent = (props: PaginationComponentProps) => {
  return (
    <Pagination className="text-mth-grey-blue-700">
      <PaginationContent className="flex max-sm:!flex-wrap">
        <PaginationItem className="text-mth-grey-blue-600">
          <PaginationPrevious
            className={
              props.currentPage === 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer text-white'
            }
            onClick={() => {
              props.previousPage()
            }}
          />
        </PaginationItem>
        {(() => {
          const arr = []
          for (let i = 1; i <= props.countPages; i++) {
            arr.push(
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => props.sendCurrentPage(i)}
                  className={cn(
                    'h-[32px] w-[32px] rounded-[8px] max-sm:h-[25px] max-sm:w-[25px]',
                    props.currentPage === i
                      ? 'cursor-pointer bg-mth-dark-50'
                      : 'cursor-pointer bg-mth-grey-blue-600 text-white',
                  )}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>,
            )
          }
          return arr
        })()}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={
              props.currentPage === props.countPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer text-white'
            }
            onClick={() => {
              props.nextPage()
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
