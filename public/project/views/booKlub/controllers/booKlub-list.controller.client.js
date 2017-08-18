(function () {

    angular
        .module("booKlub")
        .controller("booKlubListController", booKlubListController);


    function booKlubListController(booKlubService, $location, user, userService) {

        var model = this;

        model.followBooKlub = followBooKlub;
        model.unFollowBooKlub = unFollowBooKlub;
        model.userFollowsBooKlub = userFollowsBooKlub;

        function init() {

            if (user) {
                model.user = user;
                model.userID = model.user._id;
            }

            booKlubService
                .findAllBooKlubs()
                .then(function (booKlubs) {
                    model.booKlubs = booKlubs;
                });
        }

        init();

        function followBooKlub(booKlub) {

            userService
                .followBooKlub(model.user._id, booKlub)
                .then(function (user) {
                    model.confMessage = "Successfully followed booKlub";
                    model.errorMessage = null;
                    return userService.findUserById(model.userID);
                })
                .then(function (user) {
                    model.user = user;
                })
        }

        function unFollowBooKlub(booKlubID) {
            userService
                .unFollowBooKlub(model.user._id, booKlubID)
                .then(function (user) {
                    model.errorMessage = "Successfully unfollowed booKlub";
                    model.confMessage = null;
                    return userService.findUserById(model.userID);
                })
                .then(function (user) {

                    model.user = user;
                })
        }

        function userFollowsBooKlub(booKlub) {

            if (model.user) {
                var booKlubs = model.user.booKlubs;

                for (var i = 0; i < booKlubs.length; i++) {
                    if (booKlubs[i]._id == booKlub._id) {
                        return true;
                        break;
                    }
                }
            } else {
                return false;
            }
        }
    }

})();