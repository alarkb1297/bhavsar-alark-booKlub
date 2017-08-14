var mongoose = require('mongoose');
var bookSchema = require("./book.schema.server");
var bookModel = mongoose.model("ProjectBookModel", bookSchema);
var userSchema = require("../user/user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

bookModel.createBook = createBook;
bookModel.findBookById = findBookById;
bookModel.updateBook = updateBook;
bookModel.findBookByTitle = findBookByTitle;
bookModel.findBookByVolumeId = findBookByVolumeId;
bookModel.deleteBook = deleteBook;
module.exports = bookModel;

function createBook(userID, book) {

    return bookModel
        .findBookByVolumeId(book.volumeID)
        .then(function (_book) {
            if (_book) {
                return bookModel.findBookByVolumeId(_book.volumeID);
            } else {
                return bookModel.create(book);
            }
        })
        .then(function (book) {
            return userModel.addBookToBookShelf(userID, book);
        })
}

function findBookById(bookID) {
    return bookModel.findById(bookID);
}

function findBookByVolumeId(volumeID) {
    return bookModel.findOne({volumeID: volumeID});
}

function updateBook(bookID, book) {
    return bookModel.update({_id: bookID},
        {$set: book});
}

function findBookByTitle(title) {
    return bookModel.findOne({title: title});
}

function deleteBook(bookID) {
    return bookModel.remove({_id: bookID});
}
