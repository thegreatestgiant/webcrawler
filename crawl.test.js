const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

// From Step 1
test('Normalizes https and http', ()=>{
    expect(normalizeURL('http://google.com') === (normalizeURL('https://google.com'))).toBe(true)
})
test('Tests trailing /', () => {
    expect(normalizeURL('https://google.com/') === (normalizeURL('https://google.com'))).toBe(true)
})

// From Step 2

test('Find straight out link', ()=>{
    expect(getURLsFromHTML(`<a href="https://test.you/new_page.html">`,'https://test.me') === ["https://test.you/new_page.html"]).toBe(true)
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
    </html>`,'https://test.me') === ["http://test.you/new_page.html"]).toBe(true)
})
test('Find relative url from <a>',()=>{
    expect(getURLsFromHTML(`<a href="/new_page.html">`,'https://test.me') === ["https://test.me/new_page.html"]).toBe(true)
})
test('Find relative link hidden', () => {
    expect(getURLsFromHTML(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test</title>
    </head>
    <body>
        <button type="submit" onsubmit="submit()">Click Me!</button>
    
        <script>
            const submit = () => {
                open('hidden/sectret.html', '_self')
            }
        </script>
    </body>
    </html>`, 'https://test.me') === ['https://test.me/hidden/secret.html']).toBe(true)
})

test('Get multiple url\'s from the same htmlBody',()=>{
    expect(getURLsFromHTML(`<a href="http://google.com">google</a>
    <script>
        let b = document.body.getElementById('submit')
        b.textContent = "https://bing.com"
    </script>`,'https://test.me') === ['https://google.com', 'https://bing.com'])
})