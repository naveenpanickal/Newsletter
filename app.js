const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var secondName = req.body.sName;
    var email = req.body.email;
    var data = {
        members:[{
            email_address : email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:secondName
            }
        }]
    };
    var jsonData = JSON.stringify(data);


    console.log(firstName + " " + secondName + " " + email);
    var options = {
        url:"https://us3.api.mailchimp.com/3.0/lists/"+list_id,
        method:"POST",
        headers:{
            "Authorization":"naveen "+process.env.api_key,
        },
        body:jsonData
    }
    request(options, function (error, response, body) {
        if(error){
            res.send("There was an error in signing up");
        }
        else{
            if(response.statusCode === 200)
            res.sendFile(__dirname+"/success.html");
            else
            res.sendFile(__dirname+"/failure.html");
        }

    })
    app.post("/failure",function(req,res){
        res.redirect("/");
    })

});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})
