import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://adzwyoignwrwrmtndhsn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkend5b2lnbndyd3JtdG5kaHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzI0ODYsImV4cCI6MjA2NTc0ODQ4Nn0.ZJhsVmFaZWBuJzY_AJtiOyQ0JRYroNcBtE7KGeDAlQ8";

export const supabase = createClient(supabaseUrl, supabaseKey);
