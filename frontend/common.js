function addNavbar() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="index.html">Kickers Club de Quimper</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Basculer la navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">Accueil <span class="sr-only">(actuel)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="members.html">Voir les Membres</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="addMember.html">Ajouter un Membre</a>
                </li>
            </ul>
        </div>
    </nav>`;
    document.querySelector('header').innerHTML = navbarHTML;
}

function addFooter() {
    const footerHTML = `
    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container">
            <span class="text-muted">&copy; 2024 Kickers Club de Quimper</span>
        </div>
    </footer>`;
    document.querySelector('footer').innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    addNavbar();
    addFooter();
});