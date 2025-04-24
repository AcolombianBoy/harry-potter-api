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