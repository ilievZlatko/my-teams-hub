'use client'

import { useTransition } from 'react'
import { Trash2, FilePenLine } from 'lucide-react';

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
import { Button } from '../ui/button'
import { getAllTeams } from '@/actions/team.actions'

export const TeamTable = (props: any) => {
  const [isPending, startTransition] = useTransition()

  const editTeam = async () => {
    console.log('editTeam');
  }


  const deleteTeam = async () => {
    console.log('deleteTeam');
  }



  return (
    <div className="w-full">
      <Table className="w-full flex flex-col bg-transparent rounded-[12px] overflow-hidden">

        <TableBody>
          <TableRow className='w-full flex justify-between items-center'>
            <TableCell className="font-medium">{props.team.teamId}</TableCell>
            <TableCell>
              <div className="flex justify-center items-center w-full rounded-[12px] gap-[6px]">
                <Image
                  src="/assets/images/team2.svg"
                  className="h-[40px] w-[40px] lg:h-[40px] rounded-[6px] border-[3px] border-transparent"
                  width={40}
                  height={40}
                  alt="author"
                  priority
                />
                <p>{props.team.name}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex justify-center content-center'>
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
                <p className='ml-[6px] content-center'>+5</p>
              </div>
            </TableCell>
            <TableCell>13/05/2022</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-center mt-[10px] gap-[18px]">
              <FilePenLine className='text-[#63929E] bg-transparent cursor-pointer' onClick={() => editTeam()}/>
                <Trash2 className='text-[#F63333] bg-transparent cursor-pointer'  onClick={() => deleteTeam()}/>
              </div>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </div>
  )
}
