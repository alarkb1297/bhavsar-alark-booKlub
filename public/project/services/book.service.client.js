(function () {

    angular
        .module("booKlub")
        .factory("bookService", bookService);

    function bookService($http) {

        var apiKey = "AIzaSyDo4no47rHc3IwKKdrSYkKG56o1dhOjwjM";

        var api = {
            "searchBookByTitle": searchBookByTitle,
            "searchBookByAuthor": searchBookByAuthor,
            "searchBookByVolumeId": searchBookByVolumeId,
            "createBook" : createBook,
            "updateBook" : updateBook,
            "deleteBook" : deleteBook,
            "findBookById" : findBookById
        };
        return api;

        function searchBookByVolumeId(volumeID) {

            var url = "https://www.googleapis.com/books/v1/volumes/" + volumeID +"?key=" + apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchBookByTitle(bookTitle) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + bookTitle + "&key=" + apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchBookByAuthor(bookAuthor) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:" + bookAuthor + "&key=" + apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createBook(userID, book) {

            var url = "/api/project/user/" + userID + "/book";

            return $http.post(url, book)
                .then(function (response) {
                    var book = response.config.data;
                    return book;
                });
        }

        function deleteBook(bookID) {

            var url = "/api/project/book/" + bookID;

            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function updateBook(bookID, book) {

            var url = "/api/project/book/" + bookID;

            return $http.put(url, book)
                .then(function (response) {
                    return findBookById(bookID);
                });
        }

        function findBookById(bookID) {

            var url = "/api/project/book/" + bookID;

            return $http.get(url)
                .then(function (response) {
                    var book = reponse.data;
                    return book;
                });
        }

    }

})();