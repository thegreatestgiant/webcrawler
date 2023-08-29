const { crawlPage } = require('./crawl.js')
const {printReport} = require('./report.js')

async function main(){
    if(process.argv.length < 3){
        console.log("Please enter a website")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("Please only enter one argument")
        process.exit(2)
    }
    let baseUrl = process.argv[2]
    console.log(`Using ${baseUrl} as baseUrl`)
    let pages = await crawlPage(baseUrl, baseUrl, {})
    printReport(pages)
}

main()