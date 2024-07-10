'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

import Image from 'next/image'
import { Button } from '../ui/button'
import { getAllTeams } from '@/actions/team.actions'

export const TeamCard = (props: any) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const onSubmit = async () => {
    console.log('See members');
  }
  

  return (
    <div className="w-[226px]">
      <Card className="w-full flex flex-col bg-transparent rounded-[12px] overflow-hidden">
        <div className="flex justify-center h-[90px] w-full rounded-[12px] bg-mth-blue-100 relative z-30">
          <Image
            src="/assets/images/team2.svg"
            className="h-[97px] w-[97px] lg:h-[97px] rounded-full border-[3px] border-white absolute top-[50%] z-40"
            width={97}
            height={97}
            alt="author"
            priority
          />
        </div>
        <CardHeader className="relative mt-[40px] p-[16px]">
          <CardTitle className='text-center text-xl font-normal font-poppins'>{props.team.name}</CardTitle>
          <CardDescription className='text-center text-base font-normal font-poppins'>{props.team.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center content-center'>
            <Image
              src="/assets/images/team2.svg"
              className="h-[36px] w-[36px] rounded-full border-[1.6px]"
              width={40}
              height={40}
              alt="team"
              priority
            />
            <Image
              src="/assets/images/team2.svg"
              className="h-[36px] w-[36px] rounded-full border-[1.6px]"
              width={40}
              height={40}
              alt="team"
              priority
            />
            <Image
              src="/assets/images/team2.svg"
              className="h-[36px] w-[36px] rounded-full border-[1.6px]"
              width={40}
              height={40}
              alt="team"
              priority
            />
            <p className='ml-[6px] content-center'>+5</p>
          </div>
          <div className="flex justify-center mt-[10px]">
            <Button
              variant="tertiary"
              type="submit"
              className="basis-[45%] font-light"
              onClick={() => onSubmit()}
            >
              See members
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}