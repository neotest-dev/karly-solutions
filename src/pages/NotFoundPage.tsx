import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center">
      <div className="text-8xl font-bold text-primary/20">404</div>
      <h1 className="text-2xl font-bold text-foreground">Página no encontrada</h1>
      <p className="text-muted-foreground">
        La página que buscas no existe o fue movida.
      </p>
      <Button asChild>
        <Link to="/dashboard">Volver al inicio</Link>
      </Button>
    </div>
  )
}
