var app = require("../../express");
var bookModel = require("../model/book/book.model.server");


app.post("/api/project/user/:userID/book", createBook);
app.delete("/api/project/book/:bookID", deleteBook);
app.put("/api/project/book/:bookID", updateBook);
app.get("/api/project/book/:bookID", findBookById);


function createBook(req, response) {

    var book = req.body;

    var userID = req.params.userID;

    bookModel
        .createBook(userID, book)
        .then(function (book) {
            response.json(book);
            return;
        });

}

function deleteBook(req, response) {

    var bookID = req.params.bookID;

    bookModel
        .deleteBook(bookID)
        .then(function (status) {
            response.json(status);
            return;
        })
}

function updateBook(req, response) {

    var bookID = req.params.bookID;
    var book = req.body;

    bookModel
        .updateBook(bookID, book)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findBookById(req, response) {

    var bookID = req.params.bookID;

    bookModel
        .findBookById(bookID)
        .then(function (book) {
            response.json(book);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}