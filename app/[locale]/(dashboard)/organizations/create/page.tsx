import { CreateOrganizationForm } from '@/components/create-organisation'
import Image from 'next/image'

const CreateOrganizationPage = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-1">
      <Image
        src="/assets/images/create-organization.svg"
        className="order-1 h-[400px] w-full self-end lg:order-none lg:h-[360px] lg:max-w-[35%]"
        width={444.24}
        height={404}
        alt="team"
        priority
      />
      <CreateOrganizationForm />
    </div>
  )
}
export default CreateOrganizationPage
