var mongoose = require('mongoose');
var booKlubSchema = require("../booKlub.schema.server");
var booKlubModel = mongoose.model("ProjectBooKlubModel", booKlubSchema);
var postSchema = require("./post.schema.server");
var postModel = mongoose.model("ProjectPostModel", postSchema);

postModel.createPost = createPost;
postModel.findPostById = findPostById;
postModel.updatePost = updatePost;
postModel.deletePost = deletePost;
postModel.findAllPostsForBooKlub = findAllPostsForBooKlub;
postModel.addComment = addComment;
postModel.removeComment = removeComment;
module.exports = postModel;

function createPost(userID, booKlubID, post) {

    post._userID = userID;
    post._booKlub = booKlubID;

    var tempPost;

    return postModel
        .create(post)
        .then(function (post) {
            tempPost = post;
            return booKlubModel.addPost(booKlubID, post);
        })
        .then(function (booKlub) {
            return tempPost;
        })
}

function findPostById(postID) {
    return postModel
        .findById(postID)
        .populate('_booKlub')
        .populate('_user')
        .populate('dateCreated')
        .exec();
}

function updatePost(postID, post) {
    return postModel.update({_id: postID},
        {$set: post});
}

function deletePost(postID) {
    return postModel
        .findById(postID)
        .then(function (post) {
            return booKlubModel.removePost(post._booKlub, postID);
        })
        .then(function (booKlub) {
            return postModel.remove({_id: postID})
        })
}

function findAllPostsForBooKlub(booKlubID) {
    return postModel
        .find({_booKlub: booKlubID})
        .populate({
            path: '_booKlub',
            model: 'ProjectBooKlubModel'
        })
        .populate({
            path: '_user',
            model: 'ProjectUserModel'
        })
        .populate({
            path: 'dateCreated'
        })
        .exec()
}

function addComment(postID, comment) {
    return postModel
        .findById(postID)
        .populate('comments')
        .exec()
        .then(function (post) {
            post.comments.push(comment);
            return post.save();
        })
}

function removeComment(postID, commentID) {
    return post
        .findById(postID)
        .populate('comments')
        .exec()
        .then(function (post) {

            for (var i = 0; i < post.commetns.length; i++) {

                if (post.comments[i]._id == commentID) {
                    post.commetns.splice(i, 1);
                    break;
                }
            }

            return post.save();

        })
}