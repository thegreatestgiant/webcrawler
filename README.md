# webcrawler

A Node.js recursive web crawler that counts internal links per page and prints a sorted report.

Built from Boot.dev's 2023
[How to Build a Web Crawler in JavaScript (Node.js)](https://www.youtube.com/watch?v=C0pXaNchNTA)
tutorial. The current Boot.dev equivalent is
[Build a Web Scraper in TypeScript](https://www.boot.dev/courses/build-web-scraper-typescript).

## What was provided vs. what I wrote

| | |
|---|---|
| Provided by Boot.dev | The tutorial/assignment instructions and expected behavior. There was no starter implementation. |
| Written by me | `crawl.js` (URL normalization, HTML link extraction, recursive crawling), `report.js` (sorting and reporting), `main.js` (CLI), seven Jest tests, and the npm setup. |
| Not provided | No crawler code, tests, or report code. |

## Run

```bash
npm install
node main.js https://example.com
```

The crawler only follows links on the same hostname as the base URL.

## Test

```bash
npm test
```

## Limitations

- Crawls sequentially; there is no concurrency or rate limiting.
- Prints to stdout; it does not persist a report.
- Built as a learning exercise, not a production crawler.
