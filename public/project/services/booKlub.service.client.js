(function () {

    angular
        .module("booKlub")
        .factory("booKlubService", booKlubService);

    function booKlubService($http) {


        var api = {
            "createBooKlub" : createBooKlub,
            "updateBooKlub" : updateBooKlub,
            "deleteBooKlub" : deleteBooKlub,
            "findBooKlubById" : findBooKlubById,
            "findAllBooKlubs" : findAllBooKlubs,
            "findAllBooKlubsForCreator": findAllBooKlubsForCreator
        };
        return api;


        function createBooKlub(userID, booKlub) {

            var url = "/api/project/booKlub/" + userID;

            return $http.post(url, booKlub)
                .then(function (response) {
                    var booKlub = response.config.data;
                    return booKlub;
                });
        }

        function deleteBooKlub(booKlubID) {

            var url = "/api/project/booKlub/" + booKlubID;

            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function updateBooKlub(booKlubID, booKlub) {

            var url = "/api/project/booKlub/" + booKlubID;

            return $http.put(url, booKlub)
                .then(function (response) {
                    return findBooKlubById(booKlubID);
                });
        }

        function findBooKlubById(booKlubID) {

            var url = "/api/project/booKlub/" + booKlubID;

            return $http.get(url)
                .then(function (response) {
                    var booKlub = response.data;
                    return booKlub;
                });
        }

        function findAllBooKlubs() {

            var url = "/api/project/booKlub";

            return $http.get(url)
                .then(function (response) {
                    var booKlubs = response.data;
                    return booKlubs;
                });
        }
        function findAllBooKlubsForCreator(userID) {

            var url = "/api/project/user/" + userID + "/booKlubs";

            return $http.get(url)
                .then(function (response) {
                    var booKlubs = response.data;
                    return booKlubs;
                });
        }


    }
})();