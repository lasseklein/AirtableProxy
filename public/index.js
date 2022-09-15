
const endPoint = "/.netlify/functions/feedbackproxy"

function handleSubmit(event) {
    event.preventDefault()
    document.querySelector(".star-widget").style.display = "none"
    document.querySelector(".post").style.display = "block"

    const { rating, reason } = event.target.elements

    const json = {
        "project": "MyPages",
        "page": "Cancel",
        "feedback": {
            "Rating": rating.value,
            "Reason": reason.value,
            "OtherReason": "Test",
            "Product": "Test i prod",
            "Referrer": "Postman",
            "Browser": "None"
        }
    }

    fetch( endPoint,
        {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify(json)
         })
        .then(res => {console.log("Request complete! response:", res)})
        .catch((err) => {console.log('err '+err.message)})
    return false
}

 document.querySelector("form").addEventListener('submit', handleSubmit);

