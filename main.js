const searchList = document.querySelector('.movieList');
const btnDetails = document.getElementById('btnDetails');
//for movie searching
async function loadMovies(search) {
    const movieTitle = document.getElementById('inputSearch').value;
    if (movieTitle) {
        const URL = `https://omdbapi.com/?s=${movieTitle}&page=1&apikey=fc1fef96`;
        const res = await fetch(`${URL}`);
        const data = await res.json();
        if (data.Response == "True") displayMovieList(data.Search);
    } else {
        const URL = `https://omdbapi.com/?s=${search}&page=1&apikey=fc1fef96`;
        const res = await fetch(`${URL}`);
        const data = await res.json();
        if (data.Response == "True") displayMovieList(data.Search);
    }
}
//display movie list
function displayMovieList(movies) {
    searchList.innerHTML = '';
    for (let i = 0; i < movies.length; i++) {
        const movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('movie');
        const moviePoster = movies[i].Poster;

        movieListItem.innerHTML = `
        <div class="movie">
                <img src="${moviePoster}" alt="" class="poster" onmouseover="onMouseOver(this)" onmouseout="onMouserOut(this)">
                <div class="title">${movies[i].Title}</div>
                <div class="description">${movies[i].Type}</div>
                <div class="year">${movies[i].Year}</div>
                <div class="details">
                    <button id="btnDetails" onClick="loadMovieDetails()">More details</button>
                </div>
            </div>
        `;
        searchList.appendChild(movieListItem);
    }
}
//for icon play on poster
function onMouseOver(poster) {
    poster.style.cursor = "pointer";
    poster.style.opacity = '0.5'
}
function onMouserOut(poster) {
    poster.style.cursor = "pointer";
    poster.style.opacity = '1'
}
//loading details of movie
async function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.movie');
    searchListMovies.forEach(movie => {
        movie.onclick = async () => {
            document.getElementById('inputSearch').value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        }
    });
}
//display movie details
function displayMovieDetails(details) {
    document.querySelector('.movieDetail').classList.remove('hide');

    const arr = details.Ratings;
    const ratingSource = arr.map(object => object.Source);
    const ratingValue = arr.map(object => object.Value);

    if(arr.length > 0){
        document.querySelector('.movieDetail').innerHTML = `
        <img src = "${details.Poster}" alt = "movie poster" class="moviePoster">
        <div class="close">x</div>
        <div class="movieDescription">
            <div class="movieTitle">${details.Title}</div>
            <div class="movieYearAndType">${details.Rated} ${details.Year} ${details.Genre}</div>
            <div class="about">${details.Plot}</div>
            <div class="titelsAbout"><b>Written by:</b> ${details.Writer}</div>
            <div class="titelsAbout"><b>Directed by:</b> ${details.Director}</div>
            <div class="titelsAbout"><b>Starring by:</b> ${details.Actors}</div>
            <div class="titelsAbout"><b>BoxOffice:</b> ${details.BoxOffice}</div>
            <div class="titelsAbout"><b>Awards:</b> ${details.Awards}</div>
            <div class="titelsAbout"><b>Ratings:</b></div>
            <div class="values">
                <div class="rateSource">
                <div>${ratingSource[0]} ${ratingValue[0]}</div>
                <div>${ratingSource[1]} ${ratingValue[1]}</div>
                <div>${ratingSource[2]} ${ratingValue[2]}</div>
                </div>
             </div>
             <div class="online">
                <div id="watch">Watch now</div>
                <img src="./images/play.png" alt="" class="play">
            </div>
        </div>
    `;
    } else {
        document.querySelector('.movieDetail').innerHTML = `
        <img src = "${details.Poster}" alt = "movie poster" class="moviePoster">
        <div class="close">x</div>
        <div class="movieDescription">
            <div class="movieTitle">${details.Title}</div>
            <div class="movieYearAndType">${details.Rated} ${details.Year} ${details.Genre}</div>
            <div class="about">${details.Plot}</div>
            <div class="titelsAbout"><b>Written by:</b> ${details.Writer}</div>
            <div class="titelsAbout"><b>Directed by:</b> ${details.Director}</div>
            <div class="titelsAbout"><b>Starring by:</b> ${details.Actors}</div>
            <div class="titelsAbout"><b>BoxOffice:</b> ${details.BoxOffice}</div>
            <div class="titelsAbout"><b>Awards:</b> ${details.Awards}</div>
            <div class="titelsAbout"><b>Ratings:</b></div>
            <div class="values">
                <div class="rateSource"></div>
             </div>
             <div class="online">
                <div id="watch">Watch now</div>
                <img src="./images/play.png" alt="" class="play">
            </div>
        </div>
    `;
    }
    //shows release modal box
    document.querySelector('.online').addEventListener('click', () =>{ 
        document.querySelector('.watchMovie').classList.remove('hide')
    });
    //closes release modal box
    document.querySelector('.closeWatchMovie').addEventListener('click', () => {
        document.querySelector('.watchMovie').classList.add('hide');
    });
    //closes movie detail box
    document.querySelector('.close').addEventListener('click', () =>{ 
        document.querySelector('.movieDetail').classList.add('hide')
    });
}
