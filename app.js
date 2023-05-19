
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

//Makes express serve our static files
app.use(express.static("public"));

//Creates a list to hold all the items added to the todo list
let items = ["Cook Food", "Buy Food", "Eat Food"];

//Creates an empty array to store the work list
let workItems = [];

app.get("/", function(req, res){
    
    const today = new Date();

    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res) {

    let item = req.body.nextItem;

    const nextItemRoute = req.body.button;

    if (nextItemRoute === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
    
        res.redirect("/");
    }


})

//Creates a get method for the work route
app.get('/work', function(req, res) {
    res.render('list', {kindOfDay: 'Work', newListItems: workItems});
})

app.get('/about', function(req, res) {
    res.send('Working on it');
})

app.post('/about', function(req, res) {
    res.send('Reach out soon');
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});