import { SignOutButton } from '@/components/signout-button'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/navigation'
import { auth } from '@/config/auth.config'

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const { page } = await getDictionary(locale)
  const session = await auth()

  console.log('SESSION: ', session)

  return (
    <main>
      <div>
        {page.home.title}
        <SignOutButton />
      </div>
    </main>
  )
}
