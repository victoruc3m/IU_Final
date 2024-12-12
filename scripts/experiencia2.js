document.addEventListener('DOMContentLoaded', function() {
    const botonCont = document.getElementById('continue-btn');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function validar() {
        const nameSurname = document.getElementById('name-surname').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const direction = document.getElementById('direction').value;
        const cp = document.getElementById('cp').value;
        const number = document.getElementById('number').value;
        const floor = document.getElementById('floor').value;

        // Validation
        if (nameSurname.length < 3) {
            alert('El nombre tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (city.length < 3) {
            alert('La ciudad tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (country.length < 3) {
            alert('El país tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (direction.length < 3) {
            alert('La dirección tiene que tener al menos 3 caracteres.');
            return false;
        }
        if (!/^\d{5}$/.test(cp)) {
            alert('El código postal tiene que tener 5 dígitos.');
            return false;
        }
        if (isNaN(number) || number.length === 0) {
            alert('El número tiene que ser un número.');
            return false;
        }
        if (floor.length < 1) {
            alert('El piso tiene que tener al menos 1 caracter.');
            return false;
        }

        // Collect data
        const userDataExperiencia = {
            nameSurname,
            city,
            country,
            direction,
            cp,
            number,
            floor
        };

        // Get selections from cookie
        const selections = JSON.parse(getCookie('selections'));

        // Combine data
        const combinedData = {
            userDataExperiencia,
            selections
        };

        // Save combined data in a cookie
        document.cookie = `datosCompra=${JSON.stringify(combinedData)}; path=/; max-age=31536000`; // Cookie valid for 1 year

        // Redirect to experiencia3.html
        window.location.href = 'experiencia3.html';
    }

    botonCont.addEventListener('click', function(event) {
        event.preventDefault();
        validar();
    });
});