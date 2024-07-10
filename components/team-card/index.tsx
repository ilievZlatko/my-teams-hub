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
    console.log('See members')
  }

  return (
    <div className="w-[226px]">
      <Card className="flex w-full flex-col overflow-hidden rounded-[12px] bg-transparent">
        <div className="relative z-30 flex h-[90px] w-full justify-center rounded-[12px] bg-mth-blue-100">
          <Image
            src="/assets/images/team2.svg"
            className="absolute top-[50%] z-40 h-[97px] w-[97px] rounded-full border-[3px] border-white lg:h-[97px]"
            width={97}
            height={97}
            alt="author"
            priority
          />
        </div>
        <CardHeader className="relative mt-[40px] p-[16px]">
          <CardTitle className="text-center font-poppins text-xl font-normal">
            {props.team.name}
          </CardTitle>
          <CardDescription className="text-center font-poppins text-base font-normal">
            {props.team.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex content-center justify-center">
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
            <p className="ml-[6px] content-center">+5</p>
          </div>
          <div className="mt-[10px] flex justify-center">
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
