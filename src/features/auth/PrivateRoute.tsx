import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/features/auth/useAuth'

/**
 * Protege rutas privadas. Si el usuario no está autenticado, redirige al login.
 * Muestra un indicador de carga mientras se resuelve la sesión inicial.
 */
export function PrivateRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
