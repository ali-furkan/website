import airtable from "airtable"

const client = () => {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) return {}

    return airtable.base(process.env.AIRTABLE_BASE_ID)
}

export default client()