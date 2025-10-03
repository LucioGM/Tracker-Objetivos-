import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akhokbjlyoxedpvvegnp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraG9rYmpseW94ZWRwdnZlZ25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDk4NjgsImV4cCI6MjA3MDY4NTg2OH0.imx3Nz50Zd7jDDwII_cWMBed5TSmq0Tp-KO7EaHKRNs';

export const supabase = createClient(supabaseUrl, supabaseKey);
