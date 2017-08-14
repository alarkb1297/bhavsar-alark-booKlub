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
            "findAllBooKlubs" : findAllBooKlubs
        };
        return api;


        function createBooKlub(booKlub) {

            var url = "/api/project/booKlub";

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
                    var booKlub = reponse.data;
                    return booKlub;
                });
        }

        function findAllBooKlubs() {

            var url = "/api/project/booKlub/";

            return $http.get(url)
                .then(function (response) {
                    var booKlub = reponse.data;
                    return booKlub;
                });
        }

    }
})();