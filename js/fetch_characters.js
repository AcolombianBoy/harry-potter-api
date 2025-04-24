// Funciones de fetch
async function fetchCharacters() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/characters');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

async function fetchMovies() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/movies');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

async function fetchBooks() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/books');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

// Funciones de display
async function displayCharacters() {
    const characterContainer = document.getElementById('show_characters');
    characterContainer.innerHTML = '<p>Cargando personajes...</p>';
    
    try {
        const characters = await fetchCharacters();
        characterContainer.innerHTML = '';
        
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.innerHTML = `
                <h2>${character.attributes.name || 'Nombre desconocido'}</h2>
                ${character.attributes.image ? `<img src="${character.attributes.image}" alt="${character.attributes.name}">` : ''}
                <p>${character.attributes.house || 'Casa desconocida'}</p>
            `;
            characterContainer.appendChild(characterCard);
        });
    } catch (error) {
        characterContainer.innerHTML = '<p>Error al cargar los personajes</p>';
    }
}

async function displayRandomCharacter() {
    const characterContainer = document.getElementById('show_characters');
    characterContainer.innerHTML = '<p>Cargando personaje aleatorio...</p>';
    
    try {
        const characters = await fetchCharacters();
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        
        characterContainer.innerHTML = `
            <div class="character-card">
                <h2>${randomCharacter.attributes.name || 'Nombre desconocido'}</h2>
                ${randomCharacter.attributes.image ? `<img src="${randomCharacter.attributes.image}" alt="${randomCharacter.attributes.name}">` : ''}
                <p>${randomCharacter.attributes.house || 'Casa desconocida'}</p>
                <p>${randomCharacter.attributes.wiki || ''}</p>
            </div>
        `;
    } catch (error) {
        characterContainer.innerHTML = '<p>Error al cargar el personaje aleatorio</p>';
    }
}

async function displayMovies() {
    const container = document.getElementById('show_characters');
    container.innerHTML = '<p>Cargando películas...</p>';
    
    try {
        const movies = await fetchMovies();
        container.innerHTML = '';
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('character-card');
            movieCard.innerHTML = `
                <h2>${movie.attributes.title || 'Título desconocido'}</h2>
                ${movie.attributes.poster ? `<img src="${movie.attributes.poster}" alt="${movie.attributes.title}">` : ''}
                <p>Fecha: ${movie.attributes.release_date || 'Desconocida'}</p>
            `;
            container.appendChild(movieCard);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar las películas</p>';
    }
}

async function displayBooks() {
    const container = document.getElementById('show_characters');
    container.innerHTML = '<p>Cargando libros...</p>';
    
    try {
        const books = await fetchBooks();
        container.innerHTML = '';
        
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('character-card');
            bookCard.innerHTML = `
                <h2>${book.attributes.title || 'Título desconocido'}</h2>
                ${book.attributes.cover ? `<img src="${book.attributes.cover}" alt="${book.attributes.title}">` : ''}
                <p>Autor: ${book.attributes.author || 'Desconocido'}</p>
            `;
            container.appendChild(bookCard);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar los libros</p>';
    }
}

function displayProfile() {
    const container = document.getElementById('show_characters');
    container.innerHTML = '<p>Sección de perfil en construcción</p>';
}

// Manejador del menú
function handleMenu() {
    const menuItems = document.querySelectorAll('.menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', async () => {
            // Remover clase active de todos los items
            menuItems.forEach(i => i.classList.remove('active'));
            // Agregar clase active al item seleccionado
            item.classList.add('active');
            
            // Manejar la sección seleccionada
            const section = item.dataset.section;
            switch(section) {
                case 'todos':
                    await displayCharacters();
                    break;
                case 'conocer':
                    await displayRandomCharacter();
                    break;
                case 'peliculas':
                    await displayMovies();
                    break;
                case 'libros':
                    await displayBooks();
                    break;
                case 'perfil':
                    displayProfile();
                    break;
            }
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    handleMenu();
    displayCharacters(); // Mostrar todos los personajes por defecto
});