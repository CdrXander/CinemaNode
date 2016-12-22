angular.module('cinemaNode').service('dummyDataService', function() {



	var userMovies = [
	  {
	    imdbID: 'tt0372784',
	    Title: 'Batman Begins',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg',
	    Year: '2005',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt0468569',
	    Title: 'The Dark Knight',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
	    Year: '2008',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt1345836',
	    Title: 'The Dark Knight Rises',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',
	    Year: '2012',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt2313197',
	    Title: 'Batman: The Dark Knight Returns, Part 1',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg',
	    Year: '2012',
	    own: false,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt2166834',
	    Title: 'Batman: The Dark Knight Returns, Part 2',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1Mjk1NTY2NV5BMl5BanBnXkFtZTgwMTA2MDEwNzE@._V1_SX300.jpg',
	    Year: '2013',
	    own: false,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0107290',
	    Title: 'Jurassic Park',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg',
	    Year: '1993',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt0119567',
	    Title: 'The Lost World: Jurassic Park',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg',
	    Year: '1997',
	    own: false,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0163025',
	    Title: 'Jurassic Park III',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZTU1ZWU4ZjUtZDMwYS00MmU4LWI3Y2UtZWVjMWIzODMyOWQ4XkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_SX300.jpg',
	    Year: '2001',
	    own: false,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0369610',
	    Title: 'Jurassic World',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5MTE0MTk3Nl5BMl5BanBnXkFtZTgwMjczMzk2NTE@._V1_SX300.jpg',
	    Year: '2015',
	    own: false,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0080684',
	    Title: 'Star Wars: Episode V - The Empire Strikes Back',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
	    Year: '1980',
	    own: true,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0086190',
	    Title: 'Star Wars: Episode VI - Return of the Jedi',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
	    Year: '1983',
	    own: true,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0076759',
	    Title: 'Star Wars: Episode IV - A New Hope',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZGEzZTExMDEtNjg4OC00NjQxLTk5NTUtNjRkNjA3MmYwZjg1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
	    Year: '1977',
	    own: true,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt2488496',
	    Title: 'Star Wars: The Force Awakens',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
	    Year: '2015',
	    own: false,
	    watch: true,
	    seen: true
	  },
	  {
	    imdbID: 'tt0120915',
	    Title: 'Star Wars: Episode I - The Phantom Menace',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZGIwMzAtZTBkMS00M2JiLTk2MDctM2FlNTQ2OWYwZDZkXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
	    Year: '1999',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt0121766',
	    Title: 'Star Wars: Episode III - Revenge of the Sith',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',
	    Year: '2005',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt0121765',
	    Title: 'Star Wars: Episode II - Attack of the Clones',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDRkYzA4OGYtOTBjYy00YzFiLThhYmYtMWUzMDBmMmZkM2M3XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
	    Year: '2002',
	    own: true,
	    watch: false,
	    seen: true
	  },
	  {
	    imdbID: 'tt3748528',
	    Title: 'Rogue One: A Star Wars Story',
	    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',
	    Year: '2016',
	    own: false,
	    watch: true,
	    seen: true
	  }
	]	

	this.getDummyData = function() {
		return userMovies;
	}
}) 



