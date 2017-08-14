(function () {

    angular
        .module("booKlub")
        .controller("registerController", registerController);


    function registerController(userService, $location) {


        var model = this;

        model.registerUser = registerUser;


        function init() {

        }

        init();


        function registerUser(user) {

            if (user === null || !user.username || !user.password || !user.password2) {
                model.errorMessage = "Blank Fields Detected";
                return;
            }

            if (user.password !== user.password2) {
                model.errorMessage = "Passwords Don't Match";
                return;
            }

            userService.findUserByUsername(user.username)
                .then(function (_user) {

                    if (_user) {
                        model.errorMessage = "User already exists";
                    } else {
                        return userService.registerUser(user);
                    }

                })
                .then(function (_user) {
                    if (_user) {
                        return userService.login(_user.username, _user.password);
                    }
                })
                .then(function (_user) {
                    if (_user) {
                        $location.url("/profile");
                        return _user;
                    }
                })
        }
    }

})();
