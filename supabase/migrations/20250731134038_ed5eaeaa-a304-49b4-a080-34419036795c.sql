-- Insert admin user
INSERT INTO public.admin_users (email, password_hash, role)
VALUES (
  'marcohgc@gmail.com',
  crypt('3Nergee2025#@', gen_salt('bf')),
  'admin'
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = crypt('3Nergee2025#@', gen_salt('bf')),
  updated_at = now();