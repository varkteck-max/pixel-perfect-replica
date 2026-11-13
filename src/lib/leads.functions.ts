import { createServerFn } from '@tanstack/react-start';
import { leadSchema } from './health-plans';
export const submitAdvisory = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => leadSchema.parse(input))
 .handler(async ({ data }) => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: row, error } = await supabaseAdmin.from('advisory_requests').insert(data).select('id').single();
  if (error || !row) throw new Error('No pudimos guardar la solicitud. Intenta nuevamente.');
  return { id: row.id };
 });
