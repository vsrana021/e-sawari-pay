import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://zrdrsoyyghrbyubjdcup.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZHJzb3l5Z2hyYnl1YmpkY3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MzUyNzYsImV4cCI6MjA4ODExMTI3Nn0.Egr6T5vOTr6SPL3l3qQTz5vZFZluhzHl__Vpy36g3gc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
