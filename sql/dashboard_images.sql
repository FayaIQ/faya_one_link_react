-- Table to store images uploaded through the dashboard
CREATE TABLE public.dashboard_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name text NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
