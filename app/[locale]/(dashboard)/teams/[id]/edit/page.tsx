'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { EditTeamForm } from '@/components/edit-team-form'

import { getAllUsers } from '@/actions/user.actions'
import { Loader } from '@/components/loader'
import { getTeam } from '@/actions/team.actions'

export default function Edit({ params: { id } }: { params: { id: string } }) {
  const router = useRouter()

  const { data: session } = useSession()
  const t = useTranslations('apierrors')

  const [otherUsers, setOtherUsers] = useState<IUser[]>([])
  const [team, setTeam] = useState<Team | undefined>(undefined)
  const [isFetchingTeam, setIsFetchingTeam] = useState(true)
  const [isFetchingOtherUsers, setIsFetchingOtherUsers] = useState(true)

  const organizationId = session?.user?.activeOrg

  useEffect(() => {
    setIsFetchingOtherUsers(true)

    getAllUsers()
      .then((users) => {
        if (Array.isArray(users)) {
          setOtherUsers(users)
        } else {
          setOtherUsers([])
        }
      })
      .finally(() => setIsFetchingOtherUsers(false))
  }, [])

  useEffect(() => {
    if (!organizationId) return

    setIsFetchingTeam(true)

    getTeam(organizationId, id)
      .then((response) => {
        if (response && Object.keys(response).find((t) => t === 'teamId')) {
          setTeam(response as Team)
        } else {
          setTeam(undefined)
        }
      })
      .finally(() => setIsFetchingTeam(false))
  }, [organizationId])

  if (!isFetchingTeam && !team) {
    toast.error(t('error_occurred_msg'))

    setTimeout(() => {
      return router.back()
    }, 3000)
  }

  return isFetchingOtherUsers || isFetchingTeam ? (
    <Loader size={44} className="m-auto flex h-[50vh] items-center" />
  ) : (
    team && organizationId && (
      <EditTeamForm
        organizationId={organizationId}
        team={team}
        users={otherUsers}
      />
    )
  )
}
