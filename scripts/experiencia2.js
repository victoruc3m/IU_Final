document.addEventListener('DOMContentLoaded', function() {
    const botonCont = document.getElementById('continue-btn');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function validar() {
        const nombre = document.getElementById('name-surname').value;
        const ciudad = document.getElementById('city').value;
        const pais = document.getElementById('country').value;
        const direccion = document.getElementById('direction').value;
        const cp = document.getElementById('cp').value;
        const numero = document.getElementById('number').value;
        const piso = document.getElementById('floor').value;

        // Validamos los datos introducidos por el usuario
        if (nombre.length < 3) {
            alert('El nombre tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (ciudad.length < 3) {
            alert('La ciudad tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (pais.length < 3) {
            alert('El país tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (direccion.length < 3) {
            alert('La dirección tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (!/^\d{5}$/.test(cp)) {
            alert('El código postal tiene que tener 5 dígitos.');
            return false;
        }
        if (isNaN(numero) || numero.length === 0) {
            alert('El número efectivamente tiene que ser un número.');
            return false;
        }
        if (piso.length === 0 || isNaN(piso)) {
            alert('El piso tiene que tener al menos 1 dígito.');
            return false;
        }

        const datosExperiencia = {
            nameSurname: nombre,
            city: ciudad,
            country: pais,
            direction: direccion,
            cp,
            number: numero,
            floor: piso
        };

        const selections = JSON.parse(getCookie('selections'));

        // Juntamos todos los datos para guardarlos en la cookie
        const todosDatos = {
            userDataExperiencia: datosExperiencia,
            selections
        };

        document.cookie = `datosCompra=${JSON.stringify(todosDatos)}; path=/; max-age=31536000`; // Cookie valid for 1 year

        // Si todo estaba bien, redirigimos a la siguiente pag
        window.location.href = 'experiencia3.html';
    }

    botonCont.addEventListener('click', function(event) {
        event.preventDefault();
        validar();
    });
});