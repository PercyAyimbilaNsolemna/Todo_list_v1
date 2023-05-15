
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

    
    switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        
        case 1:
            day = "Monday";
            break;

        case 2:
            day = "Tuesday";
            break;

        case 3:
            day = "Wednesday";
            break;

        case 4: 
            day = "Thursday";
            break;

        case 5:
            day = "Friday";
            break;

        case 6:
            day = "Saturday";
            break;

        default:
            console.log("Error: Curent day is equal to " + currentDay);
            break;
    }

    res.render("lists", {kindOfDay: day});

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});