const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
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
    };;
    var jsonData = JSON.stringify(data);


    console.log(firstName + " " + secondName + " " + email);
    var options = {
        url:"https://us3.api.mailchimp.com/3.0/lists/42434b40b1",
        method:"POST",
        headers:{
            "Authorization":"naveen e14036fa548fd154509e21a0221e9ee1-us3",
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

})
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})
//API key
//e14036fa548fd154509e21a0221e9ee1-us3


//List id
//42434b40b1