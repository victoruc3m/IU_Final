document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('papa-noel-video');
    const playButton = document.getElementById('play-button');
    const muteButton = document.getElementById('mute-button');

    // botón para reproducir/pausar el video
    playButton.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.volume = 1.0; // volumen al máximo
            video.play()
                .then(() => {
                    playButton.textContent = "Pausar Videollamada";
                })
                .catch((error) => {
                    console.error("Error al reproducir el video:", error);
                });
        } else {
            video.pause();
            playButton.textContent = "Iniciar Videollamada";
        }
    });

    // botón para silenciar/activar sonido
    muteButton.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false; // activa el sonido
            muteButton.textContent = "Silenciar";
        } else {
            video.muted = true; // silencia
            muteButton.textContent = "Activar sonido";
        }
    });
});
