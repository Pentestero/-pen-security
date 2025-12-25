import { createClient } from '@supabase/supabase-js'

// INSTRUCTIONS IMPORTANTES :
// 1. Allez sur https://app.supabase.com/ et créez un nouveau projet.
// 2. Dans votre projet Supabase, allez dans "Project Settings" > "API".
// 3. Trouvez votre "Project URL" et votre clé "Project API keys" (celle nommée 'anon' et 'public').
// 4. Remplacez les valeurs de 'VOTRE_URL_SUPABASE' et 'VOTRE_CLE_ANON_SUPABASE' ci-dessous.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
