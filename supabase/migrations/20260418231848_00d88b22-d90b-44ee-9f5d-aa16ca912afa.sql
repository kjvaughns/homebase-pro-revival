-- Create app_reviews table for users to leave reviews on the HomeBase app itself
CREATE TABLE public.app_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  role text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text NOT NULL,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.app_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit a review
CREATE POLICY "Anyone can submit an app review"
ON public.app_reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can read published reviews (for public display)
CREATE POLICY "Anyone can view published app reviews"
ON public.app_reviews
FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE INDEX idx_app_reviews_created_at ON public.app_reviews(created_at DESC);