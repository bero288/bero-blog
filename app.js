//import express
const express = require("express");
//require a package
const morgan = require("morgan");
//import mongoose
const mongoose = require("mongoose");
//make an express app
const app = express();
//require express router
const blogRouter = require("./routes/blog-routes");
//connect to the db
const dbUri =
  "mongodb+srv://ebraam:ebraamwadee@cluster0.ytxcs.mongodb.net/Bero's-blog?retryWrites=true&w=majority";
mongoose
  .connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((res) => {
    //listen to reuests
    app.listen(3000);
  })
  .catch((err) => console.log(err));
//register the view engine
app.set("view engine", "ejs");
//middlewares and serving static files
app.use(express.static("public"));
//log some information about the request
app.use(morgan("tiny"));
//solve the encoding
app.use(express.urlencoded({ extended: true }));
//save data to the db
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.use("/blogs", blogRouter);
/*
?redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});*/
//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
