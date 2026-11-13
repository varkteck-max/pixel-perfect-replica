import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleHelp } from 'lucide-react';
export function Help({ text }: { text: string }) { return <Tooltip><TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" className="h-4 w-4 text-muted-foreground" aria-label={text}><CircleHelp className="size-3.5" /></Button></TooltipTrigger><TooltipContent className="max-w-72 leading-relaxed">{text}</TooltipContent></Tooltip>; }
export function Field({ label, help, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; help?: string }) { return <label className="block"><span className="field-label">{label}{help && <Help text={help} />}</span><input className="field" aria-label={label} {...props} /></label>; }
export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) { return <label className="block"><span className="field-label">{label}</span><select className="field" {...props}>{children}</select></label>; }
