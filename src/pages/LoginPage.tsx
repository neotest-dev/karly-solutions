import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/useAuth'
import { DEMO_USER, DEMO_PASSWORD } from '@/features/auth/demoSession'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Ingresa tu usuario o correo'),
  password: z.string().min(1, 'Ingresa tu contraseña'),
}).refine(
  (data) => data.identifier === DEMO_USER || z.string().email().safeParse(data.identifier).success,
  { message: 'Ingresa un usuario o correo electrónico válido', path: ['identifier'] }
)

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const { signInDemo } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: DEMO_USER, password: DEMO_PASSWORD },
  })

  async function onSubmit(data: LoginFormData) {
    setServerError(null)

    // Acceso de demostración local (no requiere Supabase)
    if (data.identifier === DEMO_USER && data.password === DEMO_PASSWORD) {
      signInDemo()
      navigate('/dashboard', { replace: true })
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.identifier,
      password: data.password,
    })

    if (error) {
      setServerError('Usuario o contraseña incorrectos. Por favor verifica tus credenciales.')
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo y nombre */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary-foreground"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Karly Solutions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sistema de Almacenes</p>
        </div>

        <Card className="shadow-xl shadow-black/5">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
            <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
              Acceso demo: usuario <strong>admin</strong> · contraseña <strong>admin</strong>
            </p>
          </CardHeader>

          <form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardContent className="space-y-4">
              {/* Error del servidor */}
              {serverError && (
                <div
                  role="alert"
                  className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
                >
                  {serverError}
                </div>
              )}

              {/* Campo usuario / correo */}
              <div className="space-y-1.5">
                <Label htmlFor="login-identifier">Usuario o correo electrónico</Label>
                <Input
                  id="login-identifier"
                  type="text"
                  placeholder="admin"
                  autoComplete="username"
                  autoCapitalize="none"
                  aria-invalid={!!errors.identifier}
                  aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                  {...register('identifier')}
                />
                {errors.identifier && (
                  <p id="identifier-error" className="text-xs text-destructive">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              {/* Campo contraseña */}
              <div className="space-y-1.5">
                <Label htmlFor="login-password">Contraseña</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password')}
                />
                {errors.password && (
                  <p id="password-error" className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                id="login-submit"
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" aria-hidden="true" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Karly Solutions. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
