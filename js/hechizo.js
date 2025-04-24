function mostrarHechizos(){
    const app = document.getElementById("app");
    app.innerHTML = "hechizos";
}


async function fetchSpells() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/spells');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching spells:', error);
        throw error;
    }
}

async function displaySpells() {
    const container = document.getElementById('show_spells');
    container.innerHTML = '<p>Cargando hechizos...</p>';

    try {
        const spells = await fetchSpells();
        container.innerHTML = '';

        spells.forEach(spell => {
            const spellCard = document.createElement('div');
            spellCard.classList.add('spell-card');
            spellCard.innerHTML = `
                <h2>${spell.attributes.name || 'Nombre desconocido'}</h2>
                <p>Descripción: ${spell.attributes.description || 'Sin descripción'}</p>
                <p>Efecto: ${spell.attributes.effect || 'Desconocido'}</p>
                <p>Encantamiento: <strong>${spell.attributes.incantation || 'No disponible'}</strong></p>
            `;
            container.appendChild(spellCard);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar los hechizos</p>';
    }
}

// Llamada automática al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    displaySpells();
});
