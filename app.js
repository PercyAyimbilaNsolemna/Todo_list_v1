
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

//Creates a list to hold all the items added to the todo list
var items = ["Cook Food", "Buy Food", "Eat Food"];

app.get("/", function(req, res){
    
    const today = new Date();

    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res) {

    var item = req.body.nextItem;

    items.push(item);

    //console.log(items.length);

    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});