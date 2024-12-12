function abrirPopup(dia) {
    const mensajes = {
        1: "¡Que mejor manera de empezar el Adviento que escuchando un villancico!", 
        2: "Si aun no lo has hecho te invitamos a leer o escuchar uno de nuestros cuentos de la web.",
        3: "Ya va siendo hora de decorar la casa, si no lo has hecho hoy, ya tienes plan para esta tarde.",
        4: "¡Investiga en nuestra web por el mapa intercativo!",
        5: "¿Por qué no hacer unas galletas de navidad? Aquí te dejamos una receta.",
        6: "Los colores de la Navidad tienen su significado: el rojo, la sangre de Cristo; el verde, la salvación, la vida y el renacimiento; y el dorado, la luz, la realeza y también la riqueza.",
        7: "Si aun no lo has hecho puedes escribir tu carta a Papá Noel, y además desde esta web.",
        8: "Otro villancico para ir animando el ambiente.",
        9: "Un buen plan navideño es ir a ver las luces de la ciudad y luego un chocolate con churros.",
        10: "Si quieres incluir más decoración navideña por tu casa, por aquí te dejamos algunas recomendaciones.",
        11: "¿Sabes qué tipo de coche lleva Papá Noel? Un 'Renol'.",
        12: "El mayor exportador mundial de árboles de Navidad es la provincia de Nueva Escocia, en Canadá.",
        13: "Algo muy típico de navidad es las películas navideñas, algunas recomendaciones son 'El Grinch' o 'Home alone'.",
        14: "¿Sabías que en Cataluña trae los regalos 'Caga Tió' el cual es un tronco decorado que 'caga' los regalos durante Navidad?",
        15: "¡Juega a juegos navideños, si no se te ocurre ninguno nosotros te ofrecemos dos jusgos distintos.",
        16: "Los mercados navideños son una tradición en estas fechas. El más antiguo y grande de Europa es el de Núremberg, Alemania, y acoge cada año a miles de visitantes. Funciona desde 1570 y se llama Christkindlesmarkt.",
        17: "¿Cómo se llama el que tiene miedo a Santa Claus? ¡Claustrofóbico!",
        18: "Vamos con otro villancico más para que puedas cantar el día de Navidad",
        19: "En el País Vasco en Navidad trae los regalos el 'Olentzero' quien es un carbonero bonachón.",
        20: "¿Qué le pasa a Papá Noel cuando le falta un reno? ¡Que tiene insuficiencia renal!",
        21: "Seguro que nunca has ido con tu familia por tu ciudad viendo los belenes que hay por la calle o en las iglesias. Aprovecha ahora para hacerlo.",
        22: "¿Cómo se llaman los habitantes de Belén? - Figuritas",
        23: "Aprovecha y antes de que en menos de dos días llegue Papa Noel haz una videollamada con él.",
        24: "Ya este es el último día, preparate para mañana celebrar la Navidad en familia, ponte tu mejor jersey navideño.",

    };

    const enlaces = {
        1: "https://www.youtube.com/watch?v=IhO3Y1unYGE",
        5: "https://es.cravingsjournal.com/galletas-navidenas-decoradas/",
        8: "https://www.youtube.com/watch?v=lJawRaON8h0",
        10: "https://www.youtube.com/watch?v=XZO4ZTywzvY",
        20: "https://www.youtube.com/watch?v=yfpBMrJZt1Q"
    };

    const mensaje = mensajes[dia] || "";
    const enlace = enlaces[dia] || "";

    // Configura el mensaje
    document.getElementById("popup-message").innerText = mensaje;

    // Configura el enlace (si existe)
    const popupLink = document.getElementById("popup-link");
    if (enlace) {
        popupLink.href = enlace;
        popupLink.style.display = "block"; // Muestra el enlace
    } else {
        popupLink.style.display = "none"; // Oculta el enlace si no hay
    }

    // Muestra el popup
    document.getElementById("popup").style.display = "flex";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}