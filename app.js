const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(firstName,lastName,email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    lName: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/011cbdb485"

    const options = {
        method: "POST",
        auth: "siva:5f94fdca865364ac6e106ff4a387eb63-us9"
    }

   const request =  https.request(url, options, (response) => {
       
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
    
    response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });


request.write(jsonData);
request.end();
});

app.post("/failure",(req,res)=>{
    res.redirect("/")
})
// Portal Running 
app.listen(3000, function () {
    console.log("server started on port 3000");
})

// API key in Mailchimp.com
// 5f94fdca865364ac6e106ff4a387eb63-us9

// my ID
// id=011cbdb485