const API_KEY = 'dc3ad471';
const form = document.getElementById('busqueda');
const inputBuscador = document.getElementById('inputPelicula');
const resultado = document.getElementById('resultado');
const carga = document.getElementById('carga');


// Evento para el botón de búsqueda
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = inputBuscador.value.trim();

  if (!titulo) {
    showError('Escribe el nombre de una película.');
    return;
  }

  resultado.innerHTML = '';
  carga.style.display = 'block';

  try {
    const data = await fetchMovie(titulo);
    carga.style.display = 'none';

    if (data.Response === "False") {
      showError('Película no encontrada, verifique el título e intentelo de nuevo.');
    } else {
      showMovie(data);
    }
  } catch (error) {
    carga.style.display = 'none';
    showError('Error de red o conexión con la API.');
    console.error('Error:', error);
  }
});


const fetchMovie = async (titulo) => {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titulo)}`;
  const response = await fetch(url);
  return await response.json();
}

function showMovie(movie) {
  const card = document.createElement('div');
  card.className = 'tarjetaPelicula';
  card.innerHTML = `
    <div class="imgPelicula">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="Póster de ${movie.Title}" />
    </div>
    <div class="peliculaInformacion">
      <h2>${movie.Title}</h2>
      <ul>
        <li>
          <span>Año: </span>
          <p>${movie.Year}</p>
        </li>
        <li>
          <span>Rating de IMDb: </span>
          <p>${movie.imdbRating}</p>
        </li>
        <li>
          <span>Director: </span>
          <p>${movie.Director}</p>
        </li>
        <li>
          <span>Género: </span>
          <p>${movie.Genre}</p>
        </li>
        <li>
          <span>Clasificación: </span>
          <p>${movie.Rated}</p>
        </li>
        <li>
          <details>
            <summary><span>Sinopsis: </span></summary>
            <p>${movie.Plot}</p>
          </details>
        </li>
      </ul>
    </div>
  `;
  resultado.appendChild(card);
}

function showError(message) {
  resultado.innerHTML = `<p class="error">${message}</p>`;
}
