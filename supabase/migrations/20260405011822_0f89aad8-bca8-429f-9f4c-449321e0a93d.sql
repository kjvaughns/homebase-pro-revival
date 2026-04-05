
-- Enable RLS on providers
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view public providers" 
  ON providers FOR SELECT 
  USING (is_public = true);

-- Enable RLS on provider_custom_services
ALTER TABLE provider_custom_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published services" 
  ON provider_custom_services FOR SELECT 
  USING (is_published = true);

-- Enable RLS on reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view reviews" 
  ON reviews FOR SELECT 
  USING (true);

-- Enable RLS on service_categories
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view categories" 
  ON service_categories FOR SELECT 
  USING (true);

-- Enable RLS on booking_links for public access to active links
ALTER TABLE booking_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active booking links"
  ON booking_links FOR SELECT
  USING (is_active = true);
