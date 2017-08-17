var app = require("../../express");
var booKlubModel = require("../model/booKlub/booKlub.model.server");


app.post("/api/project/booKlub/:userID", createBooKlub);
app.delete("/api/project/booKlub/:booKlubID", deleteBooKlub);
app.put("/api/project/booKlub/:booKlubID", updateBooKlub);
app.get("/api/project/booKlub/:booKlubID", findBooKlubById);
app.get("/api/project/booKlub", findAllBooKlubs);
app.get("/api/project/user/:userID/booKlubs", findAllBooKlubsForCreator);



function createBooKlub(req, response) {

    var booKlub = req.body;
    var userID = req.params.userID;

    booKlubModel
        .createBooKlub(userID, booKlub)
        .then(function (booKlub) {
            response.json(booKlub);
            return;
        });

}

function deleteBooKlub(req, response) {

    var booKlubID = req.params.booKlubID;

    booKlubModel
        .deleteBooKlub(booKlubID)
        .then(function (status) {
            response.json(status);
            return;
        })
}

function updateBooKlub(req, response) {

    var booKlubID = req.params.booKlubID;
    var booKlub = req.body;

    booKlubModel
        .updateBooKlub(booKlubID, booKlub)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findBooKlubById(req, response) {

    var booKlubID = req.params.booKlubID;

    booKlubModel
        .findBooKlubById(booKlubID)
        .then(function (booKlub) {
            response.json(booKlub);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function findAllBooKlubs(req, response) {

    booKlubModel
        .findAllBooKlubs()
        .then(function (booKlubs) {
            response.json(booKlubs);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function findAllBooKlubsForCreator(req, response) {

    var userID = req.params.userID;

    booKlubModel
        .findAllBooKlubsForUser(userID)
        .then(function (booKlubs) {
            response.json(booKlubs);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}