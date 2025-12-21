-- Create table for maintenance calculation history
CREATE TABLE public.maintenance_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    calculation_date DATE NOT NULL,
    electricity INTEGER NOT NULL,
    water INTEGER NOT NULL,
    watchman INTEGER NOT NULL,
    garbage INTEGER NOT NULL,
    number_of_flats INTEGER NOT NULL,
    total_expense INTEGER NOT NULL,
    cost_per_flat INTEGER NOT NULL,
    total_collected INTEGER NOT NULL,
    surplus INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.maintenance_history ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for now, no auth required)
CREATE POLICY "Anyone can view maintenance history" 
ON public.maintenance_history 
FOR SELECT 
USING (true);

-- Allow public insert access
CREATE POLICY "Anyone can insert maintenance history" 
ON public.maintenance_history 
FOR INSERT 
WITH CHECK (true);

-- Allow public delete access
CREATE POLICY "Anyone can delete maintenance history" 
ON public.maintenance_history 
FOR DELETE 
USING (true);