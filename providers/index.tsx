import { SessionProvider } from 'next-auth/react'
import { OrganisationProvider } from './organisation.provider'
import { ThemeProvider } from './theme.provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <OrganisationProvider>{children}</OrganisationProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
