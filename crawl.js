const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    let arr = []
    let arr_of_anchor = dom.window.document.querySelectorAll('a')
    for (a of arr_of_anchor) {
        let href = a.getAttribute('href');
        if (href && href.startsWith('./')) {
            href = href.split('/').slice(0, -1).join('/');
        }
        try {
            let url = new URL(a)
            console.log(url)
            arr.push(url.href)
        } catch (e) {
            let url = new URL(baseURL + a)
            console.log(url)
            if(url.hostname.endsWith('.')){
                console.log(url.hostname)
                console.log(url)
            }
            arr.push(url.href)
        }
    }
    console.log(arr)

}


function normalizeURL(str){
    const url = new URL(str)
    return url.hostname + url.pathname
}
getURLsFromHTML(`<a href="./new_page.html">`,'https://test.me')
// getURLsFromHTML(`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Test</title>
//     </head>
//     <body>
//         <button type="submit" onsubmit="submit()">Click Me!</button>
    
//         <script>
//             const submit = () => {
//                 open('hidden/sectret.html', '_self')
//             }
//         </script>
//     </body>
//     </html>`, 'https://test.me')

module.exports = {
    normalizeURL,
    getURLsFromHTML
  }