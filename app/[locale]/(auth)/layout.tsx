import Image from 'next/image'
import { Locale, locales } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { SelectLocale } from '@/components/select-locale'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  unstable_setRequestLocale(params.locale)

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tr from-[#CFDDE1] from-0% via-[#FDFDFF] via-50% to-[#EFF4F5] to-80% bg-no-repeat py-0 lg:px-6">
      <div className="m-4 flex h-auto justify-end text-black">
        <SelectLocale className="bg-transparent text-black" variant="black" />
      </div>
      <div className="flex flex-col justify-center lg:flex-row lg:gap-20">
        <aside className="flex flex-col justify-end gap-6 lg:w-5/12 lg:gap-[32vh] xl:gap-[25vh]">
          <Image
            src="/assets/images/title-logo.svg"
            className="mx-auto flex w-full max-w-[567px] justify-center max-md:max-w-[450px] max-sm:w-11/12"
            alt="MyTeamsHub logo"
            width={100}
            height={100}
            priority
          />
          <Image
            src="/assets/images/team.svg"
            className="hidden lg:flex lg:justify-end"
            alt="team"
            width={800}
            height={600}
            priority
          />
        </aside>
        <main className="flex justify-center pb-6 lg:my-auto">{children}</main>
      </div>
    </div>
  )
}
