document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function mostrarExpCompradas() {
        const datosCompra = JSON.parse(getCookie('finalPurchase'));
        const currentUser = getCookie('currentUser');
        if (datosCompra && datosCompra.username === currentUser) {
            const { selections, username } = datosCompra;
            const cantidadViaje = parseInt(selections.exp1) || 0; // Cantidad de Viaja con Papá Noel
            const cantidadEntrega = parseInt(selections.exp2) || 0; // Cantidad de Entrega de Regalos Personalizada

            const mostrarMisExp = document.getElementById('mostrar-misexp');
            mostrarMisExp.innerHTML = `
            <h2>Experiencias que usted ha comprado (${username}):</h2>
            <ul>
                <li>${cantidadViaje}x Viaja con Papá Noel</li>
                <li>${cantidadEntrega}x Entrega de Regalos Personalizada</li>
            </ul>
            `;
        } else {
            const mostrarMisExp = document.getElementById('mostrar-misexp');
            mostrarMisExp.innerHTML = '<p>No has comprado ninguna experiencia.</p>';
        }
    }

    mostrarExpCompradas();
});