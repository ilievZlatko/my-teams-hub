import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/navigation'

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const { page, auth } = await getDictionary(locale)

  return (
    <main>
      <div>{page.home.title}</div>
    </main>
  )
}
