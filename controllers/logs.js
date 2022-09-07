const express = require("express");
const logRouter = express.Router();
const Log = require("../models/log.js");

//I
logRouter.get("/", (req, res) => {
    Log.find({}, (err, allLogs) => {
        res.render("index.ejs", {
            logs: allLogs,
        });
    });
});

//N
logRouter.get("/new", (req, res) => {
    res.render("new.ejs");
});

//D
logRouter.delete("/:id", (req, res) => {
    Log.findByIdAndDelete(req.params.id, (err, deletedLog) => {
        res.redirect("/logs");
    });
});

//U
logRouter.put("/:id", (req, res) => {
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
logRouter.post("/", (req, res) => {
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
logRouter.get("/:id/edit", (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        res.render("edit.ejs", {
            log: foundLog,
        });
    })});

//S
logRouter.get("/:id", (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        res.render("show.ejs", {
            log: foundLog,
        });
    })
});

module.exports = logRouter;