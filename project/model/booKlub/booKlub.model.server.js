var mongoose = require('mongoose');
var userSchema = require("../user/user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);
var booKlubSchema = require("./booKlub.schema.server");
var booKlubModel = mongoose.model("ProjectBooKlubModel", booKlubSchema);

booKlubModel.createBooKlub = createBooKlub;
booKlubModel.findBooKlubById = findBooKlubById;
booKlubModel.updateBooKlub = updateBooKlub;
booKlubModel.deleteBooKlub = deleteBooKlub;
booKlubModel.findAllBooKlubs = findAllBooKlubs;
booKlubModel.addPost = addPost;
booKlubModel.removePost = removePost;
module.exports = booKlubModel;

function createBooKlub(userID, booKlub) {

    booKlub._creator = userID;

    var tempBooKlub;

    return booKlubModel
        .create(booKlub)
        .then(function (booKlub) {
            tempBooKlub = booKlub;
            return userModel.followBooKlub(userID, booKlub);
        })
        .then(function (user) {
            return tempBooKlub;
        })
}

function findBooKlubById(booKlubID) {
    return booKlubModel
        .findById(booKlubID)
        .populate('_creator')
        .populate('posts')
        .exec();
}

function updateBooKlub(booKlubID, booKlub) {
    return booKlubModel.update({_id: booKlubID},
        {$set: booKlub});
}

function deleteBooKlub(booKlubID) {
    return booKlubModel.remove({_id: booKlubID});
}

function findAllBooKlubs() {
    return booKlubModel
        .find()
        .populate({
            path: '_creator',
            model: 'ProjectUserModel'
        })
        .exec();
}

function addPost(booKlubID, post) {
    return booKlubModel
        .findById(booKlubID)
        .populate('posts')
        .exec()
        .then(function (booKlub) {
            booKlub.posts.push(post);
            return booKlub.save();
        })
}

function removePost(booKlubID, postID) {
    return booKlubModel
        .findById(booKlubID)
        .populate('posts')
        .exec()
        .then(function (booKlub) {

            for (var i = 0; i < booKlub.posts.length; i++) {

                if (booKlub.posts[i]._id == postID) {
                    booKlub.posts.splice(i, 1);
                    break;
                }
            }

            return booKlub.save();

        })
}