ALTER TABLE public.record_manager ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ref_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ref_file ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ref_trash ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS service_role_all_record_manager ON public.record_manager;
CREATE POLICY service_role_all_record_manager
ON public.record_manager
USING (true)
WITH CHECK (true);

-- The audited production-derived schema had RLS enabled on the remaining core tables
-- without additional explicit public-schema policies in the supplied dump.
-- Service-role access is expected to be configured through Supabase/n8n credentials.
