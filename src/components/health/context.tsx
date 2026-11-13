import { createContext, useContext, useState, type ReactNode } from 'react';
import { defaultQuote, type Quote, canSelectPlan } from '@/lib/health-plans';
const HealthContext = createContext<{ quote: Quote; setQuote: (q: Quote) => void; selected: string[]; toggle: (id: string) => void; advisorOpen: boolean; setAdvisorOpen: (v: boolean) => void; interest: string; setInterest: (v: string) => void } | null>(null);
export function HealthProvider({ children }: { children: ReactNode }) {
 const [quote, setQuote] = useState(defaultQuote); const [selected, setSelected] = useState<string[]>([]); const [advisorOpen, setAdvisorOpen] = useState(false); const [interest, setInterest] = useState('');
 const toggle = (id: string) => setSelected(s => !canSelectPlan(s, id) ? s : s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
 return <HealthContext.Provider value={{ quote, setQuote, selected, toggle, advisorOpen, setAdvisorOpen, interest, setInterest }}>{children}</HealthContext.Provider>;
}
export function useHealth() { const value = useContext(HealthContext); if (!value) throw new Error('HealthProvider required'); return value; }
