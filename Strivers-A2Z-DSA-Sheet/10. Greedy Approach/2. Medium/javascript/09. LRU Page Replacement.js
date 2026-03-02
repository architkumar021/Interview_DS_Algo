/*
Question:
Given a sequence of page references and a fixed number of page frames, find the number of page faults
using the LRU (Least Recently Used) Page Replacement algorithm.

In LRU, when a page fault occurs and all frames are full, the page that was least recently used
(i.e., not used for the longest time in the past) is replaced.

Example:
Input:
frames = 3
pages  = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
Output: 7 (page faults)

Approach (Brute Force — O(N * frames)):
- Maintain a Set to represent pages currently in memory.
- For each page reference:
  - If the page is already in frames → HIT, no fault.
  - If NOT in frames → FAULT, increment counter.
    - If frames are full: scan backwards from the current index to find which
      page in memory was used least recently, then evict it.
    - Insert the new page.

Complexity Analysis:
- Time Complexity: O(N * frames) — for each fault, scan backwards to find LRU page.
- Space Complexity: O(frames) — to store pages currently in memory.

Code:
*/

// ── Brute Force ──────────────────────────────────────────────────────────────
function lruPageFaultsBrute(pages, capacity) {
    const frames = new Set(); // pages currently in memory
    let pageFaults = 0;

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        if (!frames.has(page)) {
            // Page fault
            pageFaults++;

            if (frames.size === capacity) {
                // Find the LRU page by scanning backwards
                let lruPage = -1;
                for (let j = i - 1; j >= 0; j--) {
                    if (frames.has(pages[j])) {
                        lruPage = pages[j];
                        break;
                    }
                }
                frames.delete(lruPage); // evict least recently used page
            }

            frames.add(page); // bring new page into memory
        }
        // HIT: page already in frames — no action needed for brute force
    }

    return pageFaults;
}

// ── Optimal Solution — O(N) using Map (insertion order) ──────────────────────
/*
Approach:
- Use a Map to maintain pages in order of recent use.
  In JavaScript, Map preserves insertion order — the FIRST key inserted is the oldest (LRU).
- Use a Set or Map for O(1) lookup.

For each page reference:
  - HIT  (page in Map): Delete and re-insert it so it moves to the END (most recently used).
  - MISS (page not in Map): Page fault — increment counter.
    - If frames full: delete the FIRST entry in the Map (least recently used).
    - Insert new page at the END.

Key insight: Map's first key = LRU, last key = MRU.
  - delete + re-insert = O(1) move to "most recently used" end.
  - Map.keys().next().value = O(1) get least recently used.

Complexity Analysis:
- Time Complexity: O(N) — each page reference processed in O(1).
- Space Complexity: O(frames) — Map stores at most `capacity` entries.

Code:
*/

function lruPageFaultsOptimal(pages, capacity) {
    const map = new Map(); // key = page, maintained in LRU → MRU order
    let pageFaults = 0;

    for (const page of pages) {
        if (map.has(page)) {
            // HIT: move to most recently used (end of map)
            map.delete(page);
            map.set(page, true);

        } else {
            // MISS: page fault
            pageFaults++;

            if (map.size === capacity) {
                // Evict LRU page — first key in the Map
                const lruPage = map.keys().next().value;
                map.delete(lruPage);
            }

            // Insert new page as most recently used (end of map)
            map.set(page, true);
        }
    }

    return pageFaults;
}

// ──  Solution — LRUCache class using DLL + HashMap ───────────────
/*
Approach:
The intuition is to keep the most recently used pages quickly accessible and always
evict the least recently used page when the cache is full.

Data structures used:
  - Doubly Linked List (DLL): maintains usage order.
      HEAD <-> [MRU] <-> ... <-> [LRU] <-> TAIL
      Most recently used node sits right after HEAD.
      Least recently used node sits right before TAIL.
  - HashMap (page -> DLL node): provides O(1) lookup of any page.

Operations:
  get(page):
    - If page exists in map → move its node to the front (MRU position) → return value (HIT).
    - If not → return -1 (cache miss).

  put(page, value):
    - If page already exists → update value and move node to front.
    - If page does not exist → create new node, insert at front, add to map.
    - If cache exceeds capacity → remove node just before TAIL (LRU), delete from map.

Why dummy HEAD and TAIL nodes?
  - They act as sentinel boundaries so we never need null checks during
    insertions and deletions at the ends of the list.

Complexity Analysis:
  - get()  : O(1) — HashMap lookup + DLL move to front.
  - put()  : O(1) — HashMap insert + DLL insert/remove.
  - Space  : O(capacity) — at most `capacity` nodes in DLL + HashMap.

Code:
*/

