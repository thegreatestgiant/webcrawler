const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('Normalizes https and http', ()=>{
    expect(normalizeURL('http://google.com') === (normalizeURL('https://google.com'))).toBe(true)
})
test('Tests trailing /', () => {
    expect(normalizeURL('https://google.com/') === (normalizeURL('https://google.com'))).toBe(true)
})