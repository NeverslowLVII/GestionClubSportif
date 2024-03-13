// Fonction pour ajouter la barre de navigation
function addNavbar() {
    // HTML pour la barre de navigation
    const navbarHTML = `
    <nav class="flex items-center justify-between flex-wrap bg-gray-900 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <span class="font-semibold text-xl tracking-tight">KICKERS CLUB DE QUIMPER</span>
        </div>
        <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
                <a href="index.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    ACCUEIL
                </a>
                <a href="members.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    VOIR LES MEMBRES
                </a>
                <a href="addMember.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    AJOUTER UN MEMBRE
                </a>
                <a href="editMember.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                    MODIFIER UN MEMBRE
                </a>
            </div>
        </div>
    </nav>`;
    // Insère le HTML de la barre de navigation dans l'élément 'header'
    document.querySelector('header').innerHTML = navbarHTML;
}

// Fonction pour ajouter le pied de page
function addFooter() {
    // HTML pour le pied de page
    const footerHTML = `
    <footer class="text-gray-700 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <span class="ml-3 text-xl">&copy; 2024 Kickers Club de Quimper</span>
            </a>
        </div>
    </footer>`;
    // Insère le HTML du pied de page dans l'élément 'footer'
    document.querySelector('footer').innerHTML = footerHTML;
}

// Écouteur d'événement pour exécuter les fonctions après le chargement complet du DOM
document.addEventListener('DOMContentLoaded', function() {
    addNavbar(); // Appelle la fonction pour ajouter la barre de navigation
    addFooter(); // Appelle la fonction pour ajouter le pied de page
});