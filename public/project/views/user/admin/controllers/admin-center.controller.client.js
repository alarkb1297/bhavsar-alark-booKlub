(function () {

    angular
        .module("booKlub")
        .controller("adminCenterController", adminCenterController);


    function adminCenterController(userService, $location, user) {

        var model = this;

        model.adminUser = user;
        model.adminUserID = user._id;

        model.logout = logout;
        model.deleteUser = deleteUser;

        function init() {

            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }

        init();


        function deleteUser(userID) {
            userService.deleteUser(userID)
                .then(function (status) {
                    location.reload();
                    model.confMessage = "User successfully deleted";
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