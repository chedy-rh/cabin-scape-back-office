import { createClient } from "@supabase/supabase-js";

export const supabaseUrl: string = "https://svkwodswtcuucnsoyzro.supabase.co";
const supabaseKey: string =
  "sb_publishable_v4vsf5gbdGxrDUJU8vlQMw_yV7Or0C_";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
