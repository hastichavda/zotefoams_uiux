import { AnimatePresence, motion } from 'framer-motion'
import { fade, transitions } from '@/animations'
import { useWorkspace } from '../context'
import { ConversationEmptyState } from './ConversationEmptyState'
import { ConversationTimeline } from './ConversationTimeline'
import { StatusAnnouncer } from './StatusAnnouncer'

/** Switches between the empty state (suggestions) and the conversation thread. */
export function ConversationView() {
  const { isEmpty } = useWorkspace()

  return (
    <>
      <StatusAnnouncer />
      <AnimatePresence mode="wait" initial={false}>
        {isEmpty ? (
          <motion.div
            key="empty"
            className="flex min-h-full items-center justify-center"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transitions.fast}
          >
            <ConversationEmptyState />
          </motion.div>
        ) : (
          <motion.div
            key="timeline"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transitions.fast}
          >
            <ConversationTimeline />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
