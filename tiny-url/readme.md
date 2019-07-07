Design a TinyURL service
===
TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/encode-and-decode-tinyurl/ and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

Question to ask the interviewer:
- What's the traffic volume / length of the shortened URL?
- What's the mapping function?
- Single machine or multiple machines?

Analyze
===
- There are around 256^4=4,294,967,296 IP on the internet(IPv4). If we use encoding machanism like base62 [a-zA-Z0-9], 6 charactors, log(256^4)/log(62) = 5.374, are enough to serve all the 256^4 IPs.

Approach 1
===
Use system hash function, e.g. `alias_hash`, to generate a random hashvalue for each URL. Map the hashvalue and corresponding URL into the database.

Pros:
- easy

Cons:
- there might be collisions between URLs(2 urls map to the same hash value)
- it will take so long when the database has millions of records because the records are not in order(sequential). Every time when we search for a record, the database need to traverse all the pages to look for the corresponding record. **Therefore, using incremental IDs might be a possible optimization**

Approach 2
===
Optimizing the approach 1 using the database built-in incremental IDs for hashing instead of hashing a string using `alias_hash`.

Pros:
- faster look up
- hash function is managed by ourselves

Potential Problems
===

How to ensure IDs are incremental on Multiple Machines?
---
When the system is developed to a certain scale, we might need multiple machines, then how to create incremental IDs?
  - if we use Relational Databases, we can use sharding, e.g. Twitter Snowflake, to generate incremental IDs across multiple machines
  - if we use NOSQL, we can use UUID. However, UUID is lengthy.

How to avoid SPAM?
---
- throttle users from creating shortURL from the same IP
- use memcache, e.g. Redis, to cache the URL->HASH. If the annoying user repeatedly wants to create shortURLs for the same URL, we just have to return the cache from Redis such that we wont waste our db records for repeated URLs.

Redirect 301 or 302?
---
301 means the url will be used permanently which is sematically correct. But if we use 301, search engines like Google will directly navigate users to the URL you are referencing so you can't get the actual number of clicks/view from google. Therefore, we should use 302


[My Minimal Implementation](./main.py)

References
---
- http://cn.soulmachine.me/2017-04-10-how-to-design-tinyurl/
- https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/
- https://leetcode.com/problems/encode-and-decode-tinyurl/