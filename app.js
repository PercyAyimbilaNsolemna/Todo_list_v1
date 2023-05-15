
//Require installed modules
const express = require("express");
const bodyParser = require("body-parser");

//Stores the content of express in the app variable
const app = express();

//Uses express to access local files
app.use(express.static("public"));

//Uses body-parser to encoded the json response received from an API or a form data
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    
    const date = new Date();

    console.log("Date and Time: " + date);

    console.log("Date: " + date.getDate());

    console.log("Year: " + date.getFullYear());

    console.log("Month: " + date.getMonth());

    console.log("Day: " + date.getDay());

    res.send("Still working!");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});