
//Require installed modules
const express = require("express");
const bodyParser = require("body-parser");

//Requires local module
const date = require(__dirname + '/date.js');

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


app.get("/", function(req, res){
    
    //Runs the getDate method in the date.js module imported
    const day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});

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
    res.render('list', {listTitle: 'Work', newListItems: workItems});
});

//Creates a get method for the about route
app.get('/about', function(req, res) {
    res.render('about');
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});