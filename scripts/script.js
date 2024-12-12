document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const authButtons = document.getElementById('auth-buttons');
    const menuPerfil = document.getElementById('menu-perfil');
    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
    const miPerfilBtn = document.getElementById('mi-perfil');
    const misExperiencias = document.getElementById('mis-experiencias');
    const misCartas = document.getElementById('mis-cartas');
    const body = document.body;

    //Para que el perfil se siga mostrando al cambiar de pagina (si se ha iniciado sesión)
    function verUsuario() {
        const authButtons = document.getElementById('auth-buttons');
        const menuPerfil = document.getElementById('menu-perfil');
        const usuario = getCookie('currentUser');
        if (usuario) {
            authButtons.style.display = 'none';
            menuPerfil.style.display = 'flex';
        } else {
            authButtons.style.display = 'flex';
            menuPerfil.style.display = 'none';
        }
    }

    verUsuario();



    // Generación del html y estilos de popups de inicio de sesion y registro
    const style = document.createElement('style');
    style.textContent = `
        .boton-atras {
            position: fixed;
            top: 70px;
            left: 20px;
            display: inline-flex; /* Para alinear elementos en una fila */
            align-items: center; /* Centrar verticalmente */
        }
        .boton-atras a {
            font-size: 25px;
            text-decoration: none;
            color: white;
            display: inline-flex; /* Asegura que los elementos dentro también usen flexbox */
            align-items: center; /* Centrar verticalmente el texto e imagen */
        }
        .boton-atras img {
            margin-right: 8px; /* Espacio entre la imagen y el texto */
            height: 25px; /* Ajusta la altura de la imagen */
        }
    `;
    document.head.appendChild(style);

    // Función que crea los popup, necesita un título, un array de los campos que se solicitarán, 
    // una función de validación y la función para enviar los datos
    function createPopup(titleText, fields, validate, onSubmit) {
        const popupOverlay = document.createElement('div');
        popupOverlay.style.position = 'fixed';
        popupOverlay.style.top = '0';
        popupOverlay.style.left = '0';
        popupOverlay.style.width = '100%';
        popupOverlay.style.height = '100%';
        popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popupOverlay.style.display = 'flex';
        popupOverlay.style.justifyContent = 'center';
        popupOverlay.style.alignItems = 'center';
        popupOverlay.style.zIndex = '1000';

        const backgroundImageContainer = document.createElement('div');
        backgroundImageContainer.style.position = 'relative';
        backgroundImageContainer.style.width = '100%';
        backgroundImageContainer.style.height = '100%';
        backgroundImageContainer.style.backgroundImage = 'url("./resources/principal.jpg")';
        backgroundImageContainer.style.backgroundSize = 'cover';
        backgroundImageContainer.style.backgroundPosition = 'center';
        backgroundImageContainer.style.display = 'flex';
        backgroundImageContainer.style.flexDirection = 'column';
        backgroundImageContainer.style.justifyContent = 'center';

        const backButton = document.createElement('div');
        backButton.className = 'boton-atras';
        backButton.innerHTML = `
            <a href="#">
                <img src="resources/back.png" alt="flecha atras">
                Atrás
            </a>
        `;
        backButton.addEventListener('click', function(event) {
            event.preventDefault();
            body.removeChild(popupOverlay);
        });

        const title = document.createElement('h2');
        title.textContent = titleText;
        title.style.textAlign = 'center';
        title.style.color = 'white';
        title.style.marginTop = '20px';

        backgroundImageContainer.appendChild(backButton);
        backgroundImageContainer.appendChild(title);

        const inputFields = {};
        fields.forEach(field => {
            const inputField = document.createElement('input');
            inputField.type = field.type;
            inputField.placeholder = field.placeholder;
            inputField.style.display = 'block';
            inputField.style.width = '250px';
            inputField.style.margin = '10px auto';
            inputField.style.padding = '10px';
            inputField.style.border = '1px solid #ccc';
            inputField.style.borderRadius = '5px';
            if (field.value) {
                inputField.value = field.value;
            }
            inputFields[field.placeholder] = inputField;
            backgroundImageContainer.appendChild(inputField);
        });

        const submitButton = document.createElement('button');
        submitButton.textContent = titleText;
        submitButton.style.display = 'block';
        submitButton.style.width = '250px';
        submitButton.style.margin = '20px auto';
        submitButton.style.padding = '10px';
        submitButton.style.backgroundColor = 'darkred';
        submitButton.style.color = 'white';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '5px';
        submitButton.addEventListener('click', function() {
            
            // Validamos los inputs
            const errors = validate(inputFields);
            if (errors.length > 0) {
                alert(errors.join('\n'));
            } else {
                onSubmit(inputFields);
                body.removeChild(popupOverlay);
            }
        });

        backgroundImageContainer.appendChild(submitButton);

        popupOverlay.appendChild(backgroundImageContainer);

        body.appendChild(popupOverlay);
    }

    // Función para validar el inicio de sesión
    function validateLogin(fields) {
        const errors = [];
        if (fields['Username'].value.length < 3) {
            errors.push('Usuario tiene que tener al menos 3 caracteres.');
        }
        if (fields['Password'].value.length < 10 ||
            !/[0-9].*[0-9]/.test(fields['Password'].value) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(fields['Password'].value) ||
            !/[A-Z]/.test(fields['Password'].value)) {
            errors.push('La contraseña tiene que tener al menos 10 caracteres, de los cuales: 2 números, 1 carácter especial, 1 mayuscula.');
        }
        return errors;
    }

    // Funcion para validar los campos del registro
    function validateRegister(fields) {
        const errors = [];
        if (fields['Nombre'].value.length < 3) {
            errors.push('Nombre tiene que tener al menos 3 caracteres.');
        }
        if (fields['Apellidos'].value.length < 3) {
            errors.push('Apellidos tiene que tener al menos 3 caracteres.');
        }
        if (fields['Usuario'].value.length < 3) {
            errors.push('Usuario tiene que tener al menos 3 caracteres.');
        }
        if (fields['País'].value.length < 3) {
            errors.push('País tiene que tener al menos 3 caracteres.');
        }
        if (fields['Ciudad'].value.length < 3) {
            errors.push('Ciudad tiene que tener al menos 3 caracteres.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields['Correo'].value)) {
            errors.push('Correo no válido.');
        }
        if (fields['Contraseña'].value.length < 10 ||
            !/[0-9].*[0-9]/.test(fields['Contraseña'].value) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(fields['Contraseña'].value) ||
            !/[A-Z]/.test(fields['Contraseña'].value)) {
            errors.push('Contraseña tiene que tener al menos 10 caracteres, contener 2 números, 1 caracter especial y 1 mayúscula.');
        }
        return errors;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; path=/; max-age=0`;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    loginBtn.addEventListener('click', function() {
        createPopup('Iniciar Sesión', [
            { type: 'text', placeholder: 'Username' },
            { type: 'password', placeholder: 'Password' }
        ], validateLogin, function(inputFields) {
            const usuario = inputFields['Username'].value;
            const password = inputFields['Password'].value;
            const userDataCookie = getCookie('userData');
            if (userDataCookie) {
                const userDataArray = JSON.parse(userDataCookie);
                const user = userDataArray.find(user => user.usuario === usuario);
                if (user) {
                    if (user.password === password) {
                        document.cookie = `currentUser=${usuario}; path=/; max-age=31536000`;
                        authButtons.style.display = 'none';
                        menuPerfil.style.display = 'flex';
                    } else {
                        alert('Contraseña incorrecta.');
                    }
                } else {
                    alert('Usuario no encontrado.');
                }
            } else {
                alert('No hay usuarios registrados.');
            }
        });
    });

    registerBtn.addEventListener('click', function() {
        createPopup('Registrarse', [
            { type: 'text', placeholder: 'Nombre' },
            { type: 'text', placeholder: 'Apellidos' },
            { type: 'text', placeholder: 'Usuario' },
            { type: 'text', placeholder: 'País' },
            { type: 'text', placeholder: 'Ciudad' },
            { type: 'email', placeholder: 'Correo' },
            { type: 'password', placeholder: 'Contraseña' }
        ], validateRegister, function(inputFields) {
            const usuario = inputFields['Usuario'].value;
            let userDataArray = [];
            const userDataCookie = getCookie('userData');
            if (userDataCookie) {
                userDataArray = JSON.parse(userDataCookie);
            }
            const userExists = userDataArray.some(user => user.usuario === usuario);
            if (userExists) {
                alert('Ese usuario ya existe.');
                return;
            }
            const userData = {
                nombre: inputFields['Nombre'].value,
                apellidos: inputFields['Apellidos'].value,
                usuario: inputFields['Usuario'].value,
                pais: inputFields['País'].value,
                ciudad: inputFields['Ciudad'].value,
                correo: inputFields['Correo'].value,
                password: inputFields['Contraseña'].value
            };
            userDataArray.push(userData);
            document.cookie = `userData=${JSON.stringify(userDataArray)}; path=/; max-age=31536000`;
        });
    });

    cerrarSesionBtn.addEventListener('click', function() {
        // Borramos la cookie de usuario actual
        deleteCookie('currentUser');

        authButtons.style.display = 'flex';
        menuPerfil.style.display = 'none';
    });

    miPerfilBtn.addEventListener('click', function() {
        const currentUser = getCookie('currentUser');
        const userDataCookie = getCookie('userData');
        if (currentUser && userDataCookie) {
            const userDataArray = JSON.parse(userDataCookie);
            const user = userDataArray.find(user => user.usuario === currentUser);
            if (user) {
                createPopup('Mi Perfil', [
                    { type: 'text', placeholder: 'Nombre', value: user.nombre },
                    { type: 'text', placeholder: 'Apellidos', value: user.apellidos },
                    { type: 'text', placeholder: 'Usuario', value: user.usuario },
                    { type: 'text', placeholder: 'País', value: user.pais },
                    { type: 'text', placeholder: 'Ciudad', value: user.ciudad },
                    { type: 'email', placeholder: 'Correo', value: user.correo },
                    { type: 'password', placeholder: 'Contraseña', value: user.password }
                ], validateRegister, function(inputFields) {
                    user.nombre = inputFields['Nombre'].value;
                    user.apellidos = inputFields['Apellidos'].value;
                    user.usuario = inputFields['Usuario'].value;
                    user.pais = inputFields['País'].value;
                    user.ciudad = inputFields['Ciudad'].value;
                    user.correo = inputFields['Correo'].value;
                    user.password = inputFields['Contraseña'].value;
                    document.cookie = `userData=${JSON.stringify(userDataArray)}; path=/; max-age=31536000`;
                });
            }
        }
    });

    misExperiencias.addEventListener('click', function() {
        window.location.href = 'misexperiencias.html';
    });

    misCartas.addEventListener('click', function() {
        window.location.href = 'miscartas.html';
    });




});