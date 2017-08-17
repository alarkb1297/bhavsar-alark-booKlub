var app = require("../../express");
var postModel = require("../model/booKlub/post/post.model.server");

app.post("/api/project/user/:userID/booKlub/:booKlubID", createPost);
app.delete("/api/project/booKlub/post/:postID", deletePost);
app.put("/api/project/booKlub/post/:postID", updatePost);
app.get("/api/project/booKlub/post/:postID", findByPostId);
app.get("/api/project/booKlub/:booKlubID/post", findAllPostsForBooKlub);


function createPost(req, response) {

    var post = req.body;
    var userID = req.params.userID;
    var booKlubID = req.params.booKlubID;

    postModel
        .createPost(userID, booKlubID, post)
        .then(function (post) {
            response.json(post);
            return;
        });

}

function deletePost(req, response) {

    var postID = req.params.postID;

    postModel
        .deletePost(postID)
        .then(function (status) {
            response.json(status);
            return;
        })
}

function updatePost(req, response) {

    var postID = req.params.postID;
    var post = req.body;

    postModel
        .updatePost(postID, post)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findByPostId(req, response) {

    var postID = req.params.postID;

    postModel
        .findPostById(postID)
        .then(function (post) {
            response.json(post);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function findAllPostsForBooKlub(req, response) {

    var booKlubID = req.params.booKlubID;

    postModel
        .findAllPostsForBooKlub(booKlubID)
        .then(function (posts) {
            response.json(posts);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}