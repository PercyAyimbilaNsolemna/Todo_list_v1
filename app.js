
//Require installed modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

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

//List schema
const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model('List', listSchema);


app.get("/", async function(req, res){

    const foundItems = await Item.find({}).exec();
    if (foundItems.length === 0) {
        Item.insertMany(defaultItems);
        res.redirect('/');
    } else {
        res.render("list", {listTitle: 'Today', newListItems: foundItems});
    }

});

//Creates a get method any dynamic route to the root route
app.get('/:customListName', async function(req,res) {
    const customListName = _.capitalize(req.params.customListName);

    const foundList = await List.findOne({name: customListName}).exec();

    if(!foundList) {
        //Create a new list
        const newList = new List({
            name: customListName,
            items: defaultItems
        });
    
        await newList.save();

        res.redirect('/' + customListName);

    } else {
        //Show an existing list
        res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
    }

});

//Creates a post method for the root route
app.post("/", async function(req, res) {

    let itemName = req.body.nextItem;
    let listName = req.body.list;

    const newItem = new Item({
        name: itemName
    });

    if (listName === 'Today') {
        await newItem.save();

        res.redirect('/');
    } else {
        const foundList = await List.findOne({name: listName});
        foundList.items.push(newItem);
        await foundList.save();
        res.redirect('/' + listName);
    }

    //const nextItemRoute = req.body.button;

});

//Creates a post method for the delete route
app.post('/delete', async function(req, res){
    const checkedBoxId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === 'Today') {
        await Item.findByIdAndDelete(checkedBoxId);
        res.redirect('/');
    } else {
        await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedBoxId}}}).exec();
        res.redirect('/' + listName);
    }
   
})


//Creates a get method for the about route
app.get('/about', function(req, res) {
    res.render('about');
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});