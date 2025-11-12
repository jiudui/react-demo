import { create } from 'zustand'

const useSiderStore = create<{
  collapsed: boolean
  toggleCollapsed: () => void
}>((set) => ({
  collapsed: false,
  toggleCollapsed: () =>
    set((state: { collapsed: boolean }) => ({ collapsed: !state.collapsed })),
}))
export default useSiderStore
