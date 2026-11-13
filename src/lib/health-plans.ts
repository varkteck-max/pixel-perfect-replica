import { z } from 'zod';
export const UF_REFERENCE = 40000;
export const quoteSchema = z.object({ income: z.coerce.number().min(100000).max(50000000), age: z.coerce.number().int().min(18).max(100), dependents: z.coerce.number().int().min(0).max(10), current: z.string().max(60), region: z.string().max(60), clinic: z.string().max(100), type: z.string().max(50), catastrophic: z.boolean() });
export type Quote = z.infer<typeof quoteSchema>;
export const defaultQuote: Quote = { income: 1500000, age: 30, dependents: 0, current: 'No tengo Isapre', region: 'Metropolitana', clinic: 'Sin preferencia', type: 'Todos', catastrophic: true };
export const insurers = ['Colmena', 'Banmédica', 'Consorcio', 'Nueva Masvida', 'Cruz Blanca', 'Vida Tres'];
export const plans = [
 { id: 'colmena', insurer: 'Colmena', name: 'Integral Preferente', base: 2.05, ges: .5, outpatient: 80, hospital: 90, clinics: ['Clínica Santa María', 'Clínica Dávila'], type: 'Preferente', cap: 600, outpatientCap: 8, catastrophic: true, tag: 'Equilibrio precio y cobertura' },
 { id: 'banmedica', insurer: 'Banmédica', name: 'Salud Superior', base: 2.4, ges: .55, outpatient: 80, hospital: 100, clinics: ['Clínica Santa María', 'Clínica Dávila', 'Clínica Vespucio'], type: 'Preferente', cap: 800, outpatientCap: 10, catastrophic: true, tag: 'Mayor cobertura hospitalaria' },
 { id: 'consorcio', insurer: 'Consorcio', name: 'Esencial Libre', base: 1.75, ges: .45, outpatient: 70, hospital: 90, clinics: ['Red nacional', 'Clínica Dávila'], type: 'Libre elección', cap: 500, outpatientCap: 6, catastrophic: true, tag: 'Menor costo referencial' },
 { id: 'masvida', insurer: 'Nueva Masvida', name: 'Vida Regional', base: 1.85, ges: .48, outpatient: 75, hospital: 90, clinics: ['Red nacional', 'Clínica Vespucio'], type: 'Preferente', cap: 600, outpatientCap: 7, catastrophic: true, tag: 'Red en regiones' },
 { id: 'cruzblanca', insurer: 'Cruz Blanca', name: 'Red Protegida', base: 1.8, ges: .52, outpatient: 80, hospital: 90, clinics: ['Clínica Dávila', 'Clínica Vespucio'], type: 'Cerrado', cap: 600, outpatientCap: 7, catastrophic: true, tag: 'Atención en red cerrada' },
 { id: 'vidatres', insurer: 'Vida Tres', name: 'Preferente Premium', base: 3.1, ges: .6, outpatient: 90, hospital: 100, clinics: ['Clínica Alemana', 'Clínica Santa María'], type: 'Libre elección', cap: 1000, outpatientCap: 12, catastrophic: true, tag: 'Cobertura premium' },
];
export type Plan = typeof plans[number];
export function calculateBalance(contribution: number, planUF: number, gesUF: number, people: number, uf: number) {
 const cost = Math.round((planUF + gesUF * people) * uf);
 const balance = Math.round(contribution - cost);
 return { cost, surplus: Math.max(0, balance), additional: Math.max(0, -balance) };
}
export function legalContribution(income: number) { return Math.round(income * .07); }
// Deliberately illustrative, not the official unified factor table.
export function estimatedFactor(age: number, dependents: number) { return (age < 35 ? 1 : age < 55 ? 1.2 : 1.6) + dependents * .6; }
export function pricePlan(plan: Plan, quote: Quote, uf = UF_REFERENCE) { return calculateBalance(legalContribution(quote.income), plan.base * estimatedFactor(quote.age, quote.dependents), plan.ges, quote.dependents + 1, uf); }
export const clp = (value: number) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
export const ufFormat = (value: number) => new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
export const leadSchema = z.object({ name: z.string().trim().min(2, 'Ingresa tu nombre completo').max(100), phone: z.string().trim().regex(/^\+?[0-9\s()-]{8,20}$/, 'Ingresa un teléfono válido'), email: z.string().trim().email('Ingresa un correo válido').max(255), current_isapre: z.string().max(60), contact_time: z.string().min(1).max(60), income: z.number().min(0).max(50000000), interested_isapre: z.string().max(60), consent: z.literal(true, { errorMap: () => ({ message: 'Debes autorizar el contacto' }) }) });
export function canSelectPlan(selected: string[], id: string) { return selected.includes(id) || selected.length < 3; }
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} | ComparaSalud` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | ComparaSalud` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }
