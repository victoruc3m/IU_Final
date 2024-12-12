document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function displayPurchasedItems() {
        const finalPurchase = JSON.parse(getCookie('finalPurchase'));
        const currentUser = getCookie('currentUser');
        if (finalPurchase && finalPurchase.username === currentUser) {
            const { selections, username } = finalPurchase;
            const exp1Quantity = parseInt(selections.exp1) || 0;
            const exp2Quantity = parseInt(selections.exp2) || 0;

            const purchasedItemsContainer = document.getElementById('mostrar-misexp');
            purchasedItemsContainer.innerHTML = `
            <h2>Experiencias Compradas por el usuario: ${username}</h2>
            <ul>
                <li>${exp1Quantity}x Viaja con Papá Noel</li>
                <li>${exp2Quantity}x Entrega de Regalos Personalizada</li>
            </ul>
            `;
        } else {
            const purchasedItemsContainer = document.getElementById('mostrar-misexp');
            purchasedItemsContainer.innerHTML = '<p>No se encontraron experiencias compradas.</p>';
        }
    }

    displayPurchasedItems();
});