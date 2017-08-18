(function () {

    angular
        .module("booKlub")
        .factory("postService", postService);

    function postService($http) {

        var api = {
            "createPost" : createPost,
            "updatePost" : updatePost,
            "deletePost" : deletePost,
            "findByPostId" : findByPostId,
            "findAllPostsForBooKlub" : findAllPostsForBooKlub
        };
        return api;


        function createPost(userID, booKlubID, post) {

            var url = "/api/project/user/" + userID + "/booKlub/" + booKlubID;

            return $http.post(url, post)
                .then(function (response) {
                    var post = response.config.data;
                    return post;
                });
        }

        function deletePost(postID) {

            var url = "/api/project/booKlub/post/" + postID;

            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function updatePost(postID, post) {

            var url = "/api/project/booKlub/post/" + postID;

            return $http.put(url, post)
                .then(function (response) {
                    return findByPostId(postID);
                });
        }

        function findByPostId(postID) {

            var url = "/api/project/booKlub/post/" + postID;

            return $http.get(url)
                .then(function (response) {
                    var post = response.data;
                    return post;
                });
        }

        function findAllPostsForBooKlub(booKlubID) {

            var url = "/api/project/booKlub/" + booKlubID + "/posts";

            return $http.get(url)
                .then(function (response) {
                    var posts = response.data;
                    return posts;
                });
        }

    }
})();