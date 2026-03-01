/*
Question:
Given a sequence of page references and a fixed number of page frames, find the number of page faults
using the LRU (Least Recently Used) Page Replacement algorithm.

In LRU, when a page fault occurs and all frames are full, the page that was least recently used
(i.e., not used for the longest time) is replaced.

Example:
Input:
frames = 3
pages  = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2}
Output: 7 (page faults)

Approach (Brute Force — O(N * frames)):
- Maintain a list/set to represent current pages in memory (frames).
- For each page reference:
  - If the page is already in frames → HIT, no fault, but update its recent-use order.
  - If the page is NOT in frames → FAULT, increment counter.
    - If frames are full, remove the page that was used least recently.
    - Add the new page.
- Track "last used time" by scanning backwards in the page reference array.

Complexity Analysis:
- Time Complexity: O(N * frames) — for each fault, we scan to find LRU page.
- Space Complexity: O(frames) — to store pages currently in memory.

Code:
*/

#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <list>
using namespace std;

// ── Brute Force ──────────────────────────────────────────────────────────────
// Find the page in frames that was used least recently by scanning backwards
int findLRU(vector<int>& pages, int currentIndex, unordered_set<int>& frames) {
    int lruPage = -1, lruTime = currentIndex;

    for (int page : frames) {
        // Scan backwards from currentIndex to find last use of this page
        int lastUsed = -1;
        for (int j = currentIndex - 1; j >= 0; j--) {
            if (pages[j] == page) {
                lastUsed = j;
                break;
            }
        }
        // The page with the smallest (earliest) lastUsed is LRU
        if (lastUsed < lruTime) {
            lruTime = lastUsed;
            lruPage = page;
        }
    }
    return lruPage;
}

int lruPageFaultsBrute(vector<int>& pages, int capacity) {
    unordered_set<int> frames;  // pages currently in memory
    int pageFaults = 0;

    for (int i = 0; i < (int)pages.size(); i++) {
        int page = pages[i];

        if (frames.find(page) == frames.end()) {
            // Page fault
            pageFaults++;

            if ((int)frames.size() == capacity) {
                // Remove the LRU page
                int lruPage = findLRU(pages, i, frames);
                frames.erase(lruPage);
            }
            frames.insert(page);
        }
        // If page already in frames → hit, no action needed for brute force
    }

    return pageFaults;
}

// ── Optimal Solution — O(N) using Doubly Linked List + Hash Map ──────────────
/*
Approach:
- Use a doubly linked list (DLL) to maintain the order of page usage:
    - Most recently used page is at the FRONT.
    - Least recently used page is at the BACK.
- Use a hash map (page → iterator in DLL) for O(1) lookup.

For each page reference:
  - HIT  (page in map): Move the page to the FRONT of the list (most recently used).
  - MISS (page not in map): Page fault — increment counter.
    - If frames full: remove the page at the BACK (LRU), erase from map.
    - Insert new page at the FRONT, add to map.

Key insight: DLL allows O(1) insert/remove; hash map gives O(1) lookup.

Complexity Analysis:
- Time Complexity: O(N) — each page reference is processed in O(1).
- Space Complexity: O(frames) — DLL + hash map store at most `capacity` entries.

Code:
*/

int lruPageFaultsOptimal(vector<int>& pages, int capacity) {
    list<int> dll;                              // front = MRU, back = LRU
    unordered_map<int, list<int>::iterator> mp; // page -> position in DLL
    int pageFaults = 0;

    for (int page : pages) {
        if (mp.find(page) != mp.end()) {
            // HIT: move this page to the front (most recently used)
            dll.erase(mp[page]);
            dll.push_front(page);
            mp[page] = dll.begin();

        } else {
            // MISS: page fault
            pageFaults++;

            if ((int)dll.size() == capacity) {
                // Remove LRU page (back of the list)
                int lruPage = dll.back();
                dll.pop_back();
                mp.erase(lruPage);
            }

            // Insert new page at front (most recently used)
            dll.push_front(page);
            mp[page] = dll.begin();
        }
    }

    return pageFaults;
}

