var mongoose = require('mongoose');

var booKlubSchema = mongoose.Schema({

    title: String,
    description: String,
    posts: String,
    // associatedBook: String
}, {collection: "project.booKlub"});

module.exports = booKlubSchema;