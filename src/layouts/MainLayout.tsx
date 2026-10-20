import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  Package,
  Tag,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  SlidersHorizontal,
  BookOpen,
  BarChart3,
  Users,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Layers,
  Ruler,
} from 'lucide-react'
import { useAuth } from '@/features/auth/useAuth'
import { cn } from '@/lib/utils'

// ─── Definición de navegación ─────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  adminOnly?: boolean
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'General',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    title: 'Catálogos',
    items: [
      { label: 'Productos', href: '/productos', icon: <Package size={18} /> },
      { label: 'Categorías', href: '/categorias', icon: <Tag size={18} /> },
      { label: 'Marcas', href: '/marcas', icon: <Layers size={18} /> },
      { label: 'Unidades de medida', href: '/unidades', icon: <Ruler size={18} /> },
      { label: 'Almacenes', href: '/almacenes', icon: <Building2 size={18} />, adminOnly: true },
    ],
  },
  {
    title: 'Movimientos',
    items: [
      { label: 'Entradas', href: '/entradas', icon: <TrendingUp size={18} /> },
      { label: 'Salidas', href: '/salidas', icon: <TrendingDown size={18} /> },
      { label: 'Transferencias', href: '/transferencias', icon: <ArrowLeftRight size={18} /> },
      { label: 'Ajustes', href: '/ajustes', icon: <SlidersHorizontal size={18} /> },
    ],
  },
  {
    title: 'Reportes',
    items: [
      { label: 'Kardex', href: '/kardex', icon: <BookOpen size={18} /> },
      { label: 'Reportes', href: '/reportes', icon: <BarChart3 size={18} /> },
    ],
  },
  {
    title: 'Administración',
    items: [
      { label: 'Usuarios', href: '/usuarios', icon: <Users size={18} />, adminOnly: true },
      { label: 'Auditoría', href: '/auditoria', icon: <ShieldCheck size={18} />, adminOnly: true },
    ],
  },
]

// ─── Componente de ítem de navegación ─────────────────────────────────────────

function SidebarNavItem({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  return (
    <NavLink
      to={item.href}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )
      }
    >
      {item.icon}
      <span>{item.label}</span>
    </NavLink>
  )
}

// ─── Sidebar content ──────────────────────────────────────────────────────────

function SidebarContent({
  userRole,
  onNavClick,
}: {
  userRole: string
  onNavClick?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary shadow-md shadow-black/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-white"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-sidebar-foreground leading-tight">Karly Solutions</p>
          <p className="text-xs text-sidebar-foreground/60 leading-tight">Sistema de Almacenes</p>
        </div>
      </div>

      <div className="mx-3 border-t border-sidebar-border" />

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navegación principal">
        <div className="space-y-5">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.adminOnly || userRole === 'admin'
            )
            if (visibleItems.length === 0) return null

            return (
              <div key={group.title}>
                <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {visibleItems.map((item) => (
                    <SidebarNavItem key={item.href} item={item} onClick={onNavClick} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </nav>

      <div className="mx-3 border-t border-sidebar-border" />

      {/* Pie del sidebar */}
      <div className="p-3 text-xs text-center text-sidebar-foreground/30">
        v0.1.0
      </div>
    </div>
  )
}

// ─── Layout principal ─────────────────────────────────────────────────────────

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Role placeholder hasta que se implemente la tabla profiles
  const userRole = 'admin'
  const userEmail = user?.email ?? 'usuario@karly.com'
  const userInitial = userEmail.charAt(0).toUpperCase()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Sidebar desktop ── */}
      <aside
        className="hidden w-60 shrink-0 bg-[hsl(var(--sidebar-background))] lg:flex lg:flex-col"
        aria-label="Barra lateral de navegación"
      >
        <SidebarContent userRole={userRole} />
      </aside>

      {/* ── Sidebar móvil (overlay) ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <aside className="relative z-50 flex h-full w-60 flex-col bg-[hsl(var(--sidebar-background))] shadow-2xl">
            <button
              type="button"
              id="close-mobile-nav"
              aria-label="Cerrar menú"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
            <SidebarContent
              userRole={userRole}
              onNavClick={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* ── Contenido principal ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 shadow-sm">
          {/* Botón menú móvil */}
          <button
            type="button"
            id="open-mobile-nav"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:block" /> {/* Espacio vacío en desktop */}

          {/* Menú de usuario */}
          <div className="relative">
            <button
              type="button"
              id="user-menu-button"
              aria-label="Menú de usuario"
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
              onClick={() => setUserMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-muted transition-colors"
            >
              {/* Avatar */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {userInitial}
              </div>
              <span className="hidden max-w-32 truncate text-foreground sm:block">
                {userEmail}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  'text-muted-foreground transition-transform duration-200',
                  userMenuOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden="true"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div
                  role="menu"
                  aria-labelledby="user-menu-button"
                  className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-border bg-popover py-1 shadow-lg"
                >
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-xs font-medium text-foreground truncate">{userEmail}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole === 'admin' ? 'Administrador' : 'Encargado'}</p>
                  </div>
                  <button
                    role="menuitem"
                    id="sign-out-button"
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 sm:p-6" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
