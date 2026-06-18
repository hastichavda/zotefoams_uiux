import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { SidebarContext, type SidebarContextValue } from './sidebar-context'

interface SidebarProviderProps {
  children: ReactNode
  defaultCollapsed?: boolean
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), [])
  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const value = useMemo<SidebarContextValue>(
    () => ({
      collapsed,
      mobileOpen,
      toggleCollapsed,
      setCollapsed,
      openMobile,
      closeMobile,
    }),
    [collapsed, mobileOpen, toggleCollapsed, openMobile, closeMobile],
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
