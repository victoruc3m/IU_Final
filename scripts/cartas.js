document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('carta-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        // Validamos los campos de la carta
        if (nombre.length < 3) {
            alert('El nombre debe tener al menos 3 caracteres.');
            return;
        }
        if (asunto.length < 3) {
            alert('El asunto debe tener al menos 3 caracteres.');
            return;
        }
        if (mensaje.length < 10) {
            alert('El mensaje debe tener al menos 10 caracteres.');
            return;
        }

        const currentUser = document.cookie.split('; ').find(row => row.startsWith('currentUser='));
        if (!currentUser) {
            alert('Debes estar registrado para enviar una carta.');
            return;
        }

        const username = currentUser.split('=')[1];
        const userData = {
            username: username,
            name: nombre,
            email: email,
            subject: asunto,
            message: mensaje
        };

        document.cookie = `carta=${JSON.stringify(userData)}; path=/;`;
        alert('Tu carta se ha enviado con éxito.');
        form.reset();
    });
});