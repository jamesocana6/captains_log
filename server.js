const express = require("express");
const { redirect } = require("express/lib/response");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const Log = require("./models/log.js");

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
	useUnifiedTopology: true
});

// MIDDLEWARE 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// ROUTES
app.get("/", (req, res) => {
    res.redirect("/logs");
});

//I
app.get("/logs", (req, res) => {
    Log.find({}, (err, allLogs) => {
        res.render("index.ejs", {
            logs: allLogs,
        });
    });
});

//N
app.get("/logs/new", (req, res) => {
    res.render("new.ejs");
});

//D

//U

//C
app.post("/logs", (req, res) => {
    if (req.body.shipIsBroken === "on") {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Log.create(req.body, (err, createdLog) => {
        res.redirect("/logs");
    });
});

//E

//S
app.get("/logs/:id", (req, res) => {
    res.render("show.ejs");
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(PORT, () => {
    console.log("We have connected!");
});