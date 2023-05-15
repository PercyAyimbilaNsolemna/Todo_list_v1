
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

    var currentDay = date.getDay();

    if (currentDay === 0 || currentDay === 6) {
        res.write("<p>It's a weekend so you have to be resting</p>");
        res.write("<p>I love resting. Do you?</p>");
        res.write("<h1>Sound rest</h1>");
        res.send();
    }
    else {
        res.write("<p>It's a busy working day.</p>");
        res.write("<p>I love doing what I do best. Do you?</p>");
        res.write("<h1>Keep working hard!</h1>");
        res.send();
    }

});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});