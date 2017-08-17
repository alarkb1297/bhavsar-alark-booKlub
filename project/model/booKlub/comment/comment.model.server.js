var mongoose = require('mongoose');
var commentSchema = require("./comment.schema.server");
var commentModel = mongoose.model("ProjectCommentModel", commentSchema);
var postSchema = require("../post/post.schema.server");
var postModel = mongoose.model("ProjectPostModel", postSchema);

commentModel.createComment = createComment;
commentModel.findCommentById = findCommentById;
commentModel.updateComment = updateComment;
commentModel.deleteComment = deleteComment;
commentModel.findAllCommentsForPost = findAllCommentsForPost;
module.exports = commentModel;

function createComment(userID, postID, comment) {

    comment._user = userID;
    comment._post = postID;

    var tempComment;

    return commentModel
        .create(comment)
        .then(function (comment) {
            tempComment = comment;
            return postModel.addComment(postID, comment);
        })
        .then(function (booKlub) {
            return tempPost;
        })
}

function findCommentById(commentID) {
    return commentModel
        .findById(commentID)
        .populate('_post')
        .populate('_user')
        .exec();
}

function updateComment(commentID, comment) {
    return commentModel
        .update({_id: commentID},
        {$set: comment});
}

function deleteComment(commentID) {
    return commentModel
        .findById(commentID)
        .then(function (comment) {
            return postModel.removeComment(comment._post, commentID);
        })
        .then(function (post) {
            return commentModel.remove({_id: commentID})
        })
}

function findAllCommentsForPost(postID) {
    return commentModel
        .find({_post: postID})
        .populate({
            path: '_user',
            model: 'ProjectUserModel'
        })
        .exec()
}
