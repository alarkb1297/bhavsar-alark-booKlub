(function () {

    angular
        .module("booKlub")
        .controller("booKlubListController", booKlubListController);


    function booKlubListController($routeParams, user, userService, postService, commentService) {

        var model = this;

        model.user = user;
        model.booKlubID = $routeParams.booKlubID;


        function init() {
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
                    location.reload();
                })
        }

        function unFollowBooKlub(booKlubID) {
            userService
                .unFollowBooKlub(model.user._id, booKlubID)
                .then(function (user) {
                    model.errorMessage = "Successfully unfollowed booKlub";
                    model.confMessage = null;
                    location.reload();
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