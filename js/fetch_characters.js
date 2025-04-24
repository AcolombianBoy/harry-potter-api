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

async function displayCharacters() {
    try {
        const characters = await fetchCharacters();
        const characterContainer = document.getElementById('show_characters');
        
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.innerHTML = `
                <h2>${character.attributes.name}</h2>
                ${character.attributes.image ? `<img src="${character.attributes.image}" alt="${character.attributes.name}">` : ''}
                <p>${character.attributes.house || 'Casa desconocida'}</p>
            `;
            characterContainer.appendChild(characterCard);
        });
    } catch (error) {
        console.error('Error displaying characters:', error);
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', displayCharacters);