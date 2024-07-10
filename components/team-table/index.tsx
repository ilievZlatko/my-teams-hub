'use client'

import { useTransition } from 'react'
import { Trash2, FilePenLine } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import Image from 'next/image'
import { Button } from '../ui/button'
import { getAllTeams } from '@/actions/team.actions'

export const TeamTable = (props: any) => {
  const [isPending, startTransition] = useTransition()

  const editTeam = async () => {
    console.log('editTeam')
  }

  const deleteTeam = async () => {
    console.log('deleteTeam')
  }

  return (
    <div className="w-full">
      <Table className="flex w-full flex-col overflow-hidden rounded-[12px] bg-transparent">
        <TableBody>
          <TableRow className="flex w-full items-center justify-between">
            <TableCell className="font-medium">{props.team.teamId}</TableCell>
            <TableCell>
              <div className="flex w-full items-center justify-center gap-[6px] rounded-[12px]">
                <Image
                  src="/assets/images/team2.svg"
                  className="h-[40px] w-[40px] rounded-[6px] border-[3px] border-transparent lg:h-[40px]"
                  width={40}
                  height={40}
                  alt="author"
                  priority
                />
                <p>{props.team.name}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex content-center justify-center">
                <Image
                  src="/assets/images/team2.svg"
                  className="h-[40px] w-[40px] rounded-full border-[1.6px]"
                  width={30}
                  height={30}
                  alt="team"
                  priority
                />
                <Image
                  src="/assets/images/team2.svg"
                  className="h-[40px] w-[40px] rounded-full border-[1.6px]"
                  width={30}
                  height={30}
                  alt="team"
                  priority
                />
                <Image
                  src="/assets/images/team2.svg"
                  className="h-[40px] w-[40px] rounded-full border-[1.6px]"
                  width={30}
                  height={30}
                  alt="team"
                  priority
                />
                <p className="ml-[6px] content-center">+5</p>
              </div>
            </TableCell>
            <TableCell>13/05/2022</TableCell>
            <TableCell className="text-right">
              <div className="mt-[10px] flex justify-center gap-[18px]">
                <FilePenLine
                  className="cursor-pointer bg-transparent text-[#63929E]"
                  onClick={() => editTeam()}
                />
                <Trash2
                  className="cursor-pointer bg-transparent text-[#F63333]"
                  onClick={() => deleteTeam()}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
