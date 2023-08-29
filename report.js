function printReport(pages) {
  console.log("\n\n\n\n\n--- Report ---\n");
  pages = sortPages(pages);
  for (const page in pages) {
    console.log(`Found ${pages[page]} internal links to ${page}`);
  }
  return pages
}

const sortPages = (pages) => {
  let new_page = {};
  while (Object.keys(pages).length > 0) {
    let max = 0;
    let maxName = "";
    for (const page in pages) {
      if (pages[page] > max) {
        max = pages[page];
        maxName = page;
      }
    }
    new_page[maxName] = max;
    delete pages[maxName];
  }
  return new_page;
}

module.exports = {
    printReport,
    sortPages
}
