'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const PaginationComponent = (props: any)=> {

  return (
  <Pagination className='text-mth-grey-blue-700'>
  <PaginationContent>
    <PaginationItem className='text-mth-grey-blue-600'>
      <PaginationPrevious className={props.currentPage === 1 ? "pointer-events-none opacity-50" : "text-white cursor-pointer"}
      onClick={() => {
        props.previousPage();
      }}/>
    </PaginationItem>
    {(() => {
            const arr = [];
            for (let i = 1; i <= props.countPages; i++) {
                arr.push(
                  <PaginationItem>
                  <PaginationLink onClick={() => props.sendCurrentPage(i)} className={(props.currentPage === i) ? 'bg-mth-dark-50 cursor-pointer' : 'bg-black text-white cursor-pointer'}>{i}</PaginationLink>
                </PaginationItem>
                );
            }
            return arr;
        })()}
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext  className={props.currentPage === props.countPages ? "pointer-events-none opacity-50" : "text-white cursor-pointer"}
            onClick={() => {
              props.nextPage();
            }}/>
    </PaginationItem>
  </PaginationContent>
</Pagination>
  )
}
