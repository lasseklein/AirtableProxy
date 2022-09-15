const btn = document.querySelector("button");
const form = document.querySelector("form");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");

const json = {
    "project": "MyPages",
    "page": "Cancel",
    "feedback": {
        "Rating": 5,
        "Reason": "Squirrel!",
        "OtherReason": "Test",
        "Product": "Test i prod",
        "Referrer": "Postman",
        "Browser": "None"
    }
}

fetch("https://atproxy.netlify.app/.netlify/functions/feedbackproxy",         {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(json)
}).then(res => {
    console.log("Request complete! response:", res);
})
    .catch((err) => {console.log('err '+err.message)})
function handleSubmit(event) {
    event.preventDefault();
    widget.style.display = "none";
    post.style.display = "block";

    const { rating, thereason } = event.target.elements

    const json = {
        "project": "MyPages",
        "page": "Cancel",
        "feedback": {
            "Rating": rating.value,
            "Reason": thereason.value,
            "OtherReason": "Test",
            "Product": "Test i prod",
            "Referrer": "Postman",
            "Browser": "None"
        }
    }

    console.log({json})
    //JSON.stringify(json)
    fetch("https://atproxy.netlify.app/.netlify/functions/feedbackproxy",         {
        method: "POST",

        body: json
    }).then(res => {
        console.log("Request complete! response:", res);
    })
        .catch((err) => {console.log('err '+err.message)})

    return false;
}
form.addEventListener('submit', handleSubmit);

