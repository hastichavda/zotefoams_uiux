/**
 * Design system UI primitives.
 * Import shared components from this barrel: `import { Button } from '@/components/ui'`
 */
export { Button } from './Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'

export { IconButton } from './IconButton'
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
} from './IconButton'

export { Input } from './Input'
export type { InputProps, InputSize } from './Input'

export { Textarea } from './Textarea'
export type { TextareaProps } from './Textarea'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'
export type { CardProps, CardVariant, CardPadding } from './Card'

export { Badge } from './Badge'
export type { BadgeProps, BadgeTone, BadgeVariant } from './Badge'

export { Avatar } from './Avatar'
export type { AvatarProps, AvatarSize, AvatarStatus } from './Avatar'

export { Divider } from './Divider'
export type { DividerProps } from './Divider'

export { Panel } from './Panel'
export type { PanelProps, PanelVariant } from './Panel'

export { Text } from './Text'
export type { TextProps, TextVariant, TextTone } from './Text'

export { Spinner } from './Spinner'
export type { SpinnerProps } from './Spinner'

export { EmptyState } from './EmptyState'
export type { EmptyStateProps, EmptyStateSize } from './EmptyState'

export { LoadingState, Skeleton } from './LoadingState'
export type { LoadingStateProps, LoadingVariant } from './LoadingState'

export { ErrorState } from './ErrorState'
export type { ErrorStateProps, ErrorVariant } from './ErrorState'
