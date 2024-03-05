const jsdom = require("jsdom");
const fetch = require("node-fetch");
const { JSDOM } = jsdom;

function normalizeURL(baseURL) {
  const url = new URL(baseURL);
  if (url.pathname === "/") {
    return url.hostname;
  }
  return url.hostname + "/" + url.pathname.slice(1);
}

function getURLsfromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const links = [];
  dom.window.document.querySelectorAll("a").forEach((link) => {
    let absoluteURL = "";
    if (link.href[0] === "/") {
      absoluteURL = baseURL + link.href.slice(1);
      links.push(absoluteURL);
    } else {
      absoluteURL = link.href;
      links.push(absoluteURL);
    }
  });

  return links;
}

async function crawlPage(baseURL, currentURL, pages) {
  if (new URL(baseURL).hostname !== new URL(currentURL).hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] !== undefined) {
    pages[normalizedCurrentURL] = pages[normalizedCurrentURL] + 1;
    return pages;
  } else {
    try {
      const response = await fetch(currentURL);
      if (response.status >= 400) {
        console.error(
          `Error in fetching ${currentURL}. Status code: ${response.status}`,
        );
        return pages;
      }

      const contentType = response.headers.get("content-type").split(";")[0];
      if (contentType !== "text/html") {
        console.error(
          `Content-Type is not text/html. Recieved ${contentType} on ${currentURL}`,
        );
        return pages;
      }

      pages[normalizedCurrentURL] = 1;
      const body = await response.text();
      const pageURLs = getURLsfromHTML(body, currentURL);
      for (const url in pageURLs) {
        pages = await crawlPage(baseURL, pageURLs[url], pages);
      }
      return pages;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

module.exports = {
  normalizeURL,
  getURLsfromHTML,
  crawlPage,
};
