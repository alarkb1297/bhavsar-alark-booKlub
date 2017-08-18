var mongoose = require('mongoose');

var postSchema = mongoose.Schema({

    title: String,
    _booKlub: {type: mongoose.Schema.ObjectId, ref: "ProjectBooKlubModel"},
    text: String,
    comments: [{type: mongoose.Schema.ObjectId, ref: "ProjectCommentModel"}],
    _user: {type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"},
    dateCreated: {type: Date, default: Date.now()}


}, {collection: "project.post"});

module.exports = postSchema;