import { createStore } from 'zustand'

type ExampleStore = {
  count: number
  increment: () => void
}

export const useExampleStore = createStore<ExampleStore>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}))
