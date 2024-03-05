function printReport(pages) {
  console.log("Report starting...");
  const sortedReport = sortLinkVisits(pages);
  sortedReport.forEach((link) =>
    console.log(`Found ${link[1]} internal links to ${link[0]}`),
  );
}

function sortLinkVisits(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => b[1] - a[1]);
  return pagesArr;
}

module.exports = { printReport };