// ── Solution — LRUCache class using DLL + HashMap ───────────────
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

  put(page):
    - If page already exists → update and move to front.
    - If page does not exist → create new node, insert at front, add to map.
    - If cache exceeds capacity → remove the node just before TAIL (LRU), erase from map.

Why dummy HEAD and TAIL nodes?
  - They act as sentinel boundaries so we never have to do null checks during
    insertions and deletions at the ends of the list.

Complexity Analysis:
  - get()  : O(1) — HashMap lookup + DLL move to front.
  - put()  : O(1) — HashMap insert + DLL insert/remove.
  - Space  : O(capacity) — at most `capacity` nodes in DLL + HashMap.

Code:
*/

struct DLLNode {
    int key, val;
    DLLNode* prev;
    DLLNode* next;
    DLLNode(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
private:
    int capacity;
    unordered_map<int, DLLNode*> mp;  // page -> node in DLL
    DLLNode* head;                    // dummy head (before MRU)
    DLLNode* tail;                    // dummy tail (after LRU)

    // Remove a node from the DLL (does NOT delete it)
    void removeNode(DLLNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    // Insert a node right after HEAD (MRU position)
    void insertAtFront(DLLNode* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int cap) : capacity(cap) {
        // Initialise dummy sentinel nodes
        head = new DLLNode(-1, -1);
        tail = new DLLNode(-1, -1);
        head->next = tail;
        tail->prev = head;
    }

    // Returns value if page exists (HIT), else -1 (MISS)
    int get(int page) {
        if (mp.find(page) == mp.end()) return -1; // cache miss

        // Move accessed node to front (most recently used)
        DLLNode* node = mp[page];
        removeNode(node);
        insertAtFront(node);
        return node->val;
    }

    // Insert/update a page in the cache
    void put(int page, int value) {
        if (mp.find(page) != mp.end()) {
            // Page exists — update value and move to front
            DLLNode* node = mp[page];
            node->val = value;
            removeNode(node);
            insertAtFront(node);
        } else {
            // New page
            if ((int)mp.size() == capacity) {
                // Evict LRU — node just before TAIL
                DLLNode* lruNode = tail->prev;
                mp.erase(lruNode->key);
                removeNode(lruNode);
                delete lruNode;
            }
            // Insert new node at front (MRU position)
            DLLNode* newNode = new DLLNode(page, value);
            insertAtFront(newNode);
            mp[page] = newNode;
        }
    }

    // Count page faults for a given page reference string
    int countPageFaults(vector<int>& pages) {
        int pageFaults = 0;
        for (int page : pages) {
            if (get(page) == -1) {
                // MISS: page not in cache — page fault
                pageFaults++;
                put(page, page); // load page into cache
            }
            // HIT: get() already moved it to MRU position
        }
        return pageFaults;
    }
};

// ── Main ─────────────────────────────────────────────────────────────────────
int main() {
    vector<int> pages = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2};
    int capacity = 3;

    cout << "Brute Force  - Page Faults: " << lruPageFaultsBrute(pages, capacity) << endl;   // 7
    cout << "Optimal      - Page Faults: " << lruPageFaultsOptimal(pages, capacity) << endl; // 7

    LRUCache cache1(capacity);
    cout << "TUF (DLL)    - Page Faults: " << cache1.countPageFaults(pages) << endl;         // 7

    // Additional test
    vector<int> pages2 = {1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5};
    int capacity2 = 3;
    cout << "\nBrute Force  - Page Faults: " << lruPageFaultsBrute(pages2, capacity2) << endl;   // 8
    cout << "Optimal      - Page Faults: " << lruPageFaultsOptimal(pages2, capacity2) << endl;   // 8

    LRUCache cache2(capacity2);
    cout << "TUF (DLL)    - Page Faults: " << cache2.countPageFaults(pages2) << endl;            // 8

    return 0;
}

