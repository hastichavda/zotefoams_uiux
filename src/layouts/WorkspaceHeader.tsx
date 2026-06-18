import { AnimatePresence, motion } from 'framer-motion'
import { Menu, PanelLeft, Plus, RotateCcw, Square } from 'lucide-react'
import { WORKSPACE_NAME } from '@/constants'
import { useSidebar } from '@/context'
import { useWorkspace } from '@/features/workspace'
import { transitions } from '@/animations'
import { Badge, Button, IconButton } from '@/components/ui'

const controlMotion = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.85 },
  transition: transitions.fast,
}

export function WorkspaceHeader() {
  const { openMobile, toggleCollapsed, collapsed } = useSidebar()
  const { newSession, stop, retry, isProcessing, canRetry } = useWorkspace()

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-surface px-3 sm:px-4">
      <IconButton
        label="Open navigation"
        icon={<Menu />}
        variant="ghost"
        className="md:hidden"
        onClick={openMobile}
      />
      <IconButton
        label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        icon={<PanelLeft />}
        variant="ghost"
        className="hidden md:inline-flex"
        onClick={toggleCollapsed}
      />

      <div className="flex min-w-0 items-center gap-2">
        <h1 className="truncate text-body-sm font-semibold text-foreground">
          {WORKSPACE_NAME}
        </h1>
        <Badge
          tone={isProcessing ? 'info' : 'success'}
          variant="subtle"
          className="hidden sm:inline-flex"
        >
          <span
            className={
              isProcessing
                ? 'size-1.5 animate-pulse rounded-full bg-info'
                : 'size-1.5 rounded-full bg-success'
            }
            aria-hidden
          />
          {isProcessing ? 'Generating' : 'Ready'}
        </Badge>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <AnimatePresence mode="wait" initial={false}>
          {isProcessing ? (
            <motion.div key="stop" {...controlMotion}>
              <IconButton
                label="Stop generating"
                icon={<Square />}
                variant="ghost"
                onClick={stop}
              />
            </motion.div>
          ) : canRetry ? (
            <motion.div key="retry" {...controlMotion}>
              <IconButton
                label="Retry conversation"
                icon={<RotateCcw />}
                variant="ghost"
                onClick={retry}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<Plus />}
          className="hidden sm:inline-flex"
          onClick={newSession}
        >
          New session
        </Button>
        <IconButton
          label="New session"
          icon={<Plus />}
          variant="ghost"
          className="sm:hidden"
          onClick={newSession}
        />
      </div>
    </header>
  )
}
