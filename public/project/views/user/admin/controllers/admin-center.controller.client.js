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
        model.deleteBooKlub = deleteBooKlub;

        function init() {

            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });

            booKlubService
                .findAllBooKlubs()
                .then(function (booKlubs) {
                    model.booKlubs = booKlubs;
                })
        }

        init();


        function deleteUser(userID) {
            userService.deleteUser(userID)
                .then(function (status) {
                    model.confMessage = "User successfully deleted";
                    return userService.findAllUsers();
                })
                .then(function (users) {
                    model.users = users;
                })
        }

        function deleteBooKlub(booKlubID) {
            booKlubService
                .deleteBooKlub(booKlubID)
                .then(function (booKlub) {
                    model.confMessage = "booKlub successfully deleted";
                    return booKlubService.findAllBooKlubs();
                })
                .then(function (booKlubs) {
                    model.booKlubs = booKlubs;
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