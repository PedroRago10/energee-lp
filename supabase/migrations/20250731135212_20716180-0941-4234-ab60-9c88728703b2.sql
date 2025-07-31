-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Recreate the function with proper extension
CREATE OR REPLACE FUNCTION public.verify_admin_login(input_email text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user exists and password matches
  RETURN EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE email = input_email 
    AND password_hash = crypt(input_password, password_hash)
  );
END;
$$;