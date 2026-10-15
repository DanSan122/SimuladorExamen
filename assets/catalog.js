'use strict';

const courseSearch = document.getElementById('course-search');
const courseCards = Array.from(document.querySelectorAll('.simulator-card'));
const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
// Search only the course content, excluding shared action and metadata labels.
const searchableCourses = courseCards.map(card => ({
    card,
    text: normalizeSearch(card.querySelector('.card-title').textContent + ' ' +
        card.querySelector('.card-description').textContent)
}));
courseSearch.addEventListener('input', () => {
    const words = normalizeSearch(courseSearch.value.trim()).split(/\s+/);
    let visible = 0;
    searchableCourses.forEach(({ card, text }) => {
        card.hidden = !words.every(word => text.includes(word));
        if (!card.hidden) visible++;
    });
    document.getElementById('course-count').textContent = visible === 1
        ? '1 módulo disponible para practicar'
        : `${visible} módulos disponibles para practicar`;
    document.getElementById('no-courses').hidden = visible > 0;
});
