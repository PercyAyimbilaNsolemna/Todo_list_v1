
//Require installed modules
const express = require("express");
const bodyParser = require("body-parser");

//Stores the content of express in the app variable
const app = express();

//Sets the app to use ejs
app.set("view engine", "ejs");

//Uses express to access local files
app.use(express.static("public"));

//Uses body-parser to encoded the json response received from an API or a form data
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    
    const date = new Date();

    var currentDay = date.getDay();

    var day = "";

    if (currentDay === 0 || currentDay === 6) {
       day = "Weekend";
    }
    else {
        day = "Weekday";
    }

    res.render("lists", {kindOfDay: day});

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});