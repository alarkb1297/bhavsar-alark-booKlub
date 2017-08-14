var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    google: {
        id: String,
        token: String,
        imgUrl: String
    },
    phone: Number,
    bookShelf: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectBookModel"}],
    // booKlubs: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectBooKlubModel"}],
    isAdmin: {type: Boolean, default: 'false'},
    dateCreated: {type: Date, default: Date.now()}

}, {collection: "project.user"});


module.exports = userSchema;