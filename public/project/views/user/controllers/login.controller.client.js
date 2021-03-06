(function () {

    angular
        .module("booKlub")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {

        var model = this;

        model.login = login;

        function init() {
            userService.logout()
                .then(function (response) {
                })
        }

        init();

        function login(user) {

            if (!user) {
                model.errorMessage = "User Not Found";
                return;
            }

            if (!user.username || !user.password) {
                model.errorMessage = "Blank fields detected";
                return;
            }

            userService
                .login(user.username, user.password)
                .then(function (_user) {

                    if (!_user) {
                        model.errorMessage = "User Not Found";
                    }
                    else {
                        $location.url("/profile");
                    }
                })

        }

    }
})();
