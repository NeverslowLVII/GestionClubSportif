const domUtils = {
  // Efface le contenu du corps d'un tableau HTML.
  clearTableBody(tableBody) {
    tableBody.innerHTML = "";
  },
  // Insère une ligne dans le tableau des membres avec les informations du membre.
  // Inclut un bouton d'édition si spécifié.
  insertMemberRow(membersTableBody, member, includeEditButton = false) {
    let row = membersTableBody.insertRow();
    let htmlContent = `
    <td class="border px-4 py-2">${member.name}</td>
    <td class="border px-4 py-2">${member.age}</td>
    <td class="border px-4 py-2">${member.position}</td>
    <td class="border px-4 py-2">${member.email}</td>
    <td class="border px-4 py-2">${member.isMember ? "Oui" : "Non"}</td>
  `;
    // Ajoute un bouton d'édition à la ligne si nécessaire.
    if (includeEditButton) {
      htmlContent += `
    <td class="border px-4 py-2"><button onclick="editMember('${member._id}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Modifier</button></td>
    `;
    }
    row.innerHTML = htmlContent;
  },
  // Affiche ou cache la modale d'édition d'un membre.
  toggleEditMemberModal(show) {
    const modal = document.getElementById("editMemberModal");
    if (show) {
      modal.classList.remove("hidden");
      modal.classList.add("block");
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      // Transition douce pour l'affichage de la modale.
      setTimeout(() => modal.style.opacity = '1', 10);
    } else {
      modal.classList.remove("block");
      modal.classList.add("hidden");
      modal.style.opacity = '0';
      // Transition douce pour le masquage de la modale.
      setTimeout(() => modal.style.display = 'none', 500);
    }
  },
  // Remplit le formulaire d'édition avec les données du membre.
  populateEditForm(data) {
    document.getElementById("memberId").value = data._id;
    document.getElementById("name").value = data.name;
    document.getElementById("age").value = data.age;
    document.getElementById("position").value = data.position;
    document.getElementById("email").value = data.email;
    document.getElementById("isMember").checked = data.isMember;
  },
};
