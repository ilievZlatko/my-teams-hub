import { IntlClientProvider } from './intl18.provider'
import { ThemeProvider } from './theme.provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IntlClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </IntlClientProvider>
  )
}
