-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin users
CREATE POLICY "Admin users can view their own data" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() = id);

-- Create content management tables
CREATE TABLE public.content_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  images JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for content sections
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;

-- Create policy for content sections (public read, admin write)
CREATE POLICY "Content sections are publicly readable" 
ON public.content_sections 
FOR SELECT 
USING (true);

-- Create form submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  estado TEXT NOT NULL,
  consumption TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for form submissions
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for form submissions (public insert, admin read)
CREATE POLICY "Anyone can submit forms" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can view all submissions" 
ON public.form_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create plans table
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  percentage INTEGER NOT NULL,
  consumption_range TEXT,
  estimated_savings TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  button_text TEXT DEFAULT 'Contratar Plano',
  button_variant TEXT DEFAULT 'outline',
  popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for plans
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Create policies for plans
CREATE POLICY "Plans are publicly readable" 
ON public.plans 
FOR SELECT 
USING (active = true);

-- Create FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for FAQs
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for FAQs
CREATE POLICY "FAQs are publicly readable" 
ON public.faqs 
FOR SELECT 
USING (active = true);

-- Create analytics table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for analytics
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy for analytics (public insert, admin read)
CREATE POLICY "Anyone can create analytics events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

-- Create settings table for Mautic integration and other configs
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for settings
CREATE POLICY "Settings are publicly readable" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_sections_updated_at
  BEFORE UPDATE ON public.content_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial content sections
INSERT INTO public.content_sections (section_key, title, description, content) VALUES
('header', 'Header', 'Header configuration', '{"associationText": "Associação", "ctaText": "Quero Participar"}'),
('hero', 'Hero Section', 'Main hero section', '{"title": "Energia Solar por Assinatura", "subtitle": "Unindo famílias, Geradores e Consumidores Brasileiros", "description": "A energia vem de investimentos de famílias brasileiras, não de grandes corporações"}'),
('how_it_works', 'Como Funciona', 'How it works section', '{"title": "Como Funciona a Energia Compartilhada?", "subtitle": "É simples, rápido e sem complicação. Em apenas 3 passos você já está economizando com energia solar compartilhada."}'),
('benefits', 'Benefícios', 'Benefits section', '{"title": "Por que escolher a Energee?", "subtitle": "Vantagens exclusivas para você economizar com energia limpa"}'),
('testimonials', 'Depoimentos', 'Testimonials section', '{"title": "O que nossos clientes dizem", "stats": {"active_clients": "2.500+", "monthly_savings": "R$ 875.000", "average_rating": "4.9", "recommendation": "98%"}}'),
('faq', 'FAQ', 'Frequently asked questions', '{"title": "Perguntas Frequentes", "subtitle": "Tire todas as suas dúvidas sobre energia compartilhada"}');

-- Insert initial plans
INSERT INTO public.plans (name, subtitle, percentage, consumption_range, estimated_savings, features, button_variant, popular, display_order) VALUES
('Econômico', 'Mesma titularidade', 10, '100-250 kWh', 'R$ 30-75', '["Mesma titularidade", "Suporte por e-mail"]', 'outline', false, 1),
('Eficiente', 'Titularidade Associação', 15, '250-500 kWh', 'R$ 125-250', '["Titularidade Associação", "Desconto de até 15%", "Suporte prioritário", "Inclui bandeira tarifária"]', 'cta', true, 2),
('Máximo', 'Titularidade Associação', 20, '500+ kWh', 'R$ 375+', '["Titularidade Associação", "Desconto de até 20%", "2 faturas por ano grátis", "Suporte prioritário", "Inclui bandeira tarifária"]', 'hero', false, 3);

-- Insert initial settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('mautic_api_url', '', 'text', 'Mautic API URL for form integration'),
('mautic_api_token', '', 'password', 'Mautic API access token'),
('strategic_phrase', 'Energia Solar por Assinatura', 'text', 'Strategic phrase shown throughout the site'),
('differential_phrase', 'A energia vem de investimentos de famílias brasileiras, não de grandes corporações', 'text', 'Main differential phrase'),
('union_phrase', 'Unindo famílias, Geradores e Consumidores Brasileiros', 'text', 'Union phrase'),
('company_cnpj', '61.015.824/0001-20', 'text', 'Company CNPJ'),
('developer_credit', 'Pedro Rago', 'text', 'Developer credit');

-- Insert initial FAQs
INSERT INTO public.faqs (question, answer, display_order) VALUES
('O que é energia solar compartilhada?', 'É um modelo onde você pode acessar energia solar sem precisar instalar painéis no seu telhado. Você participa de uma usina solar remota e recebe os créditos de energia na sua conta de luz.', 1),
('Como funciona o desconto na minha conta?', 'Os créditos de energia solar são injetados diretamente na rede elétrica e aparecem como desconto na sua conta de luz, reduzindo o valor total a pagar.', 2),
('Preciso fazer alguma obra ou instalação?', 'Não! Todo o processo é 100% digital. Não há necessidade de obras, instalações ou modificações na sua residência.', 3),
('Qual é o prazo para começar a economizar?', 'Após a contratação e assinatura do termo de adesão, você começará a receber os créditos em até 30 dias.', 4),
('Posso cancelar a qualquer momento?', 'Sim, não há fidelidade. Você pode cancelar a qualquer momento sem taxa de cancelamento.', 5);