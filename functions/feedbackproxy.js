require('dotenv').config();
const Airtable = require('airtable')

exports.handler = async (event) => {
    Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID)
    const baseName = 'FeedbackForm'
    if (event['httpMethod'] === 'POST') {
        let post = JSON.parse(event.body)
        const data = [{'fields': post}]

        await base(baseName).create(data, {typecast: true} )

        return {
            statusCode: 200,
            body: 'Success!',
        }
    }
    return {
        statusCode: 500,
        body: 'Nay!',
    }
}
