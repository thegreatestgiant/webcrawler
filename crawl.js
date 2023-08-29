function normalizeURL(str){
    const url = new URL(str)
    return url.hostname + url.pathname
}


module.exports = {
    normalizeURL
  }