function showProfile() {
    const mainContent = document.getElementById('main-content');
    
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';
    
    profileContainer.innerHTML = `
        <div class="profile-header">
            <h1>Potter DB API</h1>
            <h2>Created by Daniel Stock</h2>
        </div>
        
        <div class="profile-image">
            <img src="https://api.potterdb.com/assets/potterdb-logo.png" alt="Potter DB Logo">
        </div>
        
        <div class="profile-description">
            <p>
                PotterDB es una API RESTful que proporciona datos extensivos sobre el universo 
                de Harry Potter, incluyendo información sobre personajes, libros, películas y hechizos. 
                Esta API es de uso gratuito y está diseñada para desarrolladores y fans 
                que deseen integrar datos de Harry Potter en sus aplicaciones.
            </p>
        </div>
        
        <div class="profile-footer">
            <a href="https://github.com/danielstock" target="_blank">@danielstock</a>
            <span class="version">v1.0.1</span>
        </div>
    `;
    
    mainContent.innerHTML = '';
    mainContent.appendChild(profileContainer);
}