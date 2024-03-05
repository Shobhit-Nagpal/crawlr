const fs = require("node:fs");

function generateCSV(pages) {
  const pwd = process.cwd();

  fs.writeFileSync(`${pwd}/visits.csv`, `Link,Visits\n`, function (err) {
    if (err) throw err;
    console.log("Csv added!");
  });

  for (const link in pages) {
    fs.appendFileSync(
      `${pwd}/visits.csv`,
      `${link},${pages[link]}\n`,
      function (err) {
        if (err) throw err;
      },
    );
  }

  console.log("Data added in visits.csv");
}

module.exports = {
  generateCSV,
};
