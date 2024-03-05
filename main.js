const { argv } = require("node:process");
const { crawlPage } = require("./crawl");

async function main() {
  if (argv.length !== 3) {
    console.error("Not right usage of Crawlr. Please provide only one argument");
    process.exit(1);
  }

  const baseURL = argv[argv.length - 1];
  const pages = await crawlPage(baseURL, baseURL, {});
  console.log("These are all pages: ", pages);
}

main();
