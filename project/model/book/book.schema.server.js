var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({

    title: String,
    volumeID: String,
    imgUrl: String

}, {collection: "project.book"});


module.exports = bookSchema;