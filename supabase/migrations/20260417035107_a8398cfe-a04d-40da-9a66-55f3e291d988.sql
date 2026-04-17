ALTER TABLE public.booking_requests
  ADD COLUMN IF NOT EXISTS appointment_id character varying;

CREATE INDEX IF NOT EXISTS idx_booking_requests_appointment_id
  ON public.booking_requests(appointment_id);

CREATE INDEX IF NOT EXISTS idx_booking_requests_provider_id
  ON public.booking_requests(provider_id);