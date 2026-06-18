import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Boxes, MessageSquare, Settings, X } from 'lucide-react'
import { AGENTS, PRODUCT_NAME, WORKSPACE_NAME } from '@/constants'
import { RECENT_CONVERSATIONS } from '@/mocks'
import { useSidebar } from '@/context'
import { useMediaQuery } from '@/hooks'
import { transitions } from '@/animations'
import { cn } from '@/utils'
import { IconButton } from '@/components/ui'

/** Shared row styling for navigation entries. */
const rowClass =
  'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-body-sm ' +
  'text-muted-foreground transition-colors duration-[var(--duration-fast)] ' +
  'hover:bg-surface-muted hover:text-foreground ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
  'aria-[current=page]:bg-primary-subtle aria-[current=page]:font-medium aria-[current=page]:text-primary'

/** Labels fade out in the collapsed rail (tablet/desktop only). */
const labelClass =
  'truncate transition-opacity duration-[var(--duration-normal)] md:group-data-[collapsed=true]/sidebar:opacity-0'

export function Sidebar() {
  const { collapsed, mobileOpen, closeMobile } = useSidebar()
  const isMobile = useMediaQuery('(max-width: 767.98px)')
  const navRef = useRef<HTMLElement>(null)

  // Off-canvas drawer is removed from the a11y tree / tab order when closed.
  const drawerHidden = isMobile && !mobileOpen

  useEffect(() => {
    if (!mobileOpen) return
    // Remember the trigger so focus can return to it when the drawer closes.
    const trigger = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobile()
    }
    document.addEventListener('keydown', onKeyDown)
    navRef.current
      ?.querySelector<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])')
      ?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      trigger?.focus?.()
    }
  }, [mobileOpen, closeMobile])

  const drawerAttrs = (drawerHidden
    ? { 'aria-hidden': true, inert: '' }
    : {}) as unknown as HTMLAttributes<HTMLElement>

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.fast}
            onClick={closeMobile}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <nav
        ref={navRef}
        aria-label="Primary"
        data-collapsed={collapsed}
        {...drawerAttrs}
        className={cn(
          'group/sidebar fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-hidden ' +
            'border-r border-border bg-surface ' +
            'transition-[transform,width] duration-[var(--duration-normal)] ease-[var(--ease-standard)] ' +
            'md:static md:z-auto md:translate-x-0',
          mobileOpen
            ? 'translate-x-0 shadow-lg md:shadow-none'
            : '-translate-x-full',
          collapsed ? 'md:w-[4.5rem]' : 'md:w-72',
        )}
      >
        {/* Branding */}
        <div className="flex h-14 shrink-0 items-center gap-2 px-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="size-5" />
          </span>
          <span
            className={cn(
              'text-body font-semibold text-foreground',
              labelClass,
            )}
          >
            {PRODUCT_NAME}
          </span>
          <IconButton
            label="Close navigation"
            icon={<X />}
            variant="ghost"
            size="sm"
            className="ml-auto md:hidden"
            onClick={closeMobile}
          />
        </div>

        {/* Workspace title */}
        <div className="px-3 pb-2">
          <button type="button" className={cn(rowClass, 'text-foreground')}>
            <span className="grid size-6 shrink-0 place-items-center rounded bg-info-subtle text-caption font-semibold text-info">
              {WORKSPACE_NAME.charAt(0)}
            </span>
            <span className={cn('font-medium', labelClass)}>
              {WORKSPACE_NAME}
            </span>
          </button>
        </div>

        {/* Scrollable navigation */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-2">
          <SectionLabel>Agents</SectionLabel>
          <ul className="flex flex-col gap-0.5">
            {AGENTS.map((agent, index) => (
              <li key={agent.id}>
                <button
                  type="button"
                  aria-current={index === 0 ? 'page' : undefined}
                  className={rowClass}
                >
                  <span
                    className={cn(
                      'grid size-6 shrink-0 place-items-center rounded',
                      agent.iconBg,
                      agent.iconFg,
                    )}
                  >
                    <agent.icon className="size-4" />
                  </span>
                  <span className={labelClass}>{agent.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <SectionLabel>Recent</SectionLabel>
          <ul className="flex flex-col gap-0.5">
            {RECENT_CONVERSATIONS.map((conversation) => (
              <li key={conversation.id}>
                <button type="button" className={rowClass}>
                  <MessageSquare className="size-4 shrink-0" />
                  <span className={labelClass}>{conversation.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border p-2">
          <button type="button" className={rowClass}>
            <Settings className="size-4 shrink-0" />
            <span className={labelClass}>Settings</span>
          </button>
        </div>
      </nav>
    </>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className={cn(
        'px-2 pt-3 pb-1 text-caption font-medium tracking-wide text-muted-foreground uppercase',
        labelClass,
      )}
    >
      {children}
    </p>
  )
}
