const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const sortPages = require('./report.js')

// From Step 1
test('Normalizes https and http', ()=>{
    expect(normalizeURL('http://google.com') === (normalizeURL('https://google.com'))).toBe(true)
})
test('Tests trailing /', () => {
    expect(normalizeURL('https://google.com/me/') === (normalizeURL('https://google.com/me'))).toBe(true)
})

// From Step 2

test('Find straight out link', ()=>{
    expect(getURLsFromHTML(`<a href="https://test.you/new_page.html">`,'https://test.me').toString() === ["https://test.you/new_page.html"].toString()).toBe(true)
})
test('Find burried link', ()=>{
    expect(getURLsFromHTML(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test</title>
    </head>
    <body>
        <a href="http://test.you/new_page.html"></a>
    </body>
    </html>`,'https://test.me').toString() === [ 'http://test.you/new_page.html' ].toString()).toBe(true)
})
test('Find relative url from <a>',()=>{
    expect(getURLsFromHTML(`<a href="/new_page.html">`,'https://test.me').toString() === [ 'https://test.me/new_page.html' ].toString()).toBe(true)
})

// Print report tests
test('keep order',()=>{
    expect(JSON.stringify(sortPages({"a":3,"b":2})) === JSON.stringify({"a":3,"b":2})).toBe(true)
})

test('actually sort',()=>{
    expect(JSON.stringify(sortPages({"a":2,"b":3})) === JSON.stringify({"b":3,"a":2})).toBe(true)
})