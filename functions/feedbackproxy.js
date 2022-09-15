const Airtable = require('airtable')
Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})

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
    if (event['httpMethod'] === 'POST') {
        const body     = JSON.parse(event.body)
        const project  = projects[ body['project'] ]
        const baseID   = project['baseID']
        const pageID   = project['pages'][ body['page'] ]
        const feedBack = body['feedback']
        const base     = Airtable.base(baseID)
        const data     = [{ 'fields': feedBack  }]

        try {
            const records = await airtablePromise(base, pageID, data)
            const record = (records.length) ? records[0].getId() : ''
            return {statusCode: 200, 'body': record }
        }
        catch {
            return { statusCode: 200, 'body': 'noe gikk galt' }
        }
    }
    return { statusCode: 200, body: 'Bummer!' }
}
