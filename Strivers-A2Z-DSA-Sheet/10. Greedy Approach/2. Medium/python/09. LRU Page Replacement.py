"""
Question:
Given a sequence of page references and a fixed number of page frames, find the number of page faults
using the LRU (Least Recently Used) Page Replacement algorithm.

In LRU, when a page fault occurs and all frames are full, the page that was least recently used
(i.e., not used for the longest time in the past) is replaced.

Example:
Input:
frames   = 3
pages    = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
Output: 7 (page faults)

Approach (Brute Force — O(N * frames)):
- Maintain a set to represent pages currently in memory.
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
"""

from collections import OrderedDict


# ── Brute Force ──────────────────────────────────────────────────────────────
def lru_page_faults_brute(pages: list[int], capacity: int) -> int:
    frames = set()   # pages currently in memory
    page_faults = 0

    for i, page in enumerate(pages):
        if page not in frames:
            # Page fault
            page_faults += 1

            if len(frames) == capacity:
                # Find the LRU page by scanning backwards from current index
                lru_page = -1
                for j in range(i - 1, -1, -1):
                    if pages[j] in frames:
                        lru_page = pages[j]
                        break
                frames.discard(lru_page)  # evict least recently used page

            frames.add(page)  # bring new page into memory
        # HIT: page already in frames — no action needed

    return page_faults


# ── Optimal Solution — O(N) using OrderedDict ────────────────────────────────
"""
Approach:
- Use an OrderedDict to maintain pages in order of recent use.
  - The FIRST key = Least Recently Used (LRU).
  - The LAST key  = Most Recently Used (MRU).

For each page reference:
  - HIT  (page in dict): Move it to the END using move_to_end() — O(1).
  - MISS (page not in dict): Page fault — increment counter.
    - If frames full: popitem(last=False) removes the FIRST item (LRU) — O(1).
    - Insert new page at the END (MRU position).

Key insight:
  - OrderedDict.move_to_end(key)       → mark as most recently used — O(1)
  - OrderedDict.popitem(last=False)    → evict least recently used   — O(1)

Complexity Analysis:
- Time Complexity: O(N) — each page reference processed in O(1).
- Space Complexity: O(frames) — OrderedDict stores at most `capacity` entries.

Code:
"""

def lru_page_faults_optimal(pages: list[int], capacity: int) -> int:
    cache = OrderedDict()  # maintained in LRU → MRU order
    page_faults = 0

    for page in pages:
        if page in cache:
            # HIT: move to most recently used (end)
            cache.move_to_end(page)

        else:
            # MISS: page fault
            page_faults += 1

            if len(cache) == capacity:
                # Evict LRU page — first item in OrderedDict
                cache.popitem(last=False)

            # Insert new page as most recently used (end)
            cache[page] = True

    return page_faults


# ── TakeUForward Solution — LRUCache class using DLL + HashMap ───────────────
"""
Approach :
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
    - If page exists in map → move its node to front (MRU position) → return value (HIT).
    - If not → return -1 (cache miss).

  put(page, value):
    - If page already exists → update value and move node to front.
    - If page does not exist → create new node, insert at front, add to map.
    - If cache exceeds capacity → remove node just before TAIL (LRU), delete from map.

Why dummy HEAD and TAIL nodes?
  - They act as sentinel boundaries so we never need None-checks during
    insertions and deletions at the ends of the list.

Complexity Analysis:
  - get()  : O(1) — HashMap lookup + DLL move to front.
  - put()  : O(1) — HashMap insert + DLL insert/remove.
  - Space  : O(capacity) — at most `capacity` nodes in DLL + HashMap.

Code:
"""

class DLLNode:
    def __init__(self, key: int, val: int):
        self.key  = key
        self.val  = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.mp = {}                        # page -> DLL node

        # Dummy sentinel nodes
        self.head = DLLNode(-1, -1)         # before MRU
        self.tail = DLLNode(-1, -1)         # after LRU
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove_node(self, node: DLLNode):
        """Remove a node from the DLL (does NOT delete it)."""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_at_front(self, node: DLLNode):
        """Insert a node right after HEAD (MRU position)."""
        node.next           = self.head.next
        node.prev           = self.head
        self.head.next.prev = node
        self.head.next      = node

    def get(self, page: int) -> int:
        """Returns value if page exists (HIT), else -1 (MISS)."""
        if page not in self.mp:
            return -1  # cache miss

        # Move accessed node to front (most recently used)
        node = self.mp[page]
        self._remove_node(node)
        self._insert_at_front(node)
        return node.val

    def put(self, page: int, value: int):
        """Insert or update a page in the cache."""
        if page in self.mp:
            # Page exists — update value and move to front
            node = self.mp[page]
            node.val = value
            self._remove_node(node)
            self._insert_at_front(node)
        else:
            # New page
            if len(self.mp) == self.capacity:
                # Evict LRU — node just before TAIL
                lru_node = self.tail.prev
                del self.mp[lru_node.key]
                self._remove_node(lru_node)

            # Insert new node at front (MRU position)
            new_node = DLLNode(page, value)
            self._insert_at_front(new_node)
            self.mp[page] = new_node

    def count_page_faults(self, pages: list[int]) -> int:
        """Count page faults for a given page reference string."""
        page_faults = 0
        for page in pages:
            if self.get(page) == -1:
                # MISS: page not in cache — page fault
                page_faults += 1
                self.put(page, page)  # load page into cache
            # HIT: get() already moved it to MRU position
        return page_faults


# ── Example Usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    pages1 = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
    capacity1 = 3
    print("Brute Force  - Page Faults:", lru_page_faults_brute(pages1, capacity1))    # 7
    print("Optimal      - Page Faults:", lru_page_faults_optimal(pages1, capacity1))  # 7
    print("TUF (DLL)    - Page Faults:", LRUCache(capacity1).count_page_faults(pages1))  # 7

    pages2 = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
    capacity2 = 3
    print("\nBrute Force  - Page Faults:", lru_page_faults_brute(pages2, capacity2))    # 8
    print("Optimal      - Page Faults:", lru_page_faults_optimal(pages2, capacity2))    # 8
    print("TUF (DLL)    - Page Faults:", LRUCache(capacity2).count_page_faults(pages2))  # 8

