import { AppShell } from '@/layouts'
import { AppProviders } from './AppProviders'

export function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  )
}
