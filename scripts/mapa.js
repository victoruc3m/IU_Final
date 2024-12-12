document.querySelectorAll('.map-area').forEach(area => {
    const tooltipId = area.dataset.tooltip;
    const tooltip = document.getElementById(tooltipId); 


    area.addEventListener('mouseenter', () => {
        const rect = area.getBoundingClientRect(); 
        tooltip.style.display = 'block'; 
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`; 
    });


    area.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none'; 
    });
});
