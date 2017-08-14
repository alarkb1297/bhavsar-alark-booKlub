/**
 * Created by Alark on 7/19/17.
 */

(function () {

    angular
        .module("booKlub")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "login": login,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "findAllUsers": findAllUsers,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin,
            "checkAdmin": checkAdmin,
            "logout": logout,
            "removeBookFromBookShelf": removeBookFromBookShelf
        };
        return api;

        function checkLogin() {
            return $http.get("/api/project/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }

        function checkAdmin() {
            return $http.get("/api/project/checkAdmin")
                .then(function (response) {
                    return response.data;
                })
        }

        function logout() {
            return $http.post("/api/project/logout")
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllUsers() {
            return $http.get("/api/project/users")
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userID) {

            var url = "/api/project/users/" + userID;

            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }

        function login(username, password) {

            var url = "/api/project/login";

            return $http.post(url, {username: username, password: password})
                .then(function (response) {
                    var user = response.data;
                    return user;
                });

        }

        function findUserByUsername(username) {

            var url = "/api/project/user?username=" + username;

            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }

        function updateUser(userID, user) {

            var url = "/api/project/user/" + userID;

            return $http.put(url, user)
                .then(function (status) {
                    return findUserById(userID);
                });

        }

        function registerUser(user) {

            var url = "/api/project/user";

            return $http.post(url, user)
                .then(function (response) {
                    var user = response.config.data;
                    return user;
                });

        }

        function deleteUser(userID) {

            var url = "/api/project/user/" + userID;

            return $http.delete(url)
                .then(function (response) {
                    var status = response.config.data;
                    return status;

                });
        }

        function removeBookFromBookShelf(userID, volumeID) {

            var url = "/api/project/users/" + userID + "/book/remove/" + volumeID;

            return $http.put(url)
                .then(function (user) {
                    return user;
                })

        }

    }

})();