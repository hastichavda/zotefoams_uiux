import { useCallback, useEffect, type KeyboardEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import { IconButton, Textarea } from '@/components/ui'
import { useWorkspace } from '../context'

/** Max composer height before it scrolls (matches `max-h-40` = 10rem). */
const MAX_HEIGHT = 160

/**
 * Controlled prompt composer. Submits on click or Enter (Shift+Enter inserts a
 * newline), auto-grows with content, and disables input while the agents are
 * responding.
 */
export function WorkspaceComposer() {
  const { composerValue, setComposerValue, composerRef, submit, isProcessing } =
    useWorkspace()

  const canSend = composerValue.trim().length > 0 && !isProcessing

  // Grow the textarea to fit content (transform/opacity-free; sets height only
  // in response to input, so no per-frame layout thrash).
  const resize = useCallback(() => {
    const el = composerRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`
  }, [composerRef])

  useEffect(() => {
    resize()
  }, [composerValue, resize])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (canSend) submit()
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <div className="flex items-end gap-2">
        <Textarea
          ref={composerRef}
          rows={1}
          value={composerValue}
          onChange={(event) => setComposerValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          aria-label="Message the agents"
          aria-keyshortcuts="Enter"
          placeholder={
            isProcessing ? 'Agents are responding…' : 'Message the agents…'
          }
          resizable={false}
          className="max-h-40 min-h-11 flex-1"
        />
        <IconButton
          label="Send message"
          icon={<ArrowUp />}
          variant="primary"
          onClick={() => submit()}
          disabled={!canSend}
          className="size-11 sm:size-10"
        />
      </div>
      <p className="mt-2 hidden px-1 text-caption text-muted-foreground sm:block">
        <kbd className="font-sans font-medium text-foreground">Enter</kbd> to
        send ·{' '}
        <kbd className="font-sans font-medium text-foreground">Shift</kbd>+
        <kbd className="font-sans font-medium text-foreground">Enter</kbd> for a
        new line
      </p>
    </div>
  )
}
