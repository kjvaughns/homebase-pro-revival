-- Allow reading providers that have an active booking link, even if is_public = false
CREATE POLICY "Public can view providers with active booking links"
ON public.providers
FOR SELECT
TO public
USING (
  id IN (
    SELECT provider_id FROM public.booking_links WHERE is_active = true
  )
);