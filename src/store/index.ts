import { create } from 'zustand'

const useSiderStore = create<{
  collapsed: boolean
  currentMenu: string
  updateCollapsed: () => void
  setCurrentMenu: (menu: string) => void
}>((set) => ({
  collapsed: false,
  currentMenu: '',
  setCurrentMenu: (menu: string) => set(() => ({ currentMenu: menu })),
  updateCollapsed: () =>
    set((state: { collapsed: boolean }) => ({ collapsed: !state.collapsed })),
}))
export default useSiderStore
