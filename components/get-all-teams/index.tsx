'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Search, LayoutGrid, List } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Input } from '../ui/input'
import { getAllTeams } from '@/actions/team.actions'
import { Organisation } from '@/types/organisation.types'
import { TeamList, Team } from '@/types/team'
import { useSession } from 'next-auth/react'
import { searchSchema, searchType } from '@/schemas/get-all-teams.schema'
import { TeamCard } from '@/components/team-card'
import { PaginationComponent } from '@/components/pagination'
import { TeamTable } from '@/components/team-table'
import { Loader } from '@/components/loader'

export const GetAllTeamsComponent = () => {
  const t = useTranslations('page')
  const tErrors = useTranslations('apierrors')

  const { data: session, status } = useSession()
  const [hasSession, setHasSession] = useState(false)

  const [valueState, setValue] = useState(1)
  const [teamView, setTeamView] = useState(false)
  const [allTeams, setAllTeams] = useState<TeamList | undefined>(undefined)

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

      fetchTeams()
    }
  }, [hasSession, session?.user.activeOrg])

  function fetchTeams() {
    setIsFetchingData(true)

    getAllTeams(session?.user.activeOrg!)
      .then((data) => {
        if (Object.keys(data).find((key) => key === 'teams')) {
          setAllTeams(data as TeamList)
        } else {
          setAllTeams(undefined)

          //@ts-expect-error
          toast.error(tErrors(data.error))
        }
      })
      .finally(() => {
        setIsFetchingData(false)
      })
  }

  const form = useForm<searchType>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: '' },
  })

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const valueChange = async (value: string) => {
    setValue(Number(value))
  }

  const teamViewChange = async () => {
    setTeamView(!teamView)
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

  let firstTeam = 0
  if (currentPage !== 1) {
    firstTeam = valueState * (currentPage - 1)
  }

  let countPages =
    allTeams !== undefined ? Math.ceil(allTeams?.total / valueState) : 1

  let filteredArrayTeams = allTeams?.teams?.slice(
    firstTeam,
    valueState * currentPage,
  )

  if (searchValue.trim() !== '' && filteredArrayTeams) {
    filteredArrayTeams = filteredArrayTeams.filter((team) =>
      team.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }

  function search() {
    setSearchValue('')
  }

  if (!session || isFetchingData) return <Loader />

  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-1">
      <Card className="flex w-full flex-col border-0 bg-transparent shadow-none">
        <CardHeader className="relative mb-2 flex w-full lg:mb-10">
          <h1 className="text-center font-roboto text-[32px] font-normal leading-[38.4px]">
            {t('team.index.title')}
          </h1>
          <span className="relative bottom-0 left-[50%] h-[2px] w-[30%] translate-x-[-50%] rounded bg-border" />
          {teamView ? (
            <LayoutGrid
              className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={teamViewChange}
            />
          ) : (
            <List
              className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={teamViewChange}
            />
          )}
        </CardHeader>

        <CardContent
          className={teamView === true ? 'rounded-[12px] border' : ''}
        >
          <Form {...form}>
            <form className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="mb-[20px] mt-[40px] flex">
                        <div className="relative">
                          <Input
                            {...field}
                            type="text"
                            placeholder={t('team.index.search_placeholder')}
                            className="form-input m-[10px] w-[400px] px-[36px] placeholder:text-xs"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                          <span className="absolute left-[20px] top-[20px]">
                            <Search className="size-5 cursor-pointer select-none text-[#63929e]" />
                          </span>
                        </div>
                        <Image
                          src="/assets/images/vector.svg"
                          className="h-auto w-full max-w-[20px] cursor-pointer"
                          alt="vector logo"
                          width={10}
                          height={10}
                          priority
                          onClick={search}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {teamView ? (
            <div className="flex flex-col justify-between">
              <TableHeader>
                <TableRow className="flex w-full justify-between border-none">
                  <TableHead className="mr-auto">Team ID</TableHead>
                  <TableHead className="ml-auto">
                    <div className="flex w-full items-center justify-center gap-[6px] rounded-[12px]">
                      <p>Name</p>
                      <Image
                        src="/assets/images/up_and_down_arrow.svg"
                        className="h-[16px] w-[16px] lg:h-[16px]"
                        width={20}
                        height={20}
                        alt="arrow"
                        priority
                      />
                    </div>
                  </TableHead>
                  <TableHead className="lg:ml-[180px] lg:mr-auto">
                    <div className="flex w-full items-center justify-center gap-[6px] rounded-[12px]">
                      <p>Members</p>
                      <Image
                        src="/assets/images/up_and_down_arrow.svg"
                        className="h-[16px] w-[16px] lg:h-[16px]"
                        width={20}
                        height={20}
                        alt="arrow"
                        priority
                      />
                    </div>
                  </TableHead>
                  <TableHead className="md:mr-[0px] lg:mr-[50px]">
                    <div className="flex w-full items-center justify-center gap-[6px] rounded-[12px]">
                      <p>Date of creation</p>
                      <Image
                        src="/assets/images/up_and_down_arrow.svg"
                        className="h-[16px] w-[16px] lg:h-[16px]"
                        width={20}
                        height={20}
                        alt="arrow"
                        priority
                      />
                    </div>
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              {filteredArrayTeams?.map((team: Team) => (
                <TeamTable key={team.teamId} team={team} />
              ))}
            </div>
          ) : (
            <div className="flex justify-between">
              {filteredArrayTeams?.map((team: Team) => (
                <TeamCard
                  key={team.teamId}
                  team={team}
                  organization={currentOrganization?.organizationName}
                />
              ))}
            </div>
          )}
        </CardContent>
        <div className="mt-[16px] flex items-center justify-end gap-[10px]">
          <p>Show</p>
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

        <CardFooter className="mt-[100px]">
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
