import { createContext, useContext } from 'react'

/**
 * Layout-only UI state for the application shell. This is presentation state
 * (sidebar collapse + mobile drawer), intentionally separate from any future
 * business/AI state.
 */
export interface SidebarContextValue {
  /** Rail (icon-only) mode on tablet/desktop. */
  collapsed: boolean
  /** Off-canvas drawer open state on mobile. */
  mobileOpen: boolean
  toggleCollapsed: () => void
  setCollapsed: (value: boolean) => void
  openMobile: () => void
  closeMobile: () => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return ctx
}
