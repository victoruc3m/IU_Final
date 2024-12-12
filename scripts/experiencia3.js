document.addEventListener('DOMContentLoaded', function() {
    const exp1Price = 1000; // Precio para "Viaja con Papá Noel"
    const exp2Price = 500;  // Precio para "Entrega de Regalos Personalizada"

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function displayData() {
        const combinedData = JSON.parse(getCookie('datosCompra'));
        if (combinedData) {
            const { selections } = combinedData;

            // Mostrar selecciones
            const exp1Quantity = parseInt(selections.exp1) || 0;
            const exp2Quantity = parseInt(selections.exp2) || 0;
            document.getElementById('exp1').textContent = `${exp1Quantity}x Viaja con Papá Noel .......................................... $${exp1Quantity * exp1Price}`;
            document.getElementById('exp2').textContent = `${exp2Quantity}x Entrega de Regalos Personalizada .............................. $${exp2Quantity * exp2Price}`;

            // Calcular y mostrar total
            const total = (exp1Quantity * exp1Price) + (exp2Quantity * exp2Price);
            document.getElementById('total').textContent = total;
        }
    }

    function validateCreditCard(cardNumber) {
        // Validación simple para número de tarjeta de crédito (longitud y numérico)
        const regex = /^\d{16}$/;
        return regex.test(cardNumber);
    }

    function savePurchaseDetails() {
        const cardNumber = document.getElementById('tarjeta').value;
        if (!validateCreditCard(cardNumber)) {
            alert('Número de tarjeta no válido. Debe tener 16 dígitos.');
            return false;
        }

        // Guardar número de tarjeta en una cookie (solo para fines de demostración, no recomendado para aplicaciones reales)
        document.cookie = `cardNumber=${cardNumber}; path=/; max-age=31536000`; // Cookie válida por 1 año

        // Generar cookie final con toda la información de la compra
        const combinedData = JSON.parse(getCookie('datosCompra'));
        if (combinedData) {
            const currentUser = getCookie('currentUser');
            combinedData.cardNumber = cardNumber;
            combinedData.username = currentUser;
            document.cookie = `finalPurchase=${JSON.stringify(combinedData)}; path=/; max-age=31536000`; // Cookie válida por 1 año
        }

        // Redirigir a experiencia4.html
        window.location.href = 'experiencia4.html';
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; path=/; max-age=0`;
    }

    // Adjuntar la función al botón "Continuar"
    document.querySelector('.continue-btn').addEventListener('click', function(event) {
        event.preventDefault();
        savePurchaseDetails();
        deleteCookie('userData');
        deleteCookie('selections');
        deleteCookie('datosCompra');
        deleteCookie('cardNumber');
    });

    // Mostrar datos al cargar la página
    displayData();
});