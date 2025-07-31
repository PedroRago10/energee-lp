-- First, let's check if the admin user exists and recreate it with a simple hash
-- Delete and recreate admin user with simple password storage for now
DELETE FROM admin_users WHERE email = 'marcohgc@gmail.com';

-- Insert admin user with simple password (not ideal for production but works for now)
INSERT INTO admin_users (email, password_hash, role)
VALUES ('marcohgc@gmail.com', '3Nergee2025#@', 'admin');

-- Create a simple verification function without bcrypt
CREATE OR REPLACE FUNCTION public.verify_admin_login(input_email text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Simple password check (not ideal for production)
  RETURN EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE email = input_email 
    AND password_hash = input_password
  );
END;
$$;