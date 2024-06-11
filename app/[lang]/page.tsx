import { Locale } from '@/config/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const { page, auth } = await getDictionary(lang)

  return (
    <main>
      <div>{page.home.title}</div>
    </main>
  )
}
