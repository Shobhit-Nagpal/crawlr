const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsfromHTML } = require("./crawl");

test("Normalized URL for HTTPS + path\\", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test("Normalized URL for HTTPS without path\\", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});


test("Normalized URL for HTTPS + path\\", () => {
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});


test("Normalized URL for HTTP without path\\", () => {
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});


test("Normalized URL for HTTP without any path", () => {
  expect(normalizeURL("http://blog.boot.dev/")).toBe("blog.boot.dev");
});


test("Gets no link from html", () => {
  expect(getURLsfromHTML(`
  <html>
    <body>
    <p>Test</p>
    </body>
  </html>
    `, "https://blog.boot.dev")).toStrictEqual([]);
});

test("Get a link from html", () => {
  expect(getURLsfromHTML(`
  <html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
  </html>
    `, "https://blog.boot.dev")).toStrictEqual(["https://blog.boot.dev/"]);
});

test("Gets multiple links from html", () => {
  expect(getURLsfromHTML(`
  <html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/xyz.html"><span>Go to Boot.dev</span></a>
    </body>
  </html>
    `, "https://blog.boot.dev")).toStrictEqual(["https://blog.boot.dev/", "https://blog.boot.dev/xyz.html"]);
});
