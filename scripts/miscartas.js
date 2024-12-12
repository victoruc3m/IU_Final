
document.addEventListener('DOMContentLoaded', function() {
    const mostrarMisCartas = document.getElementById('mostrar-miscartas');
    const cartaCookie = getCookie('carta');
    const usuarioSesion = getCookie('currentUser');

    if (usuarioSesion) {
        if (cartaCookie) {
            const carta = JSON.parse(cartaCookie);
            mostrarMisCartas.innerHTML = `<p>Carta del usuario: ${usuarioSesion}</p>
                                            <p>Nombre: ${carta.name}</p>
                                            <p>Asunto: ${carta.subject}</p>
                                            <p>Mensaje: ${carta.message}</p>
                                            `;
        } else {
            mostrarMisCartas.innerHTML = `<p>Usted (${usuarioSesion}) no ha enviado ninguna carta.</p>`;
        }
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}