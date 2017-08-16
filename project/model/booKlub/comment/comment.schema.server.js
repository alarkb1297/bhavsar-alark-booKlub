var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({

    _post: {type: mongoose.Schema.ObjectId, ref: "ProjectPostModel"},
    _user: {type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"},
    text: String,
    dateCreated: {type: Date, default: Date.now()}

}, {collection: "project.comment"});

module.exports = commentSchema;