const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('Normalizes https and http', ()=>{
    expect(normalizeURL('http://google.com').equals(normalizeURL('https://google.com'))).toBe(True)
})
test('Tests trailing /', () => {
    expect(normalizeURL('https://google.com/').equals(normalizeURL('https://google.com'))).toBe(True)
})