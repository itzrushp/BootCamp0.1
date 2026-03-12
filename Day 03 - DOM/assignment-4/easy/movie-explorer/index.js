const apiKey = "74s0F8wNSPaigf63WQlxlkwgbcwBjryuqDubhP3a";
const genreUrl = `https://api.watchmode.com/v1/genres/?apiKey=${apiKey}`;

async function getGenres() {
    const response = await fetch(genreUrl);
    const json = await response.json();
    console.log(json);
    // structure is like this :
    //
    //  [
    //   {id: 1, name: 'Action', tmdb_id: 28},
    //   {id: 1, name: 'Action', tmdb_id: 28}, ...
    //  ]
    // 
    const genreNames = json.map(genre => genre.name);
    console.log(genreNames)

    // Fill in the html with genre:
    const list = document.getElementById("listOfGenre");
    genreNames.forEach((g) => {
        // create a div
        const genre = document.createElement('div');
        genre.classList.add('genre');
        genre.classList.add('active');

        genre.addEventListener('click', () => {
            // remove active from all 
            document.querySelectorAll('.genre')
                .forEach(ele => ele.classList.remove('active'));

            // add active to clicked one 
            genre.classList.add('active');

            HandleClick(g); //sends the particular genre clicked
        })
        genre.innerHTML = g;
        console.log(genre);
        list.appendChild(genre);
    })
}
getGenres();


// We get to know the genre of the movies selected thru click 
let selectedGenre = "";
function HandleClick(g) {
    selectedGenre = g;
    console.log(g);
}

// Submit Handling :
function submitHandler() {
    const numberOfMovies = document.getElementById("actualInput").value;

    console.log("Selected Genre : " + selectedGenre + " " + "| Number of Movies : " + numberOfMovies);

    // Store it in local Storage 
    localStorage.setItem('moviesCount', numberOfMovies);
    localStorage.getItem('genre' , selectedGenre);

}
