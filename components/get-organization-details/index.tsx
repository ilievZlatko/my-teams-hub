'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { Search, X, FilePenLine, Save } from 'lucide-react'
import { useSession } from 'next-auth/react'
import useWindowSize from '@custom-react-hooks/use-window-size'


import { getAllTeams } from '@/actions/team.actions'
import useDebounce from '@/hooks/useDebounce'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Input } from '@/components/ui/input'
import { PaginationComponent } from '@/components/pagination'

import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'

import { OrganisationDetailsCard } from '../organization-details-card'


export const GetOrganizationDetails = ({ id }: { id: string }) => {
  const { width } = useWindowSize(200)

  const t = useTranslations('page.organization.details');
  const tErrors = useTranslations('apierrors')

  const { data: session, status, update } = useSession()
  const [hasSession, setHasSession] = useState(false)

  const [valueState, setValue] = useState(10)
  const [allTeams, setAllTeams] = useState<TeamList | undefined>(undefined)

  const [isFetchingData, setIsFetchingData] = useState(false)

  const [hover, setHover] = useState(false);

  const [currentOrg, setCurrentOrg] = useState<Organisation | undefined>(
    undefined,
  )

  const rowsPerPage = 1
  const [currentPage, setCurrentPage] = useState(rowsPerPage)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue, 200)


    const [editName, setEditName] = useState(true)
    const [nameValue, setNameValue] = useState('')
  
    const [editDescription , setEditDescription ] = useState(true)
    const [descriptionValue, setDescriptionValue] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, consequuntur!')

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
      setNameValue(e.target.value)
    }

    function handleNDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
      setDescriptionValue(e.target.value)
    }

    function saveNameHandler() {
      // TODO: update session and save in database
      setEditName(currState => !currState)
    }

    function saveDescriptionHandler() {
      // TODO: update session and save in database
      setEditDescription(currState => !currState)
    }

    function changeLogoHandler() {
      // TODO
    }

  let filteredTeams = allTeams && allTeams?.teams ? allTeams.teams : []

  useEffect(() => {
    if (session && status === 'authenticated') setHasSession(true)
  }, [session])

  useEffect(() => {
    if (session?.user?.activeOrg) {
      setCurrentOrg(
        () =>
          session.user.organizations.filter(
            (org: Organisation) =>
              org.organizationId === id,
          )[0],
      )

      setNameValue(currentOrg?.organizationName!)

      fetchTeams()

    }
  }, [hasSession, session?.user.activeOrg])

  function fetchTeams() {
    if (!session) return
    setIsFetchingData(true)

    getAllTeams(id)
      .then((data) => {

        if (Object.keys(data).find((key) => key === 'teams')) {
          setAllTeams(data as TeamList)
        } else {
          setAllTeams(undefined)

          //@ts-expect-error: unknown error type
          toast.error(tErrors(data.error))
        }
      })
      .finally(() => {
        setIsFetchingData(false)
      })
  }


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

  if (debouncedSearch.trim() !== '') {
    filteredTeams = filteredTeams.filter((team) =>
      team.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }

  const countPages = Math.ceil(filteredTeams.length / valueState) ?? 1

  filteredTeams = filteredTeams.slice(firstTeam, valueState * currentPage)

  if (!session || isFetchingData)
    return <Loader size={44} className="m-auto flex h-[50vh] items-center" />

  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-1 xl:max-w-[1100px]">

      <Card className="flex w-full flex-col border-none bg-transparent shadow-none">
        <CardHeader className="flex relative mb-[20px] w-full lg:mb-3">
          <div className='flex justify-center gap-[40px] h-[97px] mb-[20px]'>
            <div className="relative flex justify-center content-center w-[97px] h-[97px] top-[0px] rounded-full border-[3px] border-white bg-mth-blue-100 overflow-hidden"
              onMouseEnter={e => {
                setHover(true);
              }}
              onMouseLeave={e => {
                setHover(false)
              }}>
              {hover ?
                <button onClick={changeLogoHandler} className='transition-opacity ease-in duration-500 opacity-0 hover:opacity-100 absolute w-[100%] h-[100%] bottom-0 z-10 text-sm rounded-br bg-mth-blue-500'>
                  {t('change')}
                </button>
                :
                <h1 className='self-center text-4xl font-bold text-mth-grey-blue-500'>{currentOrg?.organizationName.slice(0, 1).toUpperCase()}</h1>
              }
            </div>
            <div className="flex-col justify-between content-center relative mb-1 flex lg:mb-3 ">
              {editName ?
              <div className="flex justify-center items-center gap-[30px]">
                <h1 className="text-center font-roboto text-[32px] font-normal leading-[38.4px] text-mth-white-50">
                  {currentOrg ? currentOrg.organizationName : ''}
                </h1>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FilePenLine
                        strokeWidth={'1.8'}
                        className="cursor-pointer bg-transparent text-mth-blue-500"
                        onClick={() => setEditName(currState => !currState)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{t('edit')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              :
              <div className="flex justify-center items-center gap-[30px]">
              <Input
                type="text"
                placeholder=''
                className="w-[300px] px-[34px] placeholder:text-xs max-sm:w-[200px] max-sm:px-[31px]"
                value={nameValue}
                onChange={handleNameChange}
              />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Save
                        strokeWidth={'1.8'}
                        className="cursor-pointer bg-transparent text-mth-blue-500"
                        onClick={saveNameHandler}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{t('save')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
               }
              <span className="relative left-[50%] max-w-[220px] translate-x-[-50%] rounded border" />
              {editDescription ?
              <div className="flex justify-center items-center gap-[30px]">
              <p className="text-center font-roboto font-normal leading-[38.4px] text-mth-white-50">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
                consequuntur!
              </p>
              <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FilePenLine
                        strokeWidth={'1.8'}
                        className="cursor-pointer bg-transparent text-mth-blue-500"
                        onClick={() => setEditDescription(currState => !currState)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{t('edit')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              :
              <div className="flex justify-center items-center gap-[30px]">
              <Input
                type="text"
                placeholder=''
                className="w-[300px] px-[34px] placeholder:text-xs max-sm:w-[200px] max-sm:px-[31px]"
                value={descriptionValue}
                onChange={handleNDescriptionChange}
              />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Save
                        strokeWidth={'1.8'}
                        className="cursor-pointer bg-transparent text-mth-blue-500"
                        onClick={saveDescriptionHandler}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{t('save')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
               }
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mx-auto mb-8 flex w-full max-w-[1100px] items-center justify-center max-lg:gap-3 max-sm:gap-1 lg:justify-start lg:pl-4">

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

          </div>

          {width >= 1024 ? (
            debouncedSearch.trim() !== '' && filteredTeams.length === 0 ? (
              <p className="flex min-h-[200px] items-center justify-center text-lg text-mth-dark-200 max-sm:text-sm">
                {t('no_results')}
              </p>
            ) : (
              <div className="mx-auto w-full">
                <div className="mx-0 grid grid-cols-3 gap-2 xl:grid-cols-4">
                  {filteredTeams.map((team: Team) => (
                    <OrganisationDetailsCard
                      key={team.teamId}
                      {...team}
                    />
                  ))}
                </div>
              </div>
            )
          ) : debouncedSearch.trim() !== '' && filteredTeams.length === 0 ? (
            <p className="flex min-h-[200px] items-center justify-center text-lg text-mth-dark-200 max-sm:text-sm">
              {t('no_results')}
            </p>
          ) : (
            <div className="mx-auto w-full px-0 md:px-1">
              <div className="grid gap-3 max-md:grid-cols-2 max-md:gap-5 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {filteredTeams?.map((team: Team) => (
                  <OrganisationDetailsCard
                    key={team.teamId}
                    {...team}

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
