async function fetchSpells() {
    try {
        const response = await fetch('https://api.potterdb.com/v1/spells');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error al cargar los hechizos:', error);
        throw error;
    }
}

async function showSpells() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<p>Cargando hechizos...</p>';

    try {
        const spells = await fetchSpells();
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        spells.forEach(spell => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-content">
                    <h2>${spell.attributes.name || 'Hechizo Desconocido'}</h2>
                    <p class="spell-type">Tipo: ${spell.attributes.category || 'Desconocido'}</p>
                    <p class="spell-effect">Efecto: ${spell.attributes.effect || 'Desconocido'}</p>
                    ${spell.attributes.hand ? `<p class="spell-hand">Movimiento de varita: ${spell.attributes.hand}</p>` : ''}
                    ${spell.attributes.light ? `<p class="spell-light">Luz: ${spell.attributes.light}</p>` : ''}
                </div>
            `;
            gridContainer.appendChild(card);
        });

        mainContent.innerHTML = '';
        mainContent.appendChild(gridContainer);
    } catch (error) {
        mainContent.innerHTML = '<p>Error al cargar los hechizos</p>';
    }
}