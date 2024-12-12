
document.addEventListener('DOMContentLoaded', function() {
    const mostrarMiscartasDiv = document.getElementById('mostrar-miscartas');
    const cartaCookie = getCookie('carta');
    const currentUser = getCookie('currentUser');

    if (currentUser) {
        if (cartaCookie) {
            const carta = JSON.parse(cartaCookie);
            mostrarMiscartasDiv.innerHTML = `<p>Carta del usuario: ${currentUser}</p>
                                            <p>Nombre: ${carta.name}</p>
                                            <p>Asunto: ${carta.subject}</p>
                                            <p>Mensaje: ${carta.message}</p>
                                            `;
        } else {
            mostrarMiscartasDiv.innerHTML = `<p>Usted (${currentUser}) no ha enviado ninguna carta.</p>`;
        }
    } else {
        mostrarMiscartasDiv.innerHTML = `<p>No user found.</p>`;
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}