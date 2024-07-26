import { CreateOrganizationForm } from '@/components/create-organization-form'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const CreateOrganizationPage = () => {
  return (
    <div className="flex w-full flex-col lg:max-w-[1180px] lg:flex-row lg:gap-5">
      <Image
        src="/assets/images/create-organization.svg"
        className="order-1 h-[400px] w-full self-end lg:order-none lg:h-[360px] lg:max-w-[45%]"
        width={444.24}
        height={404}
        alt="team"
        priority
      />
      <Card className="flex basis-[60%] flex-col border-0 bg-transparent shadow-none lg:pt-10">
        <CardHeader className="relative mx-auto mb-2 w-fit lg:mb-10">
          <h1 className="font-roboto text-[32px] font-normal leading-[38.4px]">
            Add New Organization
          </h1>
          <span className="relative bottom-0 left-[50%] h-[2px] w-[120%] translate-x-[-50%] rounded bg-border"></span>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm isPage={true} />
        </CardContent>
      </Card>
    </div>
  )
}
export default CreateOrganizationPage
