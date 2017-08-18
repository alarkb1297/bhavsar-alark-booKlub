(function () {

    angular
        .module("booKlub")
        .controller("postEditController", postEditController);


    function postEditController(user, postService, $routeParams) {

        var model = this;

        model.user = user;
        model.userID = user._id;

        model.booKlubID = $routeParams.booKlubID;
        model.postID = $routeParams.postID;

        model.updatePost = updatePost;

        function init() {

            postService
                .findByPostId(model.postID)
                .then(function (post) {
                    model.post = post;
                })
        }
        init();


        function updatePost(post) {
            postService
                .updatePost(model.postID, post)
                .then(function (post) {
                    model.post = post;
                    model.confMessage = "Successfully updated post"
                })
        }

    }

})();