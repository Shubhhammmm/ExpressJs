const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


// handler package used here or view engine
// console.log(path.join(__dirname , "../templates/views"));


const staticHandlePath = path.join(__dirname ,"../templates/views" )

app.set('view engine' ,'hbs');
app.set('views' , staticHandlePath);


// static web page

const staticPath = path.join(__dirname , "../public");

app.use(express.static(staticPath));

// console.log(path.join(__dirname , "../public"));


// routing

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404error");
});

app.listen(port, () => {
  console.log("running on 3000 port");
});
