
//Require installed modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

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

//Connects to mongodb 
const URL = 'mongodb+srv://percy:Ayimbila@cluster0.az84zbp.mongodb.net/todolistDB?retryWrites=true&w=majority';
mongoose.connect(URL);
console.log('Successfully connected to mongodb');

//Defines the todolist schema 
const itemsSchema = {
    name: String
};

//Defines a model for the schema 
const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name: 'Welcome to your todolist!'
});


const item2 = new Item({
    name: 'Hit the + to add a new item.'
});

const item3 = new Item({
    name: '<-- Hit this to delete an item.'
});

const defaultItems = [item1, item2, item3];



app.get("/", async function(req, res){
    


    const foundItems = await Item.find({}).exec();
    if (foundItems.length === 0) {
        Item.insertMany(defaultItems);
        res.redirect('/');
    } else {
        res.render("list", {listTitle: 'Today', newListItems: foundItems});
    }
    console.log(foundItems);

});

app.post("/", async function(req, res) {

    let itemName = req.body.nextItem;

    const newItem = new Item({
        name: itemName
    });

    await newItem.save();

    res.redirect('/');

    //const nextItemRoute = req.body.button;

})

//Creates a post method for the delete route
app.post('/delete', async function(req, res){
    const checkedBoxId = req.body.checkbox
    await Item.findByIdAndDelete(checkedBoxId);
    res.redirect('/');
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