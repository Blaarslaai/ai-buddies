import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://iqppghcmtnenpcmsespb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcHBnaGNtdG5lbnBjbXNlc3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyOTE2NTcsImV4cCI6MjA1NDg2NzY1N30.sRJNvOLMJSBVhOYhIpOpVK97BqH0LiNR4dsLnk9u1SQ"
);
