import { useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { AuthContext } from '@/features/auth/auth-context'
import { DEMO_SESSION_KEY, createDemoSession, hasDemoSession } from '@/features/auth/demoSession'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() =>
    hasDemoSession() ? createDemoSession() : null
  )
  const [loading, setLoading] = useState(() => !hasDemoSession())

  useEffect(() => {
    // La sesión de demostración ya se inicializó en el estado
    if (hasDemoSession()) return

    // Obtener sesión actual al montar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Suscribirse a cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (hasDemoSession()) return
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  function signInDemo() {
    localStorage.setItem(DEMO_SESSION_KEY, '1')
    setSession(createDemoSession())
  }

  async function signOut() {
    localStorage.removeItem(DEMO_SESSION_KEY)
    setSession(null)
    await supabase.auth.signOut()
  }

  return (
    <AuthContext value={{ session, user: session?.user ?? null, loading, signInDemo, signOut }}>
      {children}
    </AuthContext>
  )
}