class DLLNode {
    constructor(key, val) {
        this.key  = key;
        this.val  = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();        // page -> DLL node

        // Dummy sentinel nodes
        this.head = new DLLNode(-1, -1); // before MRU
        this.tail = new DLLNode(-1, -1); // after LRU
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Remove a node from the DLL (does NOT delete it)
    #removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Insert a node right after HEAD (MRU position)
    #insertAtFront(node) {
        node.next       = this.head.next;
        node.prev       = this.head;
        this.head.next.prev = node;
        this.head.next  = node;
    }

    // Returns value if page exists (HIT), else -1 (MISS)
    get(page) {
        if (!this.map.has(page)) return -1; // cache miss

        // Move accessed node to front (most recently used)
        const node = this.map.get(page);
        this.#removeNode(node);
        this.#insertAtFront(node);
        return node.val;
    }

    // Insert/update a page in the cache
    put(page, value) {
        if (this.map.has(page)) {
            // Page exists — update value and move to front
            const node = this.map.get(page);
            node.val = value;
            this.#removeNode(node);
            this.#insertAtFront(node);
        } else {
            // New page
            if (this.map.size === this.capacity) {
                // Evict LRU — node just before TAIL
                const lruNode = this.tail.prev;
                this.map.delete(lruNode.key);
                this.#removeNode(lruNode);
            }
            // Insert new node at front (MRU position)
            const newNode = new DLLNode(page, value);
            this.#insertAtFront(newNode);
            this.map.set(page, newNode);
        }
    }

    // Count page faults for a given page reference string
    countPageFaults(pages) {
        let pageFaults = 0;
        for (const page of pages) {
            if (this.get(page) === -1) {
                // MISS: page not in cache — page fault
                pageFaults++;
                this.put(page, page); // load page into cache
            }
            // HIT: get() already moved it to MRU position
        }
        return pageFaults;
    }
}

// ── Example Usage ─────────────────────────────────────────────────────────────
const pages1 = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
const capacity1 = 3;
console.log("Brute Force  - Page Faults:", lruPageFaultsBrute(pages1, capacity1));    // 7
console.log("Optimal      - Page Faults:", lruPageFaultsOptimal(pages1, capacity1));  // 7
console.log("TUF (DLL)    - Page Faults:", new LRUCache(capacity1).countPageFaults(pages1)); // 7

const pages2 = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
const capacity2 = 3;
console.log("\nBrute Force  - Page Faults:", lruPageFaultsBrute(pages2, capacity2));    // 8
console.log("Optimal      - Page Faults:", lruPageFaultsOptimal(pages2, capacity2));    // 8
console.log("TUF (DLL)    - Page Faults:", new LRUCache(capacity2).countPageFaults(pages2)); // 8


// Class representing the LRU Cache
class LRUCache {
    // Constructor to initialize LRU cache
    constructor(capacity) {
        // Node constructor function
        this.Node = function (_key, _val) {
            return { key: _key, val: _val, next: null, prev: null };
        };

        // Head and tail dummy nodes
        this.head = this.Node(-1, -1);
        this.tail = this.Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;

        // Capacity of cache
        this.cap = capacity;
        // Hash map to store key-node mapping
        this.m = new Map();
    }

    // Function to add a node right after head
    addNode(newNode) {
        let temp = this.head.next;
        newNode.next = temp;
        newNode.prev = this.head;
        this.head.next = newNode;
        temp.prev = newNode;
    }

    // Function to remove a given node from list
    deleteNode(delNode) {
        let delPrev = delNode.prev;
        let delNext = delNode.next;
        delPrev.next = delNext;
        delNext.prev = delPrev;
    }

    // Function to get value from cache
    get(key_) {
        // If key exists in cache
        if (this.m.has(key_)) {
            let resNode = this.m.get(key_);
            let res = resNode.val;
            // Remove old mapping
            this.m.delete(key_);
            // Move accessed node to front
            this.deleteNode(resNode);
            this.addNode(resNode);
            // Update map
            this.m.set(key_, this.head.next);
            return res;
        }
        // If not found
        return -1;
    }

    // Function to put key-value into cache
    put(key_, value) {
        // If key already exists
        if (this.m.has(key_)) {
            let existingNode = this.m.get(key_);
            this.m.delete(key_);
            this.deleteNode(existingNode);
        }
        // If capacity reached
        if (this.m.size === this.cap) {
            this.m.delete(this.tail.prev.key);
            this.deleteNode(this.tail.prev);
        }
        // Insert new node at front
        this.addNode(this.Node(key_, value));
        this.m.set(key_, this.head.next);
    }
}

// Driver code
let cache = new LRUCache(2);

// Put values in cache
cache.put(1, 1);
cache.put(2, 2);

// Get value for key 1
console.log(cache.get(1));

// Insert another key (evicts key 2)
cache.put(3, 3);

// Key 2 should be evicted
console.log(cache.get(2));

// Insert another key (evicts key 1)
cache.put(4, 4);

// Key 1 should be evicted
console.log(cache.get(1));

// Key 3 should be present
console.log(cache.get(3));

// Key 4 should be present
console.log(cache.get(4));
