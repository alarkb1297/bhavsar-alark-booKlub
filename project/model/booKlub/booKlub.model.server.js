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