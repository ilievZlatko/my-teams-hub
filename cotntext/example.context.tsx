'use client'

import React, { createContext, useContext } from 'react'

// TODO: This is just an example, please remove later when we have real context files in this folder
// Define the shape of your context value
interface ExampleContextValue {
  message: string
  count: number
  incrementCount: () => void
}

// Create the context
const ExampleContext = createContext<ExampleContextValue | undefined>(undefined)

// Create a custom hook to access the context value
export const useExampleContext = (): ExampleContextValue => {
  const context = useContext(ExampleContext)
  if (!context) {
    throw new Error(
      'useExampleContext must be used within an ExampleContextProvider',
    )
  }
  return context
}

// Create a provider component to wrap your app
export const ExampleContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const incrementCount = () => {
    // Implement your logic to increment the count here
  }

  const contextValue: ExampleContextValue = {
    message: 'Hello from ExampleContext!',
    count: 0,
    incrementCount,
  }

  return (
    <ExampleContext.Provider value={contextValue}>
      {children}
    </ExampleContext.Provider>
  )
}
