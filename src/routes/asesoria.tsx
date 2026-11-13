import { createFileRoute } from '@tanstack/react-router';
import { AdvisorForm } from '@/components/health/advisor';
import { pageHead } from '@/lib/health-plans';
export const Route = createFileRoute('/asesoria')({ head: () => pageHead('Asesoría personalizada', 'Solicita una asesoría personalizada para evaluar tu plan de salud en Chile.'), component: Asesoria });
function Asesoria() { return <main className="page-width subpage"><div className="max-w-xl mx-auto"><span className="eyebrow text-success">Estamos para acompañarte</span><h1 className="section-title mt-3">Hablemos de tu salud.</h1><p className="section-caption mt-3 mb-8">Solicita contacto en el horario que prefieras, sin costo ni compromiso.</p><div className="tool-panel"><AdvisorForm/></div></div></main>; }
