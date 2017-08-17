(function () {

    angular
        .module("booKlub")
        .controller("searchController", searchController);

    function searchController(bookService, $routeParams, $location, user, $timeout) {

        var model = this;

        model.searchBookByTitle = searchBookByTitle;
        model.searchBookByAuthor = searchBookByAuthor;

        model.user = user;
        model.showSpinner = true;

        model.searchOption = $routeParams.searchOption;
        model.searchQuery = $routeParams.searchQuery;
        model.searchResultDisplayText = model.searchQuery;

        function init() {

            if (model.searchOption !== null) {
                if (model.searchOption === "title") {
                    searchBookByTitle(model.searchQuery);
                }
                if (model.searchOption === "author") {
                    searchBookByAuthor(model.searchQuery);
                }
            }

            bookService
                .findAllBooks()
                .then(function (books) {
                    model.allBooks = books;
                    $timeout(setCarousel);
                })

        }

        init();


        function searchBookByTitle(bookTitle) {

            if (bookTitle) {

                model.searchQuery = bookTitle;
                $location.url("/search/title/" + model.searchQuery);

                model.errorMessage = null;
                bookService
                    .searchBookByTitle(model.searchQuery)
                    .then(function (response) {
                        var books = response.items;
                        if (!books) {
                            model.errorMessage = "No results found";
                        } else {
                            model.books = books;
                        }
                    });
            } else {
                model.errorMessage = "Please enter a title value";
            }
        }

        function searchBookByAuthor(bookAuthor) {

            if (bookAuthor) {

                model.searchQuery = bookAuthor;
                $location.url("/search/author/" + model.searchQuery);

                model.errorMessage = null;
                bookService
                    .searchBookByAuthor(model.searchQuery)
                    .then(function (response) {
                        var books = response.items;
                        if (!books) {
                            model.errorMessage = "No results found";
                        } else {
                            model.books = books;
                        }
                    });
            } else {
                model.errorMessage = "Please enter an author value";
            }
        }

        function setCarousel() {
            $(document).ready(function () {
                $('.slick-carousel-search').not('.slick-initialized').slick({
                    dots: false,
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
                                infinite: true
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
    }
})();
