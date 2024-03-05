const { argv } = require("node:process");
const { crawlPage } = require("./crawl");
const { printReport } = require("./report");
const { generateCSV } = require("./csv");

async function main() {
  if (argv.length !== 3) {
    console.error("Not right usage of Crawlr. Please provide only one argument");
    process.exit(1);
  }

  const baseURL = argv[argv.length - 1];
  try {
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log("These are all pages: ", pages);
    printReport(pages);
    generateCSV(pages);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
