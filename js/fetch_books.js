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

async function displayBooks(filter = '') {
    const container = document.getElementById('show_characters');
    container.innerHTML = '<p>Cargando libros...</p>';
    
    try {
        const books = await fetchBooks();
        container.innerHTML = '';
        
        // Apply filter if provided
        const filteredBooks = books.filter(book => 
            book.attributes.title.toLowerCase().includes(filter.toLowerCase()) ||
            book.attributes.author.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredBooks.length === 0) {
            container.innerHTML = '<p>No se encontraron libros con ese filtro.</p>';
            return;
        }

        filteredBooks.forEach(book => {
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

// Add event listener for filtering books
function setupBookFilters() {
    const filterInput = document.getElementById('book_filter');
    const filterButton = document.getElementById('apply_filter');

    filterButton.addEventListener('click', () => {
        const filterValue = filterInput.value.trim();
        displayBooks(filterValue);
    });
}

// Initialize filters along with books display
document.addEventListener('DOMContentLoaded', () => {
    setupBookFilters();
    displayBooks(); // Display all books by default
});
