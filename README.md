# Crawlr
Crawlr is a web crawler where you enter the link of a website, the script crawls all pages with the same hostname and return all internal link visits to the different links.

This is a guided project from <a href="https://boot.dev">Boot.dev</a>

# Usage
1. Clone the repo
```bash
git clone git@github.com:Shobhit-Nagpal/crawlr.git
```
2. Install dependencies
```bash
npm install
```

```bash
pip install pandas matplotlib
```
3. Run the script
```bash
npm start https://example.com/
```
4. Get results in visits.csv and visualization in bar_chart.png
```bash
python3 generate_visual.py
```

# Working
### The way Crawlr works is as follows:
1. The main functions are present in the crawl.js file 
2. In crawl.js, we have 3 functions ; normalizeURL, getURLsfromHTML and crawlPage
3. normalizeURL normalizes the URL given to it using the URL class provided by Node.

For example:
(Given URL) https://example.com/ --> (Normalized URL) example.com

4. getURLsfromHTML takes in the HTML body and base url. With the HTML body, we make a DOM using jsdom package and then get all the anchor tags. At last, we convert all URLs to absolute URLs.
5. crawlPage is a recursive function which takes in base url, current url and pages. Pages is an object which keeps track of all the links we've visited and the number of visits that link has had, current URL is the current page link we're crawling. 
6. crawlPage returns the pages object which is then given to the printReport function in report.js
7. printReport takes the pages object, sorts the links by number of visits and then prints the internal link visits in a readable format 
8. After the report, we generate a csv file with generateCSV function which outputs a file called visits.csv
9. Then we can run the generate_visual.py script to create a bar chart
