import type { Session } from '@supabase/supabase-js'

export const DEMO_USER = 'admin'
export const DEMO_PASSWORD = 'admin'
export const DEMO_SESSION_KEY = 'karly.demo.session'

export function createDemoSession(): Session {
  const now = new Date().toISOString()
  return {
    access_token: 'demo-access-token',
    token_type: 'bearer',
    expires_in: 60 * 60 * 24 * 365,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    refresh_token: 'demo-refresh-token',
    user: {
      id: 'demo-admin',
      aud: 'authenticated',
      role: 'authenticated',
      email: DEMO_USER,
      email_confirmed_at: now,
      phone: '',
      confirmed_at: now,
      last_sign_in_at: now,
      app_metadata: { provider: 'demo', providers: ['demo'] },
      user_metadata: { role: 'admin', full_name: 'Administrador' },
      identities: [],
      created_at: now,
      updated_at: now,
      is_anonymous: false,
    },
  }
}

export function hasDemoSession() {
  return localStorage.getItem(DEMO_SESSION_KEY) === '1'
}
