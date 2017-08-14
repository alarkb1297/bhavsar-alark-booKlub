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

        function init() {

            console.log(model.user.bookShelf);
        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                })
        }
    }

})();