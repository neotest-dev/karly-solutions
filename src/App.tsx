import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { PrivateRoute } from '@/features/auth/PrivateRoute'

// Páginas (carga lazy en siguientes fases)
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Layout principal
import { MainLayout } from '@/layouts/MainLayout'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas privadas: requieren sesión activa */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Catálogos */}
              <Route path="/productos" element={<PlaceholderPage title="Productos" />} />
              <Route path="/categorias" element={<PlaceholderPage title="Categorías" />} />
              <Route path="/marcas" element={<PlaceholderPage title="Marcas" />} />
              <Route path="/unidades" element={<PlaceholderPage title="Unidades de medida" />} />

              {/* Almacenes */}
              <Route path="/almacenes" element={<PlaceholderPage title="Almacenes" />} />

              {/* Movimientos */}
              <Route path="/entradas" element={<PlaceholderPage title="Entradas de mercadería" />} />
              <Route path="/salidas" element={<PlaceholderPage title="Salidas de productos" />} />
              <Route path="/transferencias" element={<PlaceholderPage title="Transferencias" />} />
              <Route path="/ajustes" element={<PlaceholderPage title="Ajustes de inventario" />} />

              {/* Reportes */}
              <Route path="/kardex" element={<PlaceholderPage title="Kardex" />} />
              <Route path="/reportes" element={<PlaceholderPage title="Reportes" />} />

              {/* Administración */}
              <Route path="/usuarios" element={<PlaceholderPage title="Usuarios" />} />
              <Route path="/auditoria" element={<PlaceholderPage title="Auditoría" />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

/** Placeholder temporal mientras se implementan los módulos */
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-muted-foreground">
          Módulo <strong>{title}</strong> — en construcción
        </p>
      </div>
    </div>
  )
}
