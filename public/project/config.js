(function () {

    angular
        .module("booKlub")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
        //search routes
            .when("/", {
                templateUrl: "./views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginHome
                }
            })
            .when("/details/:volumeID", {
                templateUrl: "./views/details/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginGeneral
                }
            })
            .when("/search/:searchOption/:searchQuery", {
                templateUrl: "./views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginHome
                }
            })
            //user routes
            .when("/login", {
                templateUrl: "./views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginLogin
                }
            })
            .when("/register", {
                templateUrl: "./views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/profile/edit", {
                templateUrl: "./views/user/templates/profile-edit.view.client.html",
                controller: "profileEditController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/profile/admin-center", {
                templateUrl: "./views/user/admin/templates/admin-center.view.client.html",
                controller: "adminCenterController",
                controllerAs: "model",
                resolve: {
                    user: checkAdmin
                }
            })
            .when("/profile/admin-center/edit-user/:userID", {
                templateUrl: "./views/user/admin/templates/admin.edit-user.view.client.html",
                controller: "adminEditUserController",
                controllerAs: "model",
                resolve: {
                    user: checkAdmin
                }

            })
            .when("/user/:userID", {
                templateUrl: "./views/user/templates/user.profile.view.client.html",
                controller: "userProfileController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginGeneral
                }
            })
            //booKlub routes
            .when("/booKlub", {
                templateUrl: "./views/booKlub/templates/booKlub-list.view.client.html",
                controller: "booKlubListController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginGeneral
                }
            })
            .when("/booKlub/new", {
                templateUrl: "./views/booKlub/templates/booKlub-new.view.client.html",
                controller: "booKlubNewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/booKlub/blog/:booKlubID", {
                templateUrl: "./views/booKlub/templates/booKlub-blog.view.client.html",
                controller: "booKlubBlogController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginGeneral
                }
            })
            .when("/booKlub/blog/:booKlubID/post/edit/:postID", {
                templateUrl: "./views/booKlub/templates/booKlub-post-edit.view.client.html",
                controller: "postEditController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginBooKlub
                }
            })
    }

    function checkLogin(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if (user === "0") {
                    deferred.reject();
                    $location.url("/profile");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginHome(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.resolve(null);
                    $location.url("/");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginBooKlub(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.resolve(null);
                    $location.url("/booKlub");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginLogin(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.resolve(null);
                } else {
                    $location.url("/");
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginGeneral(userService, $q, $location) {

        var deferred = $q.defer();

        userService
            .checkLogin()
            .then(function (user) {
                if (user === "0") {
                    deferred.resolve(null);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();