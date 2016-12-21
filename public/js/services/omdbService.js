angular.module('cinemaNode').service('omdbService', function($http, $q) {

	//Acquire search results for a movie
	this.searchForMovies = title => {
		var deferred = $q.defer();

		var url = "https://www.omdbapi.com/?s=" + title + "&page=1";
		$http.get(url)
		.success(response => {
			var searchResults = response.Search;
			deferred.resolve(searchResults);
		})
		return deferred.promise;
	}

	this.getMovieDetails = id => {
		var deferred = $q.defer();
	    var url = "https://www.omdbapi.com/?i=" + id + "&plot=full&r=json&tomatoes=true";

	    $http.get(url) 
	    .success( response => {
	    	deferred.resolve(response);
	    })
	    return deferred.promise;
	}

})