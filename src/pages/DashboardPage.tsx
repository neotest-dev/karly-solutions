export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen general del sistema de almacenes
        </p>
      </div>

      {/* Tarjetas de estadísticas placeholder */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Productos', value: '—', icon: '📦' },
          { label: 'Almacenes Activos', value: '—', icon: '🏭' },
          { label: 'Movimientos Hoy', value: '—', icon: '📋' },
          { label: 'Alertas de Stock', value: '—', icon: '⚠️' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <span className="text-xl" aria-hidden="true">{stat.icon}</span>
            </div>
            <div className="mt-3 text-3xl font-bold text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-muted-foreground">
          El dashboard se completará en la <strong>Fase 2</strong> con datos reales del inventario.
        </p>
      </div>
    </div>
  )
}
