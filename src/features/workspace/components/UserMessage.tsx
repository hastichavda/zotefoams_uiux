import { memo, useId } from 'react'
import { User } from 'lucide-react'
import { Avatar } from '@/components/ui'
import type { UserMessageModel } from '../types'

interface UserMessageProps {
  message: UserMessageModel
}

export const UserMessage = memo(function UserMessage({
  message,
}: UserMessageProps) {
  const headingId = useId()
  return (
    <article aria-labelledby={headingId} className="flex justify-end">
      <div className="flex max-w-[85%] items-start gap-3">
        <div className="rounded-lg rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground">
          <h2 id={headingId} className="sr-only">
            Your message
          </h2>
          <p className="text-body-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <Avatar
          icon={<User />}
          size="sm"
          className="bg-primary text-primary-foreground"
        />
      </div>
    </article>
  )
})
