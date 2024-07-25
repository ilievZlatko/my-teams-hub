'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Search, LayoutGrid, List, X, Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import useWindowSize from '@custom-react-hooks/use-window-size'

import { Organisation } from '@/types/organisation.types'

import useDebounce from '@/hooks/useDebounce'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PaginationComponent } from '@/components/pagination'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { OrganizationCard } from '@/components/organization-card'
import { OrganizationTable } from '@/components/organization-table'

export const GetAllOrganizations = ({
  organizations,
}: {
  organizations: Organisation[]
}) => {
  const { width } = useWindowSize(200)

  const t = useTranslations('page.organization.index')

  const [valueState, setValue] = useState(10)
  const [isLayoutGrid, setIsLayoutGrid] = useState(true)
  const [allOrgs, setAllOrgs] = useState<Organisation[]>(organizations)

  const [isFetchingData, setIsFetchingData] = useState(true)

  const rowsPerPage = 1
  const [currentPage, setCurrentPage] = useState(rowsPerPage)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 200)

  useEffect(() => {
    setAllOrgs(organizations)
    setIsFetchingData(false)
  }, [])

  let filteredOrgs = allOrgs ?? []

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, valueState])

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  function valueChange(value: string) {
    setValue(Number(value))
  }

  function onLayoutChange() {
    setIsLayoutGrid(!isLayoutGrid)
  }

  const previousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1)
  }

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  function handleDataFromChild(data: number) {
    setCurrentPage(data)
  }

  let firstOrg = 0
  if (currentPage !== 1) {
    firstOrg = valueState * (currentPage - 1)
  }

  if (debouncedSearch.trim() !== '') {
    filteredOrgs = filteredOrgs.filter((organization) =>
      organization.organizationName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    )
  }

  const countPages = Math.ceil(filteredOrgs.length / valueState) ?? 1

  filteredOrgs = filteredOrgs.slice(firstOrg, valueState * currentPage)

  if (isFetchingData)
    return <Loader size={44} className="m-auto flex h-[50vh] items-center" />

  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-1 xl:max-w-[1100px]">
      <Card className="flex w-full flex-col border-none bg-transparent shadow-none">
        <CardHeader className="relative mb-1 flex w-full lg:mb-3">
          <h1 className="mb-1 text-center font-roboto text-[32px] font-normal leading-[38.4px] text-mth-grey-blue-700">
            {t('title')}
          </h1>
          <span className="relative left-[50%] max-w-[300px] translate-x-[-50%] rounded border lg:max-w-[340px]" />
        </CardHeader>

        <CardContent
          className={
            !isLayoutGrid ? 'rounded-[12px]' : 'mx-auto px-0 max-sm:px-1'
          }
        >
          <div className="mx-auto mb-8 flex w-full max-w-[1100px] items-center justify-center max-lg:gap-3 max-sm:gap-1 lg:justify-start lg:pl-4">
            <Image
              src="/assets/images/vector.svg"
              className="me-3 select-none max-lg:me-0 max-sm:size-[14px]"
              alt="filter icon"
              width={16}
              height={16}
              priority
            />
            <div className="relative">
              <Input
                type="text"
                placeholder={t('search_placeholder')}
                className="w-[300px] px-[34px] placeholder:text-xs max-sm:w-[200px] max-sm:px-[31px]"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <span className="absolute left-[10px] top-[11px] max-sm:left-[9px] max-sm:top-[12px]">
                <Search className="size-5 select-none text-mth-blue-500 max-sm:size-4" />
              </span>
              <span className="absolute left-[271px] top-[11px] max-sm:left-[177px] max-sm:top-[12px]">
                <X
                  className={cn(
                    'size-5 cursor-pointer select-none text-mth-blue-500 max-sm:size-4',
                    searchValue !== '' ? 'block' : 'hidden',
                  )}
                  onClick={() => setSearchValue('')}
                />
              </span>
            </div>

            <div className="relative flex items-center justify-center *:text-sm lg:w-full lg:justify-end">
              {width >= 1024 ? (
                isLayoutGrid ? (
                  <List
                    className="absolute right-2 top-[8px] cursor-pointer text-mth-blue-500"
                    onClick={onLayoutChange}
                  />
                ) : (
                  <LayoutGrid
                    className="absolute right-2 top-[8px] cursor-pointer text-mth-blue-500"
                    onClick={onLayoutChange}
                  />
                )
              ) : null}
              <Link
                href="/organizations/create"
                prefetch
                className="flex items-center justify-center gap-2 rounded-xl bg-mth-blue-500 px-3 py-2.5 font-normal text-white transition hover:bg-mth-blue-500/70 max-sm:h-[40px] max-sm:w-[36px] max-sm:p-0 sm:ml-1 lg:me-14 lg:ml-2"
              >
                {width >= 1024 ? (
                  <>
                    <Plus size={16} />
                    {t('create_org_btn')}
                  </>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image
                          src="/assets/images/building-plus.svg"
                          alt="create team"
                          width={20}
                          height={20}
                          className="invert max-sm:w-[18px]"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{t('create_org_btn')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </Link>
            </div>
          </div>

          {width >= 1024 ? (
            isLayoutGrid ? (
              debouncedSearch.trim() !== '' && filteredOrgs.length === 0 ? (
                <p className="flex min-h-[200px] items-center justify-center text-lg text-mth-dark-200 max-sm:text-sm">
                  {t('no_results')}
                </p>
              ) : (
                <div className="mx-auto w-full">
                  <div className="mx-0 grid grid-cols-3 gap-2 xl:grid-cols-4">
                    {filteredOrgs.map((organization) => (
                      <OrganizationCard
                        key={organization.organizationId}
                        organization={organization}
                      />
                    ))}
                  </div>
                </div>
              )
            ) : debouncedSearch.trim() !== '' && filteredOrgs.length === 0 ? (
              <p className="flex min-h-[200px] items-center justify-center text-lg text-mth-dark-200 max-sm:text-sm">
                {t('no_results')}
              </p>
            ) : (
              <div className="px-[6px]">
                <OrganizationTable organizations={filteredOrgs} />
              </div>
            )
          ) : debouncedSearch.trim() !== '' && filteredOrgs.length === 0 ? (
            <p className="flex min-h-[200px] items-center justify-center text-lg text-mth-dark-200 max-sm:text-sm">
              {t('no_results')}
            </p>
          ) : (
            <div className="mx-auto w-full px-0 md:px-1">
              <div className="grid gap-3 max-md:grid-cols-2 max-md:gap-5 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {filteredOrgs?.map((organization) => (
                  <OrganizationCard
                    key={organization.organizationId}
                    organization={organization}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid w-full grid-cols-1 place-items-end *:text-xs">
            <div className="mt-8 flex items-center gap-2 pr-1 max-sm:pr-[18px]">
              <p>{t('show')}</p>
              <div className="w-[60px] max-sm-[319px]:-mr-4">
                <Select onValueChange={valueChange}>
                  <SelectTrigger className="h-9 border-none bg-mth-dark-50 px-2.5 py-1 text-xs">
                    <SelectValue placeholder={valueState} className="text-xs" />
                  </SelectTrigger>
                  <SelectContent className="min-w-[60px]">
                    {pages?.map((page) => (
                      <SelectItem
                        key={page}
                        value={page.toString()}
                        className="flex justify-center pl-3 pr-1 text-xs"
                      >
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-[40px] max-sm:pb-20">
          <PaginationComponent
            nextPage={nextPage}
            previousPage={previousPage}
            sendCurrentPage={handleDataFromChild}
            currentPage={currentPage}
            countPages={countPages}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
