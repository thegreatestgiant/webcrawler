const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    let arr = []
    let arr_of_anchor = dom.window.document.querySelectorAll('a')
    for (let a of arr_of_anchor) {
        let href = a.getAttribute('href');
        href = (href && href.startsWith('./')) ? href.split('').slice(1).join('') : href        
        try {
            var url = new URL(href);
        } catch (e) {
            var url = new URL(href, baseURL)
        }
        arr.push(url.href)

    }
    return arr
}


function normalizeURL(str){
    const url = new URL(str)
    return url.hostname + url.pathname
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
  }