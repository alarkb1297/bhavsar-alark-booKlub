(function () {

    angular
        .module("booKlub")
        .controller("userProfileController", userProfileController);


    function userProfileController(userService, $location, user, $routeParams, $timeout) {

        var model = this;

        model.curUser = user;
        model.otherUserID = $routeParams.userID;

        setTabs();

        model.curUserFollowsOtherUser = curUserFollowsOtherUser;
        model.followUser = followUser;
        model.unFollowUser = unFollowUser;
        model.logout = logout;

        function init() {

            if(model.curUser && model.curUser._id === model.otherUserID) {
                $location.path("/profile")
            } else {
                userService
                    .findUserById(model.otherUserID)
                    .then(function (otherUser) {
                        model.bookShelf = otherUser.bookShelf;
                        $timeout(setCarousel);
                        model.booKlubs = otherUser.booKlubs;
                        model.following = otherUser.following;
                        model.followers = otherUser.followers;
                        model.user = otherUser;
                        if (model.curUser) {
                            model.curUserFollowsOtherUser(model.curUser);
                        }
                    })
            }


        }
        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                })
        }

        function curUserFollowsOtherUser(curUser) {

            model.followsUser = false;


            for (var i = 0; i < curUser.following.length; i++) {
                if (curUser.following[i]._id === model.otherUserID) {
                    model.followsUser = true;
                    break;
                }
            }
        }

        function followUser(curUser, otherUserID) {
            userService
                .followUser(curUser, otherUserID)
                .then(function (user) {
                    model.confMessage = "User successfully followed";
                    model.errorMessage = null;
                    model.followsUser = true;
                })
        }

        function unFollowUser(curUser, otherUserID) {
            userService
                .unFollowUser(curUser, otherUserID)
                .then(function (user) {
                    model.errorMessage = "User successfully unfollowed";
                    model.confMessage = null;
                    model.followsUser = false;
                })
        }

        function setCarousel() {
            $(document).ready(function () {
                $('.slick-carousel').not('.slick-initialized').slick({
                    dots: true,
                    autoplay: true,
                    swipeToSlide: true,
                    centerPadding: '60px',
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            });
            model.showSpinner = false;
        }

        function setTabs() {
            $(document)
                .ready(function() {
                    $(".btn-pref .btn").click(function () {
                        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
                        // $(".tab").addClass("active"); // instead of this do the below
                        $(this).removeClass("btn-default").addClass("btn-primary");
                    });
                });
        }
    }

})();