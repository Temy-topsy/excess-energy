-- SQL Migration for Sales Leads & Inquiries
-- Run this in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS public.sales_leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    location text,
    service text,
    source text NOT NULL DEFAULT 'quote', -- 'quote' or 'contact'
    message text,
    status text NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'quote_sent', 'won', 'lost'
    deal_value numeric DEFAULT 0,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.sales_leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert leads (from lead forms)
CREATE POLICY "Allow public lead submissions"
ON public.sales_leads FOR INSERT
WITH CHECK (true);

-- Allow service role full access (Next.js server actions & admin portal)
CREATE POLICY "Allow service role full access to sales_leads"
ON public.sales_leads
USING (true)
WITH CHECK (true);

-- Create index for quick status and date lookups
CREATE INDEX IF NOT EXISTS idx_sales_leads_status ON public.sales_leads(status);
CREATE INDEX IF NOT EXISTS idx_sales_leads_created_at ON public.sales_leads(created_at DESC);
