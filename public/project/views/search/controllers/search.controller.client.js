(function () {

    angular
        .module("booKlub")
        .controller("searchController", searchController);

    function searchController(bookService, $routeParams, $location, user) {

        var model = this;

        model.searchBookByTitle = searchBookByTitle;
        model.searchBookByAuthor = searchBookByAuthor;

        model.user = user;

        model.searchOption = $routeParams.searchOption;
        model.searchQuery = $routeParams.searchQuery;

        function init() {

            if (model.searchOption !== null) {
                if (model.searchOption === "title") {
                    searchBookByTitle(model.searchQuery);
                }
                if (model.searchOption === "author") {
                    searchBookByAuthor(model.searchQuery);
                }
            }

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
    }
})();
