document.querySelectorAll('.map-area').forEach(area => {
    const tooltipId = area.dataset.tooltip; // Obtiene el ID del tooltip relacionado
    const tooltip = document.getElementById(tooltipId); // Selecciona el tooltip

    // Mostrar el tooltip al pasar el ratón
    area.addEventListener('mouseenter', () => {
        const rect = area.getBoundingClientRect(); // Obtiene las coordenadas del área interactiva
        tooltip.style.display = 'block'; // Muestra el tooltip
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`; // Posición vertical
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`; // Centrado horizontalmente
    });

    // Ocultar el tooltip al salir del área
    area.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none'; // Oculta el tooltip
    });
});
