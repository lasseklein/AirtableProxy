
const endPoint = "/.netlify/functions/feedbackproxy"

function handleSubmit(event) {
    event.preventDefault()
    document.querySelector(".star-widget").style.display = "none"
    document.querySelector(".posted").style.display = "block"

    const { rating, reason } = event.target.elements

    const json = {
        "project": "MyPages",
        "page": "Cancel",
        "feedback": {
            "Rating": rating.value,
            "Reason": reason.value,
            "OtherReason": "Test",
            "Product": "Test i prod",
            "Referrer": "Prod",
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

/*
$("input[type=radio]").click(function(){
    $("input[type=radio]:checked+label").css("opacity", "1");
    $("input[type=radio]:not(:checked)+label").css("opacity", "0.5");
}); //*/


document.querySelector("form").addEventListener('submit', handleSubmit);

const elm = document.querySelectorAll('.emo');
for (i = 0; i < elm.length; i++) {
    elm[i].addEventListener('click', function () {
        document.querySelector("#followUp").style.display = 'block'//style.height = '100%'
    });
}
