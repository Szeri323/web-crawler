import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

// const normalizeURL = require('./crawl');

test('pass https://blog.boot.dev/path/ url to equal blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
})

test('pass HTML body to extract url', () => {

    const bodyHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev/somepath"><span>Go to Boot.dev</span></a>
            <a href="/someotherpath"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `

    expect(getURLsFromHTML(bodyHTML, 'https://blog.boot.dev')).toStrictEqual(['https://blog.boot.dev/', 'https://blog.boot.dev/somepath', 'https://blog.boot.dev/someotherpath']);
})