(function () {

    angular
        .module("booKlub")
        .controller("profileEditController", profileEditController);


    function profileEditController(userService, $location, user) {

        var model = this;

        model.user = user;
        model.userId = user._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {

        }

        init();


        function updateUser(user) {

            userService.findUserByUsername(user.username)
                .then(function (_user) {
                    if (_user !== null && _user._id === model.userId) {
                        return userService.updateUser(user._id, user);
                    } else {
                        model.errorMessage = "User already exists";
                        return;
                    }
                })
                .then(function (_user) {
                    model.confMessage = "User successfully updated";
                    return _user;
                })
        }


        function deleteUser(userID) {
            userService.deleteUser(userID)
                .then(function (status) {
                    $location.url("/login");
                })
        }

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                })
        }
    }

})();