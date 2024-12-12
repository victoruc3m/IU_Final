document.addEventListener('DOMContentLoaded', function() {
    const precioViaje = 1000; // Precio para "Viaja con Papá Noel"
    const precioEntrega = 500;  // Precio para "Entrega de Regalos Personalizada"

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function mostrarExperiencias() {
        const datosCompra = JSON.parse(getCookie('datosCompra'));
        if (datosCompra) {
            const { selections } = datosCompra;

            // Enseñamos las selecciones de experiencias y cuanto cuesta cada una
            const cantidadViaje = parseInt(selections.exp1) || 0;
            const cantidadEntrega = parseInt(selections.exp2) || 0;
            document.getElementById('exp1').textContent = `${cantidadViaje}x Viaja con Papá Noel: $${cantidadViaje * precioViaje}`;
            document.getElementById('exp2').textContent = `${cantidadEntrega}x Entrega de Regalos Personalizada: $${cantidadEntrega * precioEntrega}`;

            // Calculamos el total
            const total = (cantidadViaje * precioViaje) + (cantidadEntrega * precioEntrega);
            document.getElementById('total').textContent = total;
        }
    }

    function validarTarjeta(cardNumber) {
        const regex = /^\d{16}$/;
        return regex.test(cardNumber);
    }

    function guardarDatosCompra() {
        const tarjeta = document.getElementById('tarjeta').value;
        if (!validarTarjeta(tarjeta)) {
            alert('Número de tarjeta no válido. Debe tener 16 dígitos.');
            return false;
        }

        // Guardar número de tarjeta en una cookie (solo para fines de demostración, no recomendado para aplicaciones reales)
        document.cookie = `cardNumber=${tarjeta}; path=/; max-age=31536000`; // Cookie válida por 1 año

        // Generar cookie final con toda la información de la compra
        const datosCompra = JSON.parse(getCookie('datosCompra'));
        if (datosCompra) {
            const currentUser = getCookie('currentUser');
            datosCompra.cardNumber = tarjeta;
            datosCompra.username = currentUser;
            document.cookie = `finalPurchase=${JSON.stringify(datosCompra)}; path=/; max-age=31536000`; // Cookie válida por 1 año
        }

        // Si todo está bien, redirigir a la siguiente página
        window.location.href = 'experiencia4.html';
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; path=/; max-age=0`;
    }

    // Al hacer clic en el botón de continuar, guardar la información de la compra y redirigir a la siguiente página
    document.querySelector('.continue-btn').addEventListener('click', function(event) {
        event.preventDefault();
        guardarDatosCompra();
        // Eliminamos las cookies intermedias
        deleteCookie('userData');
        deleteCookie('selections');
        deleteCookie('datosCompra');
        deleteCookie('cardNumber');
    });

    mostrarExperiencias();
});