const apiService = {
  // Récupère la liste de tous les membres
  fetchMembers() {
    return fetch("/api/members").then((response) => response.json());
  },
  // Récupère les détails d'un membre spécifique par son identifiant
  fetchMemberDetails(memberId) {
    return fetch(`/api/members/${memberId}`).then((response) => response.json());
  },
  // Met à jour les données d'un membre spécifique par son identifiant
  updateMember(memberId, memberData) {
    return fetch(`/api/members/${memberId}`, {
      method: "PUT", // Utilise la méthode HTTP PUT pour la mise à jour
      headers: {
        "Content-Type": "application/json", // Spécifie le type de contenu comme JSON
      },
      body: JSON.stringify(memberData), // Convertit les données du membre en chaîne JSON
    }).then((response) => response.json());
  },
  // Ajoute un nouveau membre avec les données fournies
  addMember(memberData) {
    return fetch(`/api/members`, {
      method: "POST", // Utilise la méthode HTTP POST pour l'ajout
      headers: {
        "Content-Type": "application/json", // Spécifie le type de contenu comme JSON
      },
      body: JSON.stringify(memberData), // Convertit les données du membre en chaîne JSON
    }).then((response) => response.json());
  },
  // Supprime un membre spécifique par son identifiant
  deleteMember(memberId) {
    return fetch(`/api/members/${memberId}`, {
        method: "DELETE", // Utilise la méthode HTTP DELETE pour la suppression
    }).then(response => response.json());
},
};
