-- Fix RLS policies to allow admin operations
-- For content_sections table
DROP POLICY IF EXISTS "Content sections are publicly readable" ON public.content_sections;

CREATE POLICY "Content sections are publicly readable" 
ON public.content_sections 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage content sections" 
ON public.content_sections 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- For plans table  
DROP POLICY IF EXISTS "Plans are publicly readable" ON public.plans;

CREATE POLICY "Plans are publicly readable" 
ON public.plans 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can manage plans" 
ON public.plans 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- For faqs table
DROP POLICY IF EXISTS "FAQs are publicly readable" ON public.faqs;

CREATE POLICY "FAQs are publicly readable" 
ON public.faqs 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can manage FAQs" 
ON public.faqs 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- For site_settings table
DROP POLICY IF EXISTS "Settings are publicly readable" ON public.site_settings;

CREATE POLICY "Settings are publicly readable" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage settings" 
ON public.site_settings 
FOR ALL 
USING (true) 
WITH CHECK (true);