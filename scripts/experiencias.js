
const botonCont = document.getElementById('continue-btn');

function increment(id) {
    const input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
}

function decrement(id) {
    const input = document.getElementById(id);
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function saveSelection() {
    const usuario = getCookie('currentUser');
    if (usuario) {
        const exp1 = document.getElementById('exp1').value;
        const exp2 = document.getElementById('exp2').value;
        const selections = { exp1, exp2 };
        document.cookie = `selections=${JSON.stringify(selections)}; path=/; max-age=86400`;
        window.location.href = 'experiencia2.html'; 
    } else {
        // Si no se ha iniciado sesión no se puede pasar a la siguiente página
        alert('Por favor, inicie sesión para continuar.');
        window.location.href = 'experiencia.html'; 
    }
}