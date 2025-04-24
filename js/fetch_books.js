async function fetchBooks() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/books');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error al cargar los libros:', error);
        throw error;
    }
}

async function showBooks() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Cargando libros...</p>';

    try {
        const books = await fetchBooks();
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'card book-card';
            card.innerHTML = `
                <img src="${book.attributes.cover || 'placeholder.jpg'}" alt="${book.attributes.title}">
                <div class="card-content">
                    <h2>${book.attributes.title || 'Título Desconocido'}</h2>
                    <p class="book-author">Autor: ${book.attributes.author || 'Desconocido'}</p>
                    <p class="book-release">Publicado: ${book.attributes.release_date || 'Fecha desconocida'}</p>
                    <p class="book-pages">Páginas: ${book.attributes.pages || 'Desconocido'}</p>
                    <p class="book-summary">${book.attributes.summary || 'Sin resumen disponible'}</p>
                    <div class="book-details">
                        <span class="book-order">Libro #${book.attributes.order || '?'}</span>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });

        mainContent.innerHTML = '';
        mainContent.appendChild(gridContainer);
    } catch (error) {
        mainContent.innerHTML = '<p>Error al cargar los libros</p>';
    }
}