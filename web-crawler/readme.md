Design a Web Crawler
===
This is a very common system design question. It is easy to get started, but difficult to scale.

Requirements
---
- design a service which the API returns all the contents(title, date, publish time and url) of articles & tweets for a keyword, e.g. Tesla, on major news website & twitter
- the result should stay update every week
- expect how many writes/month? 100 milion
- expect how many reads/month? 1 trilion

Rough calculation
---
- 100,000,000 / (60 * 60 * 24 * 30) = 38.6 requests to write per second
- 1,000,000,000 / (60 * 60 * 24 * 30) = 386 requests to read per second

Out of scope
---
- search analytics
- stateful result for each user
- page rank

Basic Implementation
---
- get a list of news websites to crawl
- httpget and parse the websites and extract the targert information(in this case its just the urls) to db
- use NoSQL for storing the scrapping result, so we can avoid duplicate scrapping on specific websites. i.e. to avoid run on a cyclic graph
  ```
  the minimal schema looks like this:
  {
    key: // the URL,
    scrap_time: // timestamp of scrapping last time,
    content: // our target result
  }
  ```
- extract the potential urls for further scrapping
- add the potential urls to the pool for further scrapping
- scrap until the websites in the pool are all crawled
- use a cronjob to scrap the items again every week
- implemet a RESTful API endpoint for users to get the search result
  ```
  Endpoint:
  https://crawler.com/api/v1/search?query=tesla

  Response:
  [{
    "title": "foo's title",
    "snippet": "foo's snippet",
    "link": "https://foo.com",
  },
  {
    "title": "bar's title",
    "snippet": "bar's snippet",
    "link": "https://bar.com",
  },
  ...]
  ```

Problems
---
- there are too many websites, it takes so long to scrap
- some websites have rate limit for access, throttling
- lower/upper case, typo?

Optimization
---
- to speed up the scrapping process, we should scrap the websites parallel on multiple machines with different public IPs to circumvent the throttling limit. Remember to avoid duplicates by check if the urls existed in db/Redis.
- to scale the service, it is possible to use a load balancer to distribute the read requests. At this point, it is also possbile to cache the result in Redis.
- use message queue, e.g. rabbitmq/kafka, to manage the crawling process(urls pool), because:
  - when there is an failure, we can retry
  - we can update and deploy the codebase even though there are still urls in the pool. e.g. imagine if we save all the pending tasks in memory, all the pending tasks will be gone if we update our codebase.

Reference:
---
- https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/web_crawler
- http://blog.gainlo.co/index.php/2016/06/29/build-web-crawler/