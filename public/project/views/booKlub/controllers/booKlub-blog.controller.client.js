(function () {

    angular
        .module("booKlub")
        .controller("booKlubBlogController", booKlubBlogController);


    function booKlubBlogController($routeParams, user, postService, commentService, $sce, booKlubService) {

        var model = this;

        model.user = user;
        model.booKlubID = $routeParams.booKlubID;

        model.createPost = createPost;
        model.createComment = createComment;
        model.trustHtmlContent = trustHtmlContent;


        function init() {

            postService
                .findAllPostsForBooKlub(model.booKlubID)
                .then(function (posts) {
                    model.posts = posts;
                });

            booKlubService
                .findBooKlubById(model.booKlubID)
                .then(function(booKlub) {
                    model.booKlub = booKlub;
                });

            if (user) {
                model.user = user;
                model.userID = model.user._id;
            }
        }

        init();


        function createPost(post) {

            if (user) {
                postService
                    .createPost(model.userID, model.booKlubID, post)
                    .then(function (post) {
                        model.confMessage = "Successfully created post";
                        return postService.findAllPostsForBooKlub(model.booKlubID);
                    })
                    .then(function (posts) {
                        model.posts = posts;
                    })
            } else {
                location.url("/login")
            }
        }

        function createComment(comment, postID) {

            commentService
                .createComment(model.userID, postID, comment)
                .then(function (comment) {
                    return postService
                        .findAllPostsForBooKlub(model.booKlubID);
                })
                .then(function (posts) {
                    model.posts = posts;
                })
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

    }

})();