async function fetchMovies() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/movies');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error al cargar las películas:', error);
        throw error;
    }
}

async function showMovies() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Cargando películas...</p>';
    try {
        const movies = await fetchMovies();
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'card movie-card';
            card.innerHTML = `
                <img src="${movie.attributes.poster || 'placeholder.jpg'}" alt="${movie.attributes.title}">
                <div class="card-content">
                    <h2>${movie.attributes.title || 'Título Desconocido'}</h2>
                    <p class="movie-release">Estreno: ${movie.attributes.release_date || 'Fecha desconocida'}</p>
                    <p class="movie-duration">Duración: ${movie.attributes.running_time || 'Desconocida'}</p>
                    <p class="movie-summary">${movie.attributes.summary || 'Sin resumen disponible'}</p>
                    <div class="movie-rating">
                        <span>★</span>
                        ${movie.attributes.rating || 'N/A'}
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });

        mainContent.innerHTML = '';
        mainContent.appendChild(gridContainer);
    } catch (error) {
        mainContent.innerHTML = '<p>Error al cargar las películas</p>';
    }
}