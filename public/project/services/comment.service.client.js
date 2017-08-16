(function () {

    angular
        .module("booKlub")
        .factory("booKlubService", booKlubService);

    function booKlubService($http) {

        var api = {
            "createComment" : createComment,
            "updateComment" : updateComment,
            "deleteComment" : deleteComment,
            "findCommentById" : findCommentById,
            "findAllCommentsForPost" : findAllCommentsForPost
        };
        return api;


        function createComment(userID, postID, comment) {

            var url = "/api/project/user/" + userID + "/booKlub/post/" + postID + "/comment";

            return $http.post(url, comment)
                .then(function (response) {
                    var comment = response.config.data;
                    return comment;
                });
        }

        function deleteComment(commentID) {

            var url = "/api/project/booKlub/post/comment/" + commentID;

            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function updateComment(commentID, comment) {

            var url = "/api/project/booKlub/post/comment/" + commentID;

            return $http.put(url, comment)
                .then(function (response) {
                    return findByCommentId(commentID);
                });
        }

        function findCommentById(commentID) {

            var url = "/api/project/booKlub/post/comment/" + commentID;

            return $http.get(url)
                .then(function (response) {
                    var comment = response.data;
                    return comment;
                });
        }

        function findAllCommentsForPost(postID) {

            var url = "/api/project/booKlub/post/" + postID + "/comment";

            return $http.get(url)
                .then(function (response) {
                    var comments = response.data;
                    return comments;
                });
        }

    }
})();