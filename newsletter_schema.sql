-- SQL to run in Supabase SQL Editor for Newsletter Subscribers

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL UNIQUE,
    status text NOT NULL DEFAULT 'active',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public to subscribe (INSERT only)
CREATE POLICY "Allow public newsletter subscription"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Allow service role full access (Next.js server actions)
CREATE POLICY "Allow service role full access to newsletter"
ON public.newsletter_subscribers
USING (true)
WITH CHECK (true);
