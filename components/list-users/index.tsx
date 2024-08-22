'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Search, LayoutGrid, List, X, Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { UserTableComponent } from '../user-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { PaginationComponent } from '@/components/pagination'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'
import useWindowSize from '@custom-react-hooks/use-window-size'
import { UserCard } from '../user-card'
import useDebounce from '@/hooks/useDebounce'

interface GetAllUsersComponentProps {
  users: IUser[]
}

export const GetAllUsersComponent = ({ users }: GetAllUsersComponentProps) => {
  const { width } = useWindowSize(200)

  const t = useTranslations('page.user.index')
  // TODO: Add translations for api errors later
  // const tErrors = useTranslations('apierrors')
  const rowsPerPage = 1
  const [valueState, setValue] = useState(1)
  const [userView, setuserView] = useState(false)
  const [currentPage, setCurrentPage] = useState(rowsPerPage)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 200)
  const [currentOrg, setCurrentOrg] = useState<Organisation | undefined>(
    undefined,
  )
  let filteredUsers = users

  const { data: session, status } = useSession()

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }
  useEffect(() => {
    if (session?.user?.activeOrg) {
      setCurrentOrg(
        () =>
          session.user.organizations.filter(
            (org: Organisation) =>
              org.organizationId === session.user.activeOrg,
          )[0],
      )
    }
  }, [session?.user.activeOrg])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, valueState])

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const valueChange = async (value: string) => {
    setValue(Number(value))
  }

  const OnUserViewChange = async () => {
    setuserView(!userView)
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

  if (status === 'loading') return <Loader size={44} className="m-auto" />

  if (!session) redirect('/login')

  let firstUser = 0
  if (currentPage !== 1) {
    firstUser = valueState * (currentPage - 1)
  }

  if (debouncedSearch.trim() !== '') {
    filteredUsers = filteredUsers.filter((user) =>
      user.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }

  const countPages = users ? Math.ceil(users.length / valueState) : 1
  filteredUsers = filteredUsers.slice(firstUser, valueState * currentPage)

  if (users?.length === 0) return <p>No users found</p>

  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-1 xl:max-w-[1100px]">
      <Card className="flex w-full flex-col border-none bg-transparent shadow-none">
        <CardHeader className="relative mb-1 flex w-full lg:mb-3">
          <h1 className="text-center font-roboto text-[32px] font-normal leading-[38.4px] text-mth-grey-blue-700">
            {currentOrg?.organizationName}
          </h1>
          <span className="relative left-[50%] max-w-[220px] translate-x-[-50%] rounded border" />
        </CardHeader>

        <CardContent
          className={
            userView === true ? 'rounded-[12px] max-sm:px-1' : 'max-sm:px-1'
          }
        >
          <div className="mx-auto mb-8 flex w-full max-w-[1100px] items-center justify-center max-lg:gap-3 max-sm:gap-1 lg:justify-start lg:pl-4">
            <Image
              src="/assets/images/vector.svg"
              className="me-3 select-none max-lg:me-0 max-sm:size-4"
              alt="vector logo"
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
                userView ? (
                  <List
                    className="absolute right-2 top-[8px] cursor-pointer text-mth-blue-500"
                    onClick={OnUserViewChange}
                  />
                ) : (
                  <LayoutGrid
                    className="absolute right-2 top-[8px] cursor-pointer text-mth-blue-500"
                    onClick={OnUserViewChange}
                  />
                )
              ) : null}
              <Link
                href="/users/create"
                prefetch
                className="flex items-center justify-center gap-2 rounded-xl bg-mth-blue-500 px-3 py-2.5 font-normal text-white transition hover:bg-mth-blue-500/70 max-sm:h-[40px] max-sm:w-[36px] max-sm:p-0 lg:me-14"
              >
                {width >= 1024 ? (
                  <>
                    <Plus size={16} />
                    {t('create_user_btn')}
                  </>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image
                          src="/assets/images/users-add.svg"
                          alt="create team"
                          width={20}
                          height={20}
                          className="max-sm:w-[18px]"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{t('create_user_btn')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </Link>
            </div>
          </div>

          {userView ? (
            <div className="rounded-xl border-[3px] border-mth-blue-100 px-1 py-10 lg:px-4">
              <Table>
                <TableHeader className="border-none">
                  <TableRow className="items-center border-none">
                    <TableHead>
                      <span className="flex items-center justify-between max-sm:items-start">
                        {t('name')}
                        <Image
                          src="/assets/images/up_and_down_arrow.svg"
                          width={11}
                          height={11}
                          alt="arrow"
                        />
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="flex items-center justify-between max-sm:items-start">
                        {t('team')}
                        <Image
                          src="/assets/images/up_and_down_arrow.svg"
                          width={11}
                          height={11}
                          alt="arrow"
                        />
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="flex items-center justify-between">
                        {t('creation_date')}
                        <Image
                          src="/assets/images/up_and_down_arrow.svg"
                          width={11}
                          height={11}
                          alt="arrow"
                        />
                      </span>
                    </TableHead>
                    <TableHead>
                      <span className="flex items-center justify-between">
                        {t('status')}
                        <Image
                          src="/assets/images/up_and_down_arrow.svg"
                          width={11}
                          height={11}
                          alt="arrow"
                          priority
                        />
                      </span>
                    </TableHead>
                    <TableHead>{t('action')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user: IUser) => (
                    <UserTableComponent
                      key={user.userId}
                      {...user}
                      creationDate={user.creationDate || new Date()}
                      teams={user.teams || []}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col flex-wrap items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center">
              {filteredUsers.map((user: IUser) => (
                <UserCard
                  key={user.userId}
                  {...user}
                  creationDate={user.creationDate || new Date()}
                  teams={user.teams || []}
                />
              ))}
            </div>
          )}
        </CardContent>

        <div className="mt-[16px] flex items-center justify-end gap-[10px] text-xs">
          <p>{t('show')}</p>
          <div className="w-[60px]">
            <Select onValueChange={valueChange}>
              <SelectTrigger className="h-9 border-none bg-mth-dark-50 px-2.5 py-1">
                <SelectValue placeholder={valueState} />
              </SelectTrigger>
              <SelectContent>
                {pages?.map((page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CardFooter className="mt-[50px]">
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
