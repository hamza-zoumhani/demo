var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/demo");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var User = mongoose.model("User", nameSchema);

app.get('/addname', (req, res)=>{
    User.find({}).exec((err, data)=>{
        res.json(data);
    });
});

app.post("/addname", (req, res)=>{
    var myData = new User(req.body);
    myData.save()
    .then(item=>{
        res.send("Item saved to database");
    })
    .catch(err=> {
        res.status(400).send("Unable to seave to database");
    });
});

app.listen(port, () => {
    console.log("Server listenning on port "+ port);
});