import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cuoyycqviymtptwbwwui.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1b3l5Y3F2aXltdHB0d2J3d3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMjc0NzEsImV4cCI6MjA4MTYwMzQ3MX0.xEAuiOaQpViumi1Bms7VTsx0bbxuNp175FEpFBOQBd8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;