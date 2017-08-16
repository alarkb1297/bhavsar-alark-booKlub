var app = require("../../express");
var commentModel = require("../model/booKlub/comment/comment.model.server");


app.post("/api/project/user/:userID/booKlub/post/:postID/comment", createComment);
app.delete("/api/project/booKlub/post/comment/:commentID", deleteComment);
app.put("/api/project/booKlub/post/comment/:commentID", updateComment);
app.get("/api/project/booKlub/post/comment/:commentID", findCommentById);
app.get("/api/project/booKlub/post/:postID/comment", findAllCommentsForPost);


function createComment(req, response) {

    var post = req.body;
    var userID = req.params.userID;
    var postID = req.params.postID;

    commentModel
        .createComment(userID, postID, post)
        .then(function (comment) {
            response.json(comment);
            return;
        });

}

function deleteComment(req, response) {

    var commentID = req.params.booKlubID;

    commentModel
        .deleteComment(commentID)
        .then(function (status) {
            response.json(status);
            return;
        })
}

function updateComment(req, response) {

    var commentID = req.params.booKlubID;
    var comment = req.body;

    commentModel
        .udpateComment(commentID, comment)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findCommentById(req, response) {

    var commentID = req.params.booKlubID;

    commentModel
        .findCommentById(commentID)
        .then(function (comment) {
            response.json(comment);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function findAllCommentsForPost(req, response) {

    var postID = req.params.postID;

    commentModel
        .findAllCommentsForPost(postID)
        .then(function (comments) {
            response.json(comments);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}