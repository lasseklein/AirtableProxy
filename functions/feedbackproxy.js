require('dotenv').config();
const Airtable = require('airtable')
Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})
const base  = Airtable.base(process.env.AIRTABLE_BASE_ID)
const table = base(process.env.AIRTABLE_TABLE_NAME)

exports.handler = async (event) => {
    if (event['httpMethod'] === 'POST') {
        const data = [{'fields': JSON.parse(event.body)}]
        table.create(data, {typecast: true} )
        return { statusCode: 200, body: 'Success!' }
    }
    return { statusCode: 500, body: 'Nay!' }
}
