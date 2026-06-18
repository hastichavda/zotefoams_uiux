import { SidebarProvider } from '@/context'
import { WorkspaceProvider } from '@/features/workspace'
import { Sidebar } from './Sidebar'
import { Workspace } from './Workspace'

/**
 * Top-level application shell. Composes the persistent sidebar with the
 * workspace column. Single-page — no routing.
 */
export function AppShell() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh bg-background text-foreground">
        <Sidebar />
        <WorkspaceProvider>
          <Workspace />
        </WorkspaceProvider>
      </div>
    </SidebarProvider>
  )
}
