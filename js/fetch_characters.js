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

async function showCharacters() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Cargando personajes...</p>';

    try {
        const characters = await fetchCharacters();
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${character.attributes.image || 'placeholder.jpg'}" alt="${character.attributes.name}">
                <div class="card-content">
                    <h2>${character.attributes.name}</h2>
                    <p>${character.attributes.house || 'Casa desconocida'}</p>
                </div>
            `;
            gridContainer.appendChild(card);
        });

        mainContent.innerHTML = '';
        mainContent.appendChild(gridContainer);
    } catch (error) {
        mainContent.innerHTML = '<p>Error al cargar los personajes</p>';
    }
}