const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("node-fetch");

async function crawlPage(baseURL, currentUrl, pages){
    const baseURLObj = new URL(baseURL)
    const currentUrlObj = new URL(currentUrl)
    if (currentUrlObj.hostname !== baseURLObj.hostname) {
        return pages
    }

    let normal = normalizeURL(currentUrl)
    if(pages[normal] > 0){
        pages[normal]++
        return pages
    }
    else{
        pages[normal] = baseURL === currentUrl ? 0 : 1
    }
    console.log('Activly crawling ' + currentUrl)
    try {
        const response = await fetch(currentUrl)
        if(!response.ok){
            console.log(`Fetch returned with an error status code: ${response.status}`)
            return pages
        }
        const content = await response.headers.get('content-type')
        if(!content.includes('text/html')){
            console.log(`Non-html contentType: ${content}`)
            return pages
        }
        let text = await response.text()
        let url_arr = getURLsFromHTML(text, baseURL)
        for (url of url_arr) {
            pages = await crawlPage(baseURL, url, pages)
        }
    } catch (e){
        console.log(`Error ${e.message} on ${currentUrl}`)
    }
    return pages
}

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
    let fullUrl = `${url.host}${url.pathname}`
    if(fullUrl.endsWith('/')){
        fullUrl = fullUrl.split('').slice(0,-1).join('')
    }
    return fullUrl
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }