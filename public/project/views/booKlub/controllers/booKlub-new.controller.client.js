(function () {

    angular
        .module("booKlub")
        .controller("booKlubNewController", booKlubNewController);

    function booKlubNewController(booKlubService, $location, user) {
        var model = this;

        model.user = user;

        model.createBooKlub = createBooKlub;

        function init() {

        }

        init();


        function createBooKlub(booKlub) {

            if (!booKlub || !booKlub.title || !booKlub.description) {
                model.errorMessage = "Blank fields detected"
            } else {
                booKlubService
                    .createBooKlub(model.user._id, booKlub)
                    .then(function (booKlub) {
                        model.confMessage = "booKlub successfully created"
                    })
            }

        }

    }

})();