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
app.delete("/logs/:id", (req, res) => {
    Log.findByIdAndDelete(req.params.id, (err, deletedLog) => {
        res.redirect("/logs");
    });
});

//U
app.put("/logs/:id", (req, res) => {
    if (req.body.shipIsBroken === "on") {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    Log.findByIdAndUpdate(req.params.id, req.body, 
    {
        new: true,
    }, (err, foundLog) => {
        res.redirect(`/logs/${req.params.id}`)
    });
});

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
app.get("/logs/:id/edit", (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        res.render("edit.ejs", {
            log: foundLog,
        });
    })});

//S
app.get("/logs/:id", (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        res.render("show.ejs", {
            log: foundLog,
        });
    })
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