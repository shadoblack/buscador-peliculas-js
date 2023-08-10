// Obtener el botón de búsqueda y agregar un evento de clic
document.getElementById('searchButton').addEventListener('click', searchMovies);

// Definir la clave de API y las URL base
let api_key = 'db41d0835f044a73cb88dcda1347fb52';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w200';

// Obtener el contenedor de resultados
let resultContainer = document.getElementById('results');

// Función para buscar películas
function searchMovies() {
  // Mostrar mensaje de carga
  resultContainer.innerHTML = 'Cargando...';

  // Obtener el valor del campo de búsqueda
  let searchInput = document.getElementById('searchInput').value;

  // Realizar la solicitud a la API
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results));
}

// Función para mostrar las películas
function displayMovies(movies) {
  // Limpiar el contenedor de resultados
  resultContainer.innerHTML = '';
  
  // Verificar si no se encontraron resultados
  if (movies.length === 0) {
    resultContainer.innerHTML = '<p>No se encontraron resultados</p>';
    return;
    }

  // Iterar sobre las películas y crear elementos HTML para cada una
    movies.forEach(movie => {
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    let title = document.createElement('h2');
    title.textContent = movie.title;
    
    let releaseDate = document.createElement('p');
    releaseDate.textContent = 'Fecha de estreno: ' + movie.release_date;

    let overview = document.createElement('p');
    overview.textContent = movie.overview;

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement('img');
    poster.src = posterPath;

    // Agregar los elementos al contenedor de la película
    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    // Agregar la película al contenedor de resultados
    resultContainer.appendChild(movieDiv);
    });
}