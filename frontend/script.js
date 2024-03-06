document.addEventListener('DOMContentLoaded', function() {
    const membersList = document.getElementById('membersList');

    function fetchMembers() {
        fetch('/api/members')
            .then(response => response.json())
            .then(data => {
                if (membersList) {
                    membersList.innerHTML = '';
                    data.forEach(member => {
                        const row = membersList.insertRow();
                        row.innerHTML = `
                            <td>${member.name}</td>
                            <td>${member.age}</td>
                            <td>${member.position}</td>
                            <td>${member.email}</td>
                            <td>${member.isMember ? 'Oui' : 'Non'}</td>
                        `;
                    });
                }
            })
            .catch(error => console.error('Error fetching members:', error));
    }

    fetchMembers();

    const addMemberForm = document.getElementById('addMemberForm');
    if (addMemberForm) {
        addMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                age: parseInt(document.getElementById('age').value, 10),
                position: document.getElementById('position').value,
                email: document.getElementById('email').value,
                isMember: document.getElementById('isMember').checked
            };

            fetch('/api/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                window.location.href = 'members.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
