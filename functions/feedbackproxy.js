const Airtable = require('airtable')
Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})
const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

const projects = {
    "MyPages": {
        "baseID": 'appYKMog2dsOA8Esn',
        "pages" : {
            "Cancel": 'FeedbackForm'
        }
    }
}

const airtablePromise = (base, pageID, data) => {
    return new Promise((resolve, reject) => {
        base(pageID).create(
            data, {typecast: true},
            (err, records) => {
                if (err) return reject(err)
                resolve(records)
            }
        )
    })
}

exports.handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return {
            'statusCode': 200,
            'headers'   : CORS_HEADERS,
            'body'      : JSON.stringify({message: "Successful preflight call."}),
        }
    }
    else if (event['httpMethod'] === 'POST') {
        const body     = JSON.parse(event.body)
        const feedBack = body['feedback']
        const data     = [{ 'fields': feedBack }]

        const project  = projects[ body['project'] ]
        const baseID   = project['baseID']
        const pageID   = project['pages'][ body['page'] ]
        const base     = Airtable.base(baseID)

        try {
            const records = await airtablePromise(base, pageID, data)
            const record = (records.length) ? records[0].getId() : ''
            return {
                'statusCode': 200,
                'headers'   : CORS_HEADERS,
                'body'      : record }
        }
        catch {
            return {
                'statusCode': 500,
                'body'      : 'Bugger!'
            }
        }
    }
    return {
        'statusCode': 500,
        'body': 'Bummer!'
    }
}
