import { Check, Plus, Hospital, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealth } from './context';
import { type Plan, pricePlan, clp, ufFormat, UF_REFERENCE } from '@/lib/health-plans';
export function PlanCard({ plan }: { plan: Plan }) {
 const { quote, selected, toggle, setAdvisorOpen, setInterest } = useHealth(); const pricing = pricePlan(plan, quote); const chosen = selected.includes(plan.id);
 return <article className={`plan-card ${chosen ? 'selected' : ''}`}>
  <div className="px-6 pt-5"><div className="flex justify-between items-center"><span className="plan-heading">{plan.insurer}</span><span className="text-[10px] bg-secondary text-primary px-2 py-1 rounded font-semibold">{plan.type}</span></div><h3 className="text-sm font-semibold mt-2">{plan.name}</h3><p className="text-xs text-muted-foreground mt-1">Plan de ejemplo · {plan.tag}</p>
  <div className="mt-5 flex items-baseline gap-2"><span className="text-3xl font-extrabold">{ufFormat(pricing.cost / UF_REFERENCE)}</span><span className="text-xs text-muted-foreground">UF / mes</span></div><p className="text-sm text-muted-foreground mt-1">{clp(pricing.cost)} estimados · GES incluido</p>
  <div className="grid grid-cols-2 border-y border-border py-4 my-5 gap-3"><div><Stethoscope className="size-4 text-primary mb-2"/><strong className="text-lg">{plan.outpatient}%</strong><p className="text-[11px] text-muted-foreground mt-1">Consultas médicas</p></div><div><Hospital className="size-4 text-primary mb-2"/><strong className="text-lg">{plan.hospital}%</strong><p className="text-[11px] text-muted-foreground mt-1">Hospitalización</p></div></div>
  <p className="text-xs text-muted-foreground">Red referencial</p><p className="text-xs font-medium mt-2 min-h-8">{plan.clinics.join(' · ')}</p>
  <p className={`text-xs font-semibold mt-4 ${pricing.surplus ? 'text-success' : 'text-muted-foreground'}`}>{pricing.surplus ? `${clp(pricing.surplus)} de saldo a favor estimado` : `${clp(pricing.additional)} de adicional estimado`}</p>
  <Button variant="outline" className="w-full mt-5" onClick={() => toggle(plan.id)} disabled={!chosen && selected.length >= 3}>{chosen ? <Check/> : <Plus/>}{chosen ? 'Seleccionado para comparar' : 'Agregar al comparador'}</Button>
  <Button variant="link" className="w-full my-2 text-xs" onClick={() => { setInterest(plan.insurer); setAdvisorOpen(true); }}>Consultar este plan <ArrowRight/></Button></div>
 </article>;
}
