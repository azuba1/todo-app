const express = require("express");
const bodyParser =require("body-parser");
const date = require(__dirname + "/date.js"); 

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.set("view engine", "ejs"); 

app.get("/", (req, res) => {
  let day = date();
 
  res.render("list",{workTitle:day, newLists:items});

});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", (req, res) => {
  res.render("list", {workTitle:"work list", newLists:workItems});
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work"); 
});

app.get("/about", (req, res) => {
  res.render("about");
});

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on ${port}...`);
});