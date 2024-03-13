// Écouteur d'événement qui attend que le DOM soit entièrement chargé avant d'exécuter les fonctions suivantes.
document.addEventListener("DOMContentLoaded", function () {
    setupEventListeners(); // Initialise les écouteurs d'événements.
    fetchAndDisplayMembers(); // Récupère et affiche les membres depuis l'API.
});

// Fonction pour récupérer et afficher les membres.
function fetchAndDisplayMembers() {
    // Appel à l'API pour récupérer les membres.
    apiService.fetchMembers().then(members => {
        // Sélectionne le corps du tableau où les membres seront affichés.
        const membersTableBody = document.querySelector("#membersTable tbody");
        // Efface le contenu précédent du corps du tableau pour éviter les doublons.
        domUtils.clearTableBody(membersTableBody);
        // Vérifie si la page actuelle est editMember.html pour conditionner l'affichage du bouton d'édition.
        const isEditPage = window.location.pathname.includes('editMember.html');
        // Itère sur chaque membre pour les insérer dans le tableau.
        members.forEach(member => {
            // Insère une ligne dans le tableau pour chaque membre. Inclut un bouton d'édition si sur la page d'édition.
            domUtils.insertMemberRow(membersTableBody, member, isEditPage);
        });
    }).catch(error => {
        // Affiche une erreur dans la console en cas d'échec de la récupération des membres.
        console.error("Échec de la récupération des membres :", error);
    });
}