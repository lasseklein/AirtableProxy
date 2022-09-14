require('dotenv').config();
const qs = require('querystring');
const Airtable = require('airtable')

exports.handler = async (event, context) => {
    Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID)
    const baseName = 'FeedbackForm'
    if (event['httpMethod'] == 'POST') {
        let post = JSON.parse(event.body)
        const data = [{'fields': post}]

        await base(baseName).create(data,
            {typecast: true},
            function (err,records) {
                if (err) {console.error(err); return; }
                records.forEach(function (record) {
                   // console.log(record.getId())
                })
            }
        )
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
