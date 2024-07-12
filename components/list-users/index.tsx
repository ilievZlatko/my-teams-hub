'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Search, LayoutGrid, List, X } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Organisation } from '@/types/organisation.types'
import { getAllUsers } from '@/actions/user.actions'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
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
import { Input } from '@/components/ui/input'
import { PaginationComponent } from '@/components/pagination'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'
import { UserList } from '@/types/user'

export const GetAllUsersComponent = () => {
    const t = useTranslations('page.user.index')
    const tErrors = useTranslations('apierrors')

    const { data: session, status } = useSession()
    const [hasSession, setHasSession] = useState(false)

    const [valueState, setValue] = useState(1)
    const [userView, setuserView] = useState(false)
    const [allUsers, setAllUsers] = useState<UserList | undefined>(undefined)

    const [isFetchingData, setIsFetchingData] = useState(false)
    const [currentOrganization, setCurrentOrganization] = useState<
        Organisation | undefined
    >(undefined)

    const rowsPerPage = 1
    const [currentPage, setCurrentPage] = useState(rowsPerPage)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (session && status === 'authenticated') setHasSession(true)
    }, [session])

    useEffect(() => {
        if (session?.user?.activeOrg) {
            setCurrentOrganization(
                () =>
                    session.user.organizations.filter(
                        (org: Organisation) =>
                            org.organizationId === session.user.activeOrg,
                    )[0],
            )

            fetchUsers()
        }
    }, [hasSession, session?.user.activeOrg])

    function fetchUsers() {
        if (!session) return

        setIsFetchingData(true)

        getAllUsers()
            .then((data) => {
                console.log(data)
                // if (Object.keys(data).find((key) => key === 'users')) {
                //   setAllUsers(data as UserList)
                // } else {
                //   setAllUsers(undefined)

                //   toast.error(tErrors(data.error))
                // }
            })
            .finally(() => {
                setIsFetchingData(false)
            })
    }

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
    }

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const valueChange = async (value: string) => {
        setValue(Number(value))
    }

    const userViewChange = async () => {
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

    let firstUser = 0
    if (currentPage !== 1) {
        firstUser = valueState * (currentPage - 1)
    }

    const countPages =
        allUsers !== undefined ? Math.ceil(allUsers?.total / valueState) : 1


    if (!session || isFetchingData) return <Loader size={44} className="m-auto" />

    return (
        <div className="flex w-full flex-col lg:flex-row lg:gap-1 xl:max-w-[1100px]">
            <Card className="flex w-full flex-col border-none bg-transparent shadow-none">
                <CardHeader className="relative mb-1 flex w-full lg:mb-3">
                    <h1 className="text-center font-roboto text-[32px] font-normal leading-[38.4px] text-mth-grey-blue-700">
                        Team name
                    </h1>
                    <span className="relative left-[50%] max-w-[220px] translate-x-[-50%] rounded border" />
                    {userView ? (
                        <LayoutGrid
                            className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-mth-blue-500"
                            onClick={userViewChange}
                        />
                    ) : (
                        <List
                            className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-mth-blue-500"
                            onClick={userViewChange}
                        />
                    )}
                </CardHeader>

                <CardContent
                    className={
                        userView === true ? 'rounded-[12px] max-sm:px-1' : 'max-sm:px-1'
                    }
                >
                    <div className="mb-6 flex">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="form-input m-[10px] w-[300px] px-[36px] placeholder:text-xs max-sm:w-[240px]"
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                            <span className="absolute left-[20px] top-[20px]">
                                <Search className="size-5 select-none text-[#63929e] max-sm:size-4" />
                            </span>
                            <span className="absolute left-[280px] top-[20px] max-sm:left-[225px]">
                                <X
                                    className={cn(
                                        'size-5 cursor-pointer select-none text-[#63929e] max-sm:size-4',
                                        searchValue !== '' ? 'block' : 'hidden',
                                    )}
                                    onClick={() => setSearchValue('')}
                                />
                            </span>
                        </div>
                        <Image
                            src="/assets/images/vector.svg"
                            className="select-none"
                            alt="vector logo"
                            width={16}
                            height={16}
                            priority
                        />
                    </div>

                    {userView ? (
                        <div className="rounded-xl border-[3px] border-mth-blue-100 px-1 py-10 lg:px-4">
                            <Table>
                                <TableHeader className="border-none">
                                    <TableRow className="items-center border-none">
                                        <TableHead>
                                            <span className="flex items-center gap-1 max-sm:items-start">
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
                                            <span className="flex items-center gap-1 max-sm:items-start">
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
                                            <span className="flex items-center gap-1">
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
                                            <span className="flex items-center gap-1">
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

                                // TODO: List users in table format

                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex flex-col flex-wrap items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center">

                            // TODO: List users

                        </div>
                    )}

                </CardContent>

                <div className="mt-[16px] flex items-center justify-end gap-[10px] text-xs">
                    <p>{t('show')}</p>
                    <div className="w-[60px]">
                        <Select onValueChange={valueChange}>
                            <SelectTrigger className="w-full bg-transparent">
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
