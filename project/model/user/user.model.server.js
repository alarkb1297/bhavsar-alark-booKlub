var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addBookToBookShelf = addBookToBookShelf;
userModel.removeBookFromBookShelf = removeBookFromBookShelf;
userModel.followBooKlub = followBooKlub;
userModel.unFollowBooKlub = unFollowBooKlub;
module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userID) {
    return userModel
        .findById(userID)
        .populate('bookShelf')
        .exec();
}

function updateUser(userID, user) {
    return userModel.update({_id: userID},
        {$set: user});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username})
        .populate('bookShelf')
        .exec();
}

function deleteUser(userID) {
    return userModel.remove({_id: userID});
}

function findUserByGoogleId(googleID) {
    return userModel
        .findOne({"google.id": googleID})
        .populate('bookShelf')
        .exec();
}

function addBookToBookShelf(userID, book) {

    var index;

    return userModel
        .findUserById(userID)
        .then(function (user) {
            user.bookShelf.push(book);
            user.save();
            index = user.bookShelf.indexOf(book);
            return user.bookShelf[index];
        })
}

function removeBookFromBookShelf(userID, _volumeID) {

    return userModel
        .findById(userID)
        .populate('bookShelf')
        .exec()
        .then(function (user) {

            for (var i = 0; i < user.bookShelf.length; i++) {
                if (user.bookShelf[i].volumeID === _volumeID) {
                    user.bookShelf.splice(i, 1);
                    break;
                }
            }

            return user.save();
        });
}

function findAllUsers() {
    return userModel.find({});

}

function followBooKlub(userID, booKlub) {
    return userModel
        .findById(userID)
        .populate('bookShelf')
        .exec()
        .then(function (user) {
            user.booKlubs.push(booKlub);
            return user.save();
        })
}
function unFollowBooKlub(userID, booKlubID) {
    return userModel
        .findById(userID)
        .populate('bookShelf')
        .exec()
        .then(function (user) {

            for (var i = 0; i < user.booKlubs.length; i++) {
                if (user.booKlubs[i]._id === booKlubID) {
                    user.booKlubs.splice(i, 1);
                    break;
                }
            }

            return user.save();
        })
}
