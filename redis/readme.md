Build a Redis
===
When Redis is used as a cache, often it is handy to let it automatically evict old data as you add new one. There are different kind of policies we can choose for caching. In this repo we are going to discuss the most common 2 for study, [LRU Cache and LFU Cache](https://redis.io/topics/lru-cache)

LRU Cache(Least Recently Used Cache)
---
`get(key)`
- Get the value (an object) of the key if the key exists in the cache, otherwise return -1

`put(key, value)`
- Set the value if the key is not already present
- Update the value if they key is present
- When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item

Expected Time Complexity: O(1) for both operations

Example:
```
LRUCache cache = new LRUCache( 2 /* capacity */ );
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```


**Thought Process:**
1. use a hashtable to store the key & value to archieve put & get Time = O(1)
2. however, we want to prioritize the items by its **recency**
    1. we need a sorted array(sorted by recency), i.e. arr = arr[i]+arr[i+1]+target
    2. but how to find the key value in the sorted array? what if we store the key & index such that we can loop up from the arr easier. the look up(from arr) complexity is O(1)
3. but wait, if we remove any item from the array, we need to update the hashtable, the set time complexity will be O(n)
4. what if we store a key & the pointer of the arr in the hashtable? such that it can remove itself from the arr?
5. but then we will take O(n) to iterate the array and remove the target item...
6. oh what if we use a doubly linked list? so when we remove an item, we can just look up the node pointer(doubly linked list) from the hashtable, then set
    ```
    node.prev.next = node.next
    node.next.prev = node.prev
    ```
7. then both operations(put & get) will be O(1) time 🎉🎉🎉

8. [Here is my implementation in JS](./lru-cache.js)

LFU Cache(Least Frequently Used Cache)
---
`get(key)`
- Get the value (an object) of the key if the key exists in the cache, otherwise return -1

`put(key, value)` 
- Set the value if the key is not already present
- Update the value if they key is present
- When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item

Example:
```
LFUCache cache = new LFUCache( 2 /* capacity */ );
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.get(3);       // returns 3.
cache.put(4, 4);    // evicts key 1.
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

**Initail Thought**
1. use a hashtable to store the key & value to archieve put & get Time = O(1)
2. however, we want to prioritize the items by its **frequency**.
3. the easiest way is to use an array of doubly linked list
    1. When a node gets called, move it to the next array(when occurence+1, move the node from arr[i] to arr[i+1]
    2. but if most of the nodes occur more than once and no new nodes are inserted, it takes O(n) time to look up the first item to delete, it is not quite efficient
4. what if we use a min-heap? such that the least frequently used key&value is sorted to the root of the [Binary Heap](https://en.wikipedia.org/wiki/Binary_heap). The operation time complexity is O(logn)
5. if we want to make it O(1), we can use another doubly linked list instead of a heap. But then it will be a 2D doubly linked list, it is too hard to implement.

4. implementation
    - [Here is my implementation using an array of doubly linked list](./lfu-cache.js)
    - [Here is my implementation using a heap](./lfu-cache.js)