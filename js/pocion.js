
function mostrarPocion(){
    const app = document.getElementById("app");
    app.innerHTML = "pocion";
}



async function fetchPotions() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/potions');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching potions:', error);
        throw error;
    }
}

async function displayPotions() {
    const container = document.getElementById('show_potions');
    container.innerHTML = '<p>Cargando pociones...</p>';

    try {
        const potions = await fetchPotions();
        container.innerHTML = '';

        potions.forEach(potion => {
            const potionCard = document.createElement('div');
            potionCard.classList.add('potion-card');
            potionCard.innerHTML = `
                <h2>${potion.attributes.name || 'Nombre desconocido'}</h2>
                ${potion.attributes.image ? `<img src="${potion.attributes.image}" alt="${potion.attributes.name}">` : ''}
                <p>Efecto: ${potion.attributes.effect || 'Sin descripción'}</p>
                <p>Ingredientes: ${potion.attributes.ingredients ? potion.attributes.ingredients.join(', ') : 'Desconocidos'}</p>
            `;
            container.appendChild(potionCard);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar las pociones</p>';
    }
}

// Llamada automática al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    displayPotions();
});
