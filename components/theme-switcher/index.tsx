'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="inline-block h-4 w-4"></div>

  return (
    <Button onClick={toggleTheme} size="icon" variant="primary-outline">
      {resolvedTheme === 'light' ? (
        <Moon className="h-4 w-4 rotate-0 transition-all dark:-rotate-90" />
      ) : (
        <Sun className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
      )}
    </Button>
  )
}
