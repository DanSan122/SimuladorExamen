const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const core = require('../assets/exam-core.js');
const root = path.join(__dirname, '..');
const modules = fs.readdirSync(root).filter(name => fs.existsSync(path.join(root, name, 'main.html')));

test('all active banks satisfy the schema and supply 20 distinct questions', () => {
    for (const name of modules) {
        const bank = JSON.parse(fs.readFileSync(path.join(root, name, 'preguntas.json')));
        core.validateQuestions(bank);
        const original = JSON.stringify(bank);
        const selected = core.selectQuestions(bank, 20);
        assert.equal(selected.length, 20, name);
        assert.equal(new Set(selected.map(q => q.question.trim())).size, 20, name);
        assert.equal(JSON.stringify(bank), original);
    }
});
test('invalid banks fail before rendering', () => {
    for (const bank of [null, [], [{}], [{ question: 'Q', options: ['A', 'B'], answer: 2 }]]) {
        assert.throws(() => core.validateQuestions(bank));
    }
});
test('deadline handles delayed callbacks, fractional seconds and expiration', () => {
    assert.equal(core.remainingSeconds(10000, 1000), 9);
    assert.equal(core.remainingSeconds(10000, 9999), 1);
    assert.equal(core.remainingSeconds(10000, 20000), 0);
});
test('bank content is escaped as text', () => {
    assert.equal(core.escapeHtml('<script>"&\''), '&lt;script&gt;&quot;&amp;&#39;');
});
test('every page has valid local links and syntactically valid scripts', () => {
    const pages = [path.join(root, 'index.html'), ...modules.flatMap(name => ['index.html', 'main.html'].map(file => path.join(root, name, file)))];
    for (const file of pages) {
        const html = fs.readFileSync(file, 'utf8');
        for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
            new vm.Script(match[2], { filename: file });
        }
        for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
            if (/^(?:\/|https?:|data:)/.test(match[1])) continue;
            assert.ok(fs.existsSync(path.resolve(path.dirname(file), match[1])), `${file}: ${match[1]}`);
        }
    }
});
test('shared engine completes, restarts from cache and expires once', async () => {
    class Element {
        constructor() { this.style = {}; this.children = []; this.classList = { add() {}, remove() {} }; }
        appendChild(child) { this.children.push(child); }
        addEventListener() {}
        setAttribute() {}
        set innerHTML(value) { this.html = value; this.children = []; }
        get innerHTML() { return this.html; }
    }
    const elements = new Map();
    let fetches = 0, interval, now = 1000;
    const bank = Array.from({ length: 25 }, (_, i) => ({ question: `Q${i}`, options: ['A', 'B'], answer: 0 }));
    const sandbox = {
        ExamCore: { ...core, remainingSeconds: deadline => core.remainingSeconds(deadline, now) },
        document: { body: { dataset: { duration: '30' } }, addEventListener() {},
            getElementById(id) { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); },
            createElement() { return new Element(); } },
        window: { addEventListener() {} }, Date: { now: () => now },
        fetch: async () => { fetches++; return { ok: true, json: async () => bank }; },
        setInterval(fn) { interval = fn; return 1; }, clearInterval() { interval = null; }
    };
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'assets/exam.js'), 'utf8'), sandbox);
    await vm.runInContext('loadQuestions()', sandbox);
    assert.equal(elements.get('timer').textContent, 'Tiempo: 30:00');
    vm.runInContext('userAnswers = selectedQuestions.map(q => q.answer); showResults()', sandbox);
    assert.match(elements.get('results').innerHTML, /100.0%/);
    assert.equal(interval, null);
    await vm.runInContext('restartExam()', sandbox);
    // restartExam schedules the cached load synchronously, with no network await.
    assert.equal(fetches, 1);
    now += 1800001;
    interval();
    assert.match(elements.get('results').innerHTML, /0.0%/);
    const count = elements.get('results').children.length;
    vm.runInContext('showResults()', sandbox);
    assert.equal(elements.get('results').children.length, count);
    assert.equal(interval, null);
});
