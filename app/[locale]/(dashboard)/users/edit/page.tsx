'use client'

import DragAndDrop from '@/components/drag-and-drop'
import EditUserForm from '@/components/edit-user-form'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const User = () => {
  return (
    <>
      <Card className="mx-auto w-full border-0 px-0 text-mth-grey-blue-700 shadow-none xl:max-w-[980px]">
        <CardContent className="flex flex-col-reverse items-center justify-center gap-16 max-sm:mx-auto max-sm:px-0 lg:flex-row">
          <div className="mt-20 flex flex-col items-center">
            <div className="mb-10 h-44 w-44">
              <Image
                src="/assets/images/user_placeholder.avif"
                alt="user-placeholder"
                className="h-full w-full rounded-full border shadow-lg"
                width={100}
                height={100}
              />
            </div>
            <DragAndDrop />
          </div>
          <EditUserForm />
        </CardContent>
      </Card>
    </>
  )
}

export default User
