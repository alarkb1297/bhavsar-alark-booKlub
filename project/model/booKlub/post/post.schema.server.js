var mongoose = require('mongoose');

var postSchema = mongoose.Schema({

    _booKlub: {type: mongoose.Schema.ObjectId, ref: "ProjectBooKlubModel"},
    text: String,
    comments: [{type: mongoose.Schema.ObjectId, ref: "ProjectCommentModel"}],
    _user: {type: mongoose.Schema.ObjectId, ref: "ProjectPostModel"},
    dateCreated: {type: Date, default: Date.now()}


}, {collection: "project.post"});

module.exports = postSchema;