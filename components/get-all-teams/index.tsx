'use client'

import { useEffect, useState, useTransition } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/card'

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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Image from 'next/image'
import { Input } from '../ui/input'
import { getAllTeams } from '@/actions/team.actions'
import { searchSchema, searchType } from '@/schemas/get-all-teams.schema'
import { TeamCard } from '../team-card'
import { useLocale, useTranslations } from 'next-intl'

import { Search, LayoutGrid, List } from 'lucide-react';
import { PaginationComponent } from '../pagination'
import { TeamTable } from '../team-table'
import { Team } from '@/types/team.types'

export const GetAllTeamsForm = () => {
  const t = useTranslations('page')
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const [valueState, setValue] = useState(1);
  const [teamView, setTeamView] = useState(false);
  const [allTeams, setAllTeams] = useState({}) as any;

  const rowsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(rowsPerPage);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllTeams().then(
      data => setAllTeams(data)
    );

  }, []);

  const form = useForm<searchType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  })

  function handleSearchChange(e: any) {
    setSearchValue(e.target.value);
}

  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const valueChange = async (value: string) => {
    setValue(Number(value));
  }

  const teamViewChange = async () => {
    setTeamView(!teamView);
  }

  const previousPage = () => {
    setCurrentPage(currentPage => currentPage - 1)
  }

  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }

  function handleDataFromChild(data: number) {
    setCurrentPage(data);
  }

  let firstTeam = 0;
  if (currentPage !== 1) {
    firstTeam = valueState * (currentPage - 1)
  }

  let countPages = Math.ceil(allTeams.teams?.length / valueState); 
  
  let filteredArrayTeams = allTeams.teams?.slice(firstTeam, (valueState * currentPage));
  
  const search = async () => {
    console.log(searchValue);
    setSearchValue('');
  }



  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-1">
      <Card className="flex w-full flex-col border-0 bg-transparent shadow-none">
        <CardHeader className="relative flex mb-2 w-full lg:mb-10">
          <h1 className="font-roboto text-[32px] text-center font-normal leading-[38.4px]">
            {t('team.index.title')}
          </h1>
          <span className="relative bottom-0 left-[50%] h-[2px] w-[30%] translate-x-[-50%] rounded bg-border"></span>
          {teamView ?
            <LayoutGrid className='absolute top-[50%] translate-y-[-50%] right-0 cursor-pointer' onClick={teamViewChange} />
            :
            <List className='absolute top-[50%] translate-y-[-50%] right-0 cursor-pointer' onClick={teamViewChange} />}
        </CardHeader>
        <CardContent className={teamView === true ? 'border rounded-[12px]' : ''}>
          <Form {...form}>
            <form className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex mt-[40px] mb-[20px]'>
                        <div className="relative">
                          <Input
                            {...field}
                            type='text'
                            placeholder={t('team.index.search_placeholder')}
                            className="form-input placeholder:text-xs w-[400px] m-[10px] px-[36px]"
                            disabled={isPending}
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                          <span className="absolute top-[20px] left-[20px]">
                            <Search
                              className="size-5 cursor-pointer select-none text-[#63929e]"
                            />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {teamView ?
            <div className="flex flex-col justify-between">
                      <TableHeader>
          <TableRow className='w-full flex justify-between border-none'>
            <TableHead className='mr-auto'>Team ID</TableHead>
            <TableHead className='ml-auto'>
            <div className="flex justify-center items-center w-full rounded-[12px] gap-[6px]">
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
            <TableHead className='lg:mr-auto lg:ml-[180px]'>
            <div className="flex justify-center items-center w-full rounded-[12px] gap-[6px]">
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
            <TableHead className='lg:mr-[50px] md:mr-[0px]'>
            <div className="flex justify-center items-center w-full rounded-[12px] gap-[6px]">
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
              {filteredArrayTeams?.map((team: Team) =>
                <TeamTable key={team.teamId} team={team} />
              )}
            </div> :
            <div className="flex justify-between">
              {filteredArrayTeams?.map((team: Team) =>
                <TeamCard key={team.teamId} team={team} />
              )}
            </div>
          }
        </CardContent>
        <div className='flex gap-[10px] items-center justify-end mt-[16px]'>
          <p>Show</p>
          <div className='w-[60px]'>
            <Select onValueChange={valueChange}>
              <SelectTrigger className="w-full bg-transparent">
                <SelectValue
                  placeholder={valueState}
                />
              </SelectTrigger>
              <SelectContent>
                {pages?.map((page) => (
                  <SelectItem
                    key={page}
                    value={page.toString()}
                  >
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardFooter className='mt-[100px]'>
          <PaginationComponent nextPage={nextPage} previousPage={previousPage} sendCurrentPage={handleDataFromChild} currentPage={currentPage} countPages={countPages} />
        </CardFooter>
      </Card>
    </div>
  )
}
