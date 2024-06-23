import { IntlClientProvider } from './intl18.provider'
import { OrganisationProvider } from './organisation.provider'
import { ThemeProvider } from './theme.provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IntlClientProvider>
      <ThemeProvider>
        <OrganisationProvider>{children}</OrganisationProvider>
      </ThemeProvider>
    </IntlClientProvider>
  )
}
