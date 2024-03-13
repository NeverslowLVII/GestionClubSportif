// Gestionnaire d'événements pour l'application

// Configuration des écouteurs d'événements
function setupEventListeners() {
  // Récupération et gestion de l'événement de soumission du formulaire d'édition de membre
  const editMemberForm = document.getElementById("editMemberForm");
  if (editMemberForm) {
    editMemberForm.addEventListener("submit", handleEditMemberSubmit);
  }

  // Récupération et gestion de l'événement de clic sur le bouton de fermeture de modal
  const closeModalButton = document.querySelector(".btn-secondary");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", handleCloseModal);
  }

  // Récupération et gestion de l'événement de soumission du formulaire d'ajout de membre
  const addMemberForm = document.getElementById("addMemberForm");
  if (addMemberForm) {
    addMemberForm.addEventListener("submit", handleAddMemberSubmit);
  }

  // Récupération et gestion de l'événement de clic sur le bouton de suppression de membre
  const deleteMemberButton = document.getElementById("deleteMemberButton");
  if (deleteMemberButton) {
    deleteMemberButton.addEventListener("click", handleDeleteMember);
  }
}

// Gestion de la soumission du formulaire d'édition de membre
function handleEditMemberSubmit(event) {
  event.preventDefault(); // Empêche la soumission standard du formulaire
  if (!validateMemberForm()) return; // Arrête la soumission si la validation échoue
  // Récupération des données du formulaire
  const memberId = document.getElementById("memberId").value;
  const memberData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    position: document.getElementById("position").value,
    email: document.getElementById("email").value,
    isMember: document.getElementById("isMember").checked,
  };

  // Envoi des données mises à jour au serveur
  fetch(`/api/members/${memberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Fermeture de la modal après la mise à jour réussie
      handleCloseModal();
      // Rafraîchissement de la liste des membres
      fetchAndDisplayMembers();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Gestion de la soumission du formulaire d'ajout de membre
function handleAddMemberSubmit(event) {
  event.preventDefault(); // Empêche la soumission standard du formulaire
  if (!validateMemberForm()) return; // Arrête la soumission si la validation échoue
  // Récupération des données du formulaire
  const memberData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    position: document.getElementById("position").value,
    email: document.getElementById("email").value,
    isMember: document.getElementById("isMember").checked,
  };

  // Envoi des données du nouveau membre au serveur
  apiService
    .addMember(memberData)
    .then((data) => {
      console.log("Member added successfully:", data);
    })
    .catch((error) => {
      console.error("Error adding member:", error);
    });
}

// Gestion de la suppression d'un membre
function handleDeleteMember() {
    const memberId = document.getElementById("memberId").value;
    if (!memberId) {
        console.error("Member ID is missing.");
        return;
    }
    // Appel au service API pour supprimer le membre
    apiService.deleteMember(memberId)
        .then(() => {
            console.log("Member deleted successfully");
            handleCloseModal(); // Fermeture de la modal
            fetchAndDisplayMembers(); // Rafraîchissement de la liste des membres
        })
        .catch(error => {
            console.error("Error deleting member:", error);
        });
}

// Validation du formulaire de membre
function validateMemberForm() {
  const age = document.getElementById("age").value;
  const ageError = document.getElementById("age-error");
  // Vérification de la validité de l'âge
  if (age < 18 || age > 60) {
    ageError.textContent = "L'âge doit être compris entre 18 et 60 ans.";
    return false;
  } else {
    ageError.textContent = ""; // Effacement du message d'erreur si l'âge est valide
  }
  return true;
}

// Fermeture de la modal d'édition de membre
function handleCloseModal() {
  document.getElementById("editMemberModal").classList.remove("block");
  document.getElementById("editMemberModal").classList.add("hidden");
  document.getElementById("editMemberModal").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("editMemberModal").style.display = "none";
  }, 500);
}

// Récupération et affichage des membres
function fetchAndDisplayMembers() {
  apiService
    .fetchMembers()
    .then((members) => {
      console.log(members); // Logique d'affichage des membres à implémenter
    })
    .catch((error) => {
      console.error("Failed to fetch members:", error);
    });
}

// Préparation de la modal d'édition avec les données d'un membre spécifique
function editMember(memberId) {
  apiService
    .fetchMemberDetails(memberId)
    .then((memberData) => {
      domUtils.populateEditForm(memberData); // Remplissage du formulaire avec les données
      domUtils.toggleEditMemberModal(true); // Affichage de la modal
    })
    .catch((error) => {
      console.error("Failed to fetch member details:", error);
    });
}
