/**
 * Tipos de la base de datos de Supabase.
 * Este archivo se actualizará cuando el esquema de PostgreSQL esté creado
 * usando el comando: npx supabase gen types typescript --project-id <id> > src/types/database.ts
 *
 * Por ahora contiene la estructura placeholder para que el cliente Supabase sea válido.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'warehouse_clerk'

export type MovementType = 'entry' | 'exit' | 'transfer' | 'adjustment'

export type MovementStatus = 'draft' | 'confirmed' | 'cancelled'

// ─── Tipo placeholder — se reemplazará con tipos generados por Supabase CLI ──

export interface Database {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: UserRole
      movement_type: MovementType
      movement_status: MovementStatus
    }
    CompositeTypes: Record<string, never>
  }
}
