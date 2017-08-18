(function () {

    angular
        .module("booKlub")
        .controller("profileController", profileController);


    function profileController(userService, $location, user, $timeout, booKlubService) {

        var model = this;

        model.user = user;
        model.userID = user._id;
        model.showSpinner = true;
        model.booKlubs = model.user.booKlubs;
        model.following = model.user.following;
        
        model.logout = logout;
        model.unFollowBooKlub = unFollowBooKlub;
        model.unFollowUser = unFollowUser;

        function init() {
            setTabs();
            model.bookShelf = user.bookShelf;
            $timeout(setCarousel);
        }

        init();

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/login");
                })
        }

        function unFollowBooKlub(booKlubID) {
            userService
                .unFollowBooKlub(model.user._id, booKlubID)
                .then(function (user) {
                    model.errorMessage = "Successfully unfollowed booKlub";
                    model.confMessage = null;

                    return userService.findUserById(model.userID);
                })
                .then(function (user) {
                    model.booKlubs = user.booKlubs;
                })
        }

        function unFollowUser(curUser, otherUserID) {
            userService
                .unFollowUser(curUser, otherUserID)
                .then(function (user) {
                    model.errorMessage = "Successfully unfollowed user";
                    model.confMessage = null;
                    return userService.findUserById(model.userID);
                })
                .then(function (user) {
                    model.following = user.following;
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