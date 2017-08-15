var mongoose = require('mongoose');

var booKlubSchema = mongoose.Schema({

    _creator: {type: mongoose.Schema.ObjectId, ref: "ProjectUserModel"},
    title: String,
    description: String
    // posts: String

}, {collection: "project.booKlub"});

module.exports = booKlubSchema;