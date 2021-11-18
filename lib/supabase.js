import { createClient } from "@supabase/supabase-js"

const client = () => {
    if (process.env.SUPABASE_URL || process.env.SUPABASE_KEY)
        return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    return {}
}

export default client()
