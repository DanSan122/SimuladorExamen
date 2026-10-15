/* Shared bank validation and exam utilities; usable in browsers and Node. */
(function (root) {
    'use strict';
    function validateQuestions(questions) {
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('El banco debe contener preguntas.');
        }
        questions.forEach((q, index) => {
            if (!q || typeof q.question !== 'string' || !q.question.trim() ||
                !Array.isArray(q.options) || q.options.length < 2 ||
                q.options.some(option => typeof option !== 'string' || !option.trim()) ||
                !Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length ||
                (q.explanation !== undefined && typeof q.explanation !== 'string')) {
                throw new Error(`Pregunta ${index + 1}: formato inválido.`);
            }
        });
        return questions;
    }
    function selectQuestions(questions, count, random = Math.random) {
        // Repeated statements must not bias selection or appear twice in one exam.
        const seen = new Set();
        const copy = questions.filter(q => {
            const key = q.question.trim();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy.slice(0, count);
    }
    function remainingSeconds(deadline, now = Date.now()) {
        return Math.max(0, Math.ceil((deadline - now) / 1000));
    }
    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[char]);
    }
    const core = { validateQuestions, selectQuestions, remainingSeconds, escapeHtml };
    if (typeof module !== 'undefined' && module.exports) module.exports = core;
    else root.ExamCore = core;
})(globalThis);
