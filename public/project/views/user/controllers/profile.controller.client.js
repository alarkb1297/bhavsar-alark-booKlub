(function () {

    angular
        .module("booKlub")
        .controller("profileController", profileController);


    function profileController(userService, $location, user) {

        var model = this;

        model.user = user;
        model.userId = user._id;
        model.bookShelf = user.bookShelf;

        model.logout = logout;
        model.unFollowBooKlub = unFollowBooKlub;
        model.unFollowUser = unFollowUser;

        function init() {
        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
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

        function unFollowUser(curUser, otherUserID) {
            userService
                .unFollowUser(curUser, otherUserID)
                .then(function (user) {
                    model.errorMessage = "Successfully unfollowed user";
                    model.confMessage = null;
                    location.reload();
                })
        }
    }

})();