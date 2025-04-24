async function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categorySelect').value;
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = '<p>Buscando...</p>';

    try {
        const response = await fetch(`https://api.potterdb.com/v1/${category}`);
        const data = await response.json();
        const items = data.data;

        // Filtrar resultados
        const filteredItems = items.filter(item => {
            const name = item.attributes.name || item.attributes.title || '';
            return name.toLowerCase().includes(searchTerm);
        });

        // Mostrar resultados
        displaySearchResults(filteredItems, category);
    } catch (error) {
        mainContent.innerHTML = '<p>Error al realizar la búsqueda</p>';
        console.error('Error:', error);
    }
}

function displaySearchResults(items, category) {
    const mainContent = document.getElementById('main-content');
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    if (items.length === 0) {
        mainContent.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Personalizar contenido según la categoría
        switch(category) {
            case 'characters':
                card.innerHTML = `
                    <img src="${item.attributes.image || 'placeholder.jpg'}" alt="${item.attributes.name}">
                    <div class="card-content">
                        <h2>${item.attributes.name}</h2>
                        <p>${item.attributes.house || 'Casa desconocida'}</p>
                    </div>
                `;
                break;
            case 'books':
                card.innerHTML = `
                    <img src="${item.attributes.cover || 'placeholder.jpg'}" alt="${item.attributes.title}">
                    <div class="card-content">
                        <h2>${item.attributes.title}</h2>
                        <p>${item.attributes.author || 'Autor desconocido'}</p>
                    </div>
                `;
                break;
            // ... añadir casos para otras categorías
        }
        
        gridContainer.appendChild(card);
    });

    mainContent.innerHTML = '';
    mainContent.appendChild(gridContainer);
}

// Event listener para buscar al presionar Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});