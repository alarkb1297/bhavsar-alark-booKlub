(function () {

    angular
        .module("booKlub")
        .controller("userProfileController", userProfileController);


    function userProfileController(userService, $location, user, $routeParams) {

        var model = this;

        model.curUser = user;
        model.otherUserID = $routeParams.userID;

        model.curUserFollowsOtherUser = curUserFollowsOtherUser;
        model.followUser = followUser;
        model.unFollowUser = unFollowUser;
        model.logout = logout;

        function init() {

            if(model.curUser && model.curUser._id === model.otherUserID) {
                $location.path("/profile")
            } else {
                userService
                    .findUserById(model.otherUserID)
                    .then(function (otherUser) {
                        model.bookShelf = otherUser.bookShelf;
                        model.booKlubs = otherUser.booKlubs;
                        model.following = otherUser.following;
                        model.followers = otherUser.followers;
                        model.user = otherUser;
                        if (model.curUser) {
                            model.curUserFollowsOtherUser(model.curUser);
                        }
                    })
            }


        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                })
        }

        function curUserFollowsOtherUser(curUser) {

            model.followsUser = false;


            for (var i = 0; i < curUser.following.length; i++) {
                if (curUser.following[i]._id === model.otherUserID) {
                    model.followsUser = true;
                    break;
                }
            }
        }

        function followUser(curUser, otherUserID) {
            userService
                .followUser(curUser, otherUserID)
                .then(function (user) {
                    model.confMessage = "User successfully followed";
                    model.errorMessage = null;
                    model.followsUser = true;
                })
        }

        function unFollowUser(curUser, otherUserID) {
            userService
                .unFollowUser(curUser, otherUserID)
                .then(function (user) {
                    model.errorMessage = "User successfully unfollowed";
                    model.confMessage = null;
                    model.followsUser = false;
                })
        }
    }

})();