const express = require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const app = express();
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(express.static("files"));
// app.use(express.static("public"));

const upload = multer({ dest: `${__dirname}/files/public` }); // now upload is in an object of uploading a file in a folder named as uploads which we have provided inside multer

app.set("view engine", "ejs"); // setting ejs

app.get("/getdata", (req, res) => {
  fs.readFile("data.txt", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/update", (req, res) => {
  console.log(`Welcome in update`);
  fs.readFile("data.txt", (err, data) => {
    if (err) {
      console.log(`err`);
      return;
    }
    let todo = JSON.parse(data);
    console.log(todo);
    console.log(req.body);
    todo = todo.filter((element) => {
      if (element.task !== req.body.task) return true;
    });
    fs.writeFile("data.txt", JSON.stringify(todo), (err) => {
      res.redirect("/");
    });
  });
});

app.post("/save", upload.single("pic"), (req, res) => {
  // reading dile first
  fs.readFile("data.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let todo = [];
    if (data.length > 0) todo = JSON.parse(data);
    console.log(req.body);
    console.log(req.file.path);
    todo.push({ task: req.body.task, image: req.file.filename });
    fs.writeFile("data.txt", JSON.stringify(todo), (err) => {
      res.redirect("/");
    });
  });
});

app.listen(8000, (err) => {
  console.log(`Server is Listening at  port 8000`);
});
