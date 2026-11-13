import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { CheckCircle2, Headset, LockKeyhole, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, SelectField } from './fields';
import { useHealth } from './context';
import { insurers, leadSchema } from '@/lib/health-plans';
import { submitAdvisory } from '@/lib/leads.functions';
export function AdvisorForm() {
 const { quote, interest } = useHealth(); const submit = useServerFn(submitAdvisory); const [busy, setBusy] = useState(false); const [success, setSuccess] = useState(false); const [error, setError] = useState('');
 if (success) return <div className="py-8 text-center"><CheckCircle2 className="size-14 text-success mx-auto"/><h3 className="text-xl font-bold mt-5">¡Solicitud recibida!</h3><p className="section-caption mt-3">Tu solicitud quedó pendiente de contacto, en el horario elegido.</p><p className="text-xs text-muted-foreground mt-4">Asignación demostrativa: equipo de asesoría ComparaSalud.</p></div>;
 return <form className="grid gap-4" onSubmit={async e => { e.preventDefault(); const f = new FormData(e.currentTarget); const result = leadSchema.safeParse({ name: f.get('name'), email: f.get('email'), phone: f.get('phone'), current_isapre: f.get('current'), contact_time: f.get('time'), income: quote.income, interested_isapre: interest, consent: f.get('consent') === 'on' }); if (!result.success) { setError(result.error.issues[0]?.message || 'Revisa los datos'); return; } setBusy(true); setError(''); try { await submit({ data: result.data }); setSuccess(true); } catch { setError('No pudimos guardar tu solicitud. Intenta nuevamente.'); } finally { setBusy(false); } }}>
  <Field label="Nombre completo" name="name" placeholder="Tu nombre y apellido" required maxLength={100}/><div className="grid sm:grid-cols-2 gap-4"><Field label="Teléfono" name="phone" type="tel" placeholder="+56 9 1234 5678" required maxLength={20}/><Field label="Correo electrónico" name="email" type="email" placeholder="nombre@correo.cl" required maxLength={255}/></div>
  <div className="grid sm:grid-cols-2 gap-4"><SelectField label="Isapre actual" name="current" defaultValue={quote.current}><option>No tengo Isapre</option>{insurers.map(i => <option key={i}>{i}</option>)}<option>Fonasa</option></SelectField><SelectField label="Horario de contacto" name="time"><option>Mañana (09:00–12:00)</option><option>Tarde (12:00–18:00)</option><option>Después de las 18:00</option></SelectField></div>
  <label className="flex gap-2 text-xs text-muted-foreground leading-relaxed"><input type="checkbox" name="consent" required className="accent-primary mt-1"/>Autorizo a ComparaSalud a contactarme para asesoría sobre planes de salud.</label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button variant="success" className="h-11" disabled={busy}>{busy ? <Loader2 className="animate-spin"/> : <Headset/>}{busy ? 'Guardando solicitud…' : 'Solicitar asesoría gratuita'}</Button><p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><LockKeyhole className="size-3"/>Tus datos se guardan de forma privada.</p>
 </form>;
}
export function AdvisorDialog() { const { advisorOpen, setAdvisorOpen } = useHealth(); return <Dialog open={advisorOpen} onOpenChange={setAdvisorOpen}><DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl"><DialogTitle>Hablemos de tu salud</DialogTitle><DialogDescription>Déjanos tus datos y un asesor podrá ayudarte a evaluar tus opciones.</DialogDescription><AdvisorForm/></DialogContent></Dialog>; }
