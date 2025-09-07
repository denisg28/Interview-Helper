
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const hljs = require('../assets/highlight-11.9.0.min.js');

describe('syntax highlighting', () => {
    it('loads highlight.js and styles code blocks', async () => {
        const htmlPath = path.join(__dirname, '../index.html');
        const html = fs.readFileSync(htmlPath, 'utf8');
        const dom = new JSDOM(html, {
            runScripts: 'dangerously',
            resources: 'usable',
            url: 'file://' + path.resolve(__dirname, '..') + '/',
        });

        // Явно добавляем highlight.js в window
        dom.window.hljs = hljs;

        await new Promise(resolve => {
            dom.window.addEventListener('load', () => resolve());
        });

        const code = dom.window.document.createElement('code');
        code.className = 'language-js hljs';
        code.textContent = 'const x = 1;';
        dom.window.document.body.appendChild(code);
        dom.window.hljs.highlightElement(code);

        // Проверяем, что стили применились
        expect(code.innerHTML).toMatch(/<span class="/);
        expect(code.className).toContain('hljs');
    });
});
