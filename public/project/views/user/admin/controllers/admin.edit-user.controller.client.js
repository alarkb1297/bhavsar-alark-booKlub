(function () {

    angular
        .module("booKlub")
        .controller("adminEditUserController", adminEditUserController);


    function adminEditUserController(userService, $location, user, $routeParams) {

        var model = this;

        model.userID = $routeParams.userID;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.removeBookFromBookShelf = removeBookFromBookShelf;
        model.logout = logout;

        function init() {
            userService
                .findUserById(model.userID)
                .then(function (user) {
                    model.user = user;
                })
        }

        init();


        function updateUser(user) {

            userService
                .updateUser(user._id, user)
                .then(function (user) {
                    console.log(user);
                    model.confMessage = "User successfully updated"
                })
        }

        function removeBookFromBookShelf(volumeID) {
            userService
                .removeBookFromBookShelf(model.userID, volumeID)
                .then(function (response) {
                    location.reload();
                    model.confMessage = "Book successfully removed from user's bookShelf";
                })

        }

        function deleteUser(userID) {
            userService.deleteUser(userID)
                .then(function (status) {
                    $location.url("/profile/admin-center");
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