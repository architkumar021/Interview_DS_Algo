# 🏔️ Heap / Priority Queue — Complete Introduction Guide

> A comprehensive quick-reference guide covering everything about Heaps: terminology, types, array representation, operations, heap sort, priority queues, key patterns, tricks, and when to use what.

---

## 📚 Table of Contents

1. [What is a Heap?](#1-what-is-a-heap)
2. [Heap Terminology](#2-heap-terminology)
3. [Types of Heaps](#3-types-of-heaps)
4. [Array Representation of a Heap](#4-array-representation-of-a-heap)
5. [Heap Operations](#5-heap-operations)
   - [Heapify (Sift Down)](#51-heapify-sift-down)
   - [Bottom-Up Heapify (Sift Up)](#52-bottom-up-heapify-sift-up)
   - [Insert](#53-insert)
   - [Extract Min/Max (Remove Root)](#54-extract-minmax-remove-root)
   - [Peek (Get Min/Max)](#55-peek-get-minmax)
   - [Build Heap from Array](#56-build-heap-from-array)
   - [Delete Arbitrary Element](#57-delete-arbitrary-element)
   - [Decrease Key / Increase Key](#58-decrease-key--increase-key)
6. [Full Min-Heap Implementation](#6-full-min-heap-implementation)
   - [JavaScript](#61-javascript)
   - [Python](#62-python)
7. [Full Max-Heap Implementation](#7-full-max-heap-implementation)
   - [JavaScript](#71-javascript)
   - [Python](#72-python)
8. [Python heapq Module — Built-in Heap](#8-python-heapq-module--built-in-heap)
   - [Basic Operations](#81-basic-operations)
   - [Max-Heap Trick in Python](#82-max-heap-trick-in-python)
   - [Heap with Custom Objects / Tuples](#83-heap-with-custom-objects--tuples)
   - [Useful heapq Functions](#84-useful-heapq-functions)
9. [Heap Sort](#9-heap-sort)
10. [Priority Queue](#10-priority-queue)
11. [Check if Array is a Heap](#11-check-if-array-is-a-heap)
12. [Convert Min-Heap to Max-Heap](#12-convert-min-heap-to-max-heap)
13. [Two-Heap Pattern](#13-two-heap-pattern)
14. [Key Patterns & Tricks for Interviews](#14-key-patterns--tricks-for-interviews)
15. [Common Heap Problem Types](#15-common-heap-problem-types)
16. [Heap vs Other Data Structures](#16-heap-vs-other-data-structures)
17. [Complexity Cheat Sheet](#17-complexity-cheat-sheet)
18. [Common Mistakes](#18-common-mistakes)
19. [Interview Cheat Sheet](#19-interview-cheat-sheet)
20. [Quick Revision Flashcards](#20-quick-revision-flashcards)
21. [Problem Walkthroughs — Quick Revision](#21-problem-walkthroughs--quick-revision)
22. [Problem Map — All Covered Problems](#22-problem-map--all-covered-problems)

---

## 1. What is a Heap?

A **Heap** is a specialized **complete binary tree** that satisfies the **heap property**:

- **Min-Heap:** Every parent node is **≤** its children → root is the **minimum**
- **Max-Heap:** Every parent node is **≥** its children → root is the **maximum**

```
Min-Heap:              Max-Heap:
      2                     90
     / \                   /  \
    5   10               15    10
   / \                  / \   / \
  12   8              7  12  2   6
```

> 🔑 **A Heap is NOT a sorted structure.** It only guarantees that the root is the min (or max). The rest of the tree is partially ordered — just enough to extract the extremum efficiently.

**Key Properties:**
- **Complete Binary Tree** — every level is fully filled except possibly the last, which is filled left to right
- **Heap Property** — parent ≤ children (min-heap) or parent ≥ children (max-heap)
- Stored as an **array** (no pointers needed!)
- Height = **⌊log₂ n⌋** → all operations are O(log n)

---

## 2. Heap Terminology

| Term | Meaning | Example |
|------|---------|---------|
| **Root** | The topmost element (min or max) | `heap[0]` |
| **Complete Binary Tree** | All levels full except last (filled left→right) | Required for array mapping |
| **Heap Property** | Parent ≤ children (min) or ≥ children (max) | Invariant maintained after every operation |
| **Heapify** | Fixing the heap property for a node (sift down) | After removal, fix root downward |
| **Sift Up (Bubble Up)** | Moving a node up to restore heap property | After insertion, fix new leaf upward |
| **Sift Down (Bubble Down)** | Moving a node down to restore heap property | After removal, fix root downward |
| **Extract** | Remove and return the root element | `extractMin()` / `extractMax()` |
| **Peek** | Return root without removing | O(1) |
| **Priority Queue** | Abstract data type; heap is its most common implementation | Higher priority = served first |
| **Internal Node** | A node that has at least one child | Indices 0 to ⌊n/2⌋ - 1 |
| **Leaf Node** | A node with no children | Indices ⌊n/2⌋ to n - 1 |

---

## 3. Types of Heaps

### Based on Ordering

| Type | Property | Root | Use Case |
|------|----------|------|----------|
| **Min-Heap** | Parent ≤ Children | Smallest element | Dijkstra's, merge K sorted, min cost |
| **Max-Heap** | Parent ≥ Children | Largest element | Kth largest, task scheduling |

### Based on Structure

| Type | Description | Notes |
|------|-------------|-------|
| **Binary Heap** | Each node has at most 2 children | Most common; what "heap" usually means |
| **d-ary Heap** | Each node has at most d children | Faster decrease-key, slower extract |
| **Fibonacci Heap** | Amortized O(1) insert & decrease-key | Theoretical; rarely implemented |
| **Binomial Heap** | Collection of binomial trees | Efficient merge |

> 🔑 **In interviews, "heap" always means Binary Heap** unless stated otherwise.

### Min-Heap vs Max-Heap — When to Use Which?

| Scenario | Use | Why |
|----------|-----|-----|
| Kth **largest** element | **Min-Heap** of size K | Root = Kth largest (smallest among top K) |
| Kth **smallest** element | **Max-Heap** of size K | Root = Kth smallest (largest among bottom K) |
| Median in a stream | **Max-Heap + Min-Heap** | Two-heap pattern |
| Merge K sorted lists | **Min-Heap** | Always pick the smallest head |
| Dijkstra's / Prim's | **Min-Heap** | Always pick minimum distance/weight |
| Task scheduling | **Max-Heap** | Pick highest frequency task first |

---

## 4. Array Representation of a Heap

A heap is stored as a **flat array**. For a node at index `i` (0-indexed):

```
Parent:      Math.floor((i - 1) / 2)
Left child:  2 * i + 1
Right child: 2 * i + 2
```

```
Array:  [2, 5, 10, 12, 8]

Tree representation:
           2          ← index 0
          / \
         5   10       ← index 1, 2
        / \
      12    8         ← index 3, 4

Index:  0  1  2   3   4
Value:  2  5  10  12  8

Parent of index 3: floor((3-1)/2) = 1  → value 5 ✓
Left child of index 1: 2*1+1 = 3       → value 12 ✓
Right child of index 1: 2*1+2 = 4      → value 8 ✓
```

> 🔑 **Why arrays?** Complete binary trees have no gaps, so array indices map perfectly to tree positions. No pointers needed → cache-friendly and space-efficient.

### Key Index Facts

```
Total nodes:       n
Last internal node: Math.floor(n/2) - 1   (last node with at least one child)
Leaf nodes:        indices Math.floor(n/2) to n-1
Root:              index 0
Last element:      index n-1
```

### 0-Indexed vs 1-Indexed

Some textbooks use 1-based indexing. Know both:

| | 0-indexed (common) | 1-indexed (textbooks) |
|---|---|---|
| **Root** | `0` | `1` |
| **Parent of i** | `(i - 1) / 2` | `i / 2` |
| **Left child of i** | `2i + 1` | `2i` |
| **Right child of i** | `2i + 2` | `2i + 1` |
| **Last internal node** | `n/2 - 1` | `n/2` |

> 🔑 **Interview tip:** Always clarify which indexing you're using. Most languages (JS, Python, Java) use 0-indexed arrays, so **0-indexed formulas are standard**.

### Mathematical Properties

```
Height of heap with n nodes:        h = ⌊log₂ n⌋
Max nodes in heap of height h:      2^(h+1) - 1    (perfect binary tree)
Min nodes in heap of height h:      2^h             (only root at last level)
Nodes at level k (0-based):         up to 2^k
Number of leaves:                   ⌈n/2⌉
Number of internal nodes:           ⌊n/2⌋
```

#### Why Build Heap is O(n) — The Math

```
Height h = ⌊log₂ n⌋

Nodes at height k:  ≤ ⌈n / 2^(k+1)⌉
Work per node at height k:  O(k)   (sift down at most k levels)

Total work = Σ (k=0 to h) [⌈n/2^(k+1)⌉ × k]
           ≤ n × Σ (k=0 to ∞) [k / 2^(k+1)]
           = n × 1                              (this series converges to 1)
           = O(n) ✅

vs. Insert one-by-one:
  Each insert = O(log n), n inserts = O(n log n) ❌ slower
```

> 🔑 **Interview favorite:** "Why is build heap O(n)?" Answer: Most nodes are at the bottom (leaves do 0 work). The sum of (nodes × height) converges to O(n) because higher levels have exponentially fewer nodes.

---

## 5. Heap Operations

### 5.1 Heapify (Sift Down)

Fix the heap property for a node by moving it **downward**. Compare with children and swap with the smaller (min-heap) or larger (max-heap) child.

```
Before heapify(0):       After heapify(0):
       20                       5
      / \                      / \
     5   10        →         8    10
    / \                     / \
   12   8                 12   20
```

```javascript
// JavaScript — Min-Heap Heapify (Sift Down)
function heapify(arr, node, n) {
    let smallest = node;
    let left = 2 * node + 1;
    let right = 2 * node + 2;

    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }
    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }
    if (smallest !== node) {
        [arr[node], arr[smallest]] = [arr[smallest], arr[node]];
        heapify(arr, smallest, n);
    }
}
```

```python
# Python — Min-Heap Heapify (Sift Down)
def heapify(arr, node, n):
    smallest = node
    left = 2 * node + 1
    right = 2 * node + 2

    if left < n and arr[left] < arr[smallest]:
        smallest = left
    if right < n and arr[right] < arr[smallest]:
        smallest = right
    if smallest != node:
        arr[node], arr[smallest] = arr[smallest], arr[node]
        heapify(arr, smallest, n)
```

**Time:** O(log n) — at most travels the height of the tree

---

### 5.2 Bottom-Up Heapify (Sift Up)

Fix the heap property by moving a node **upward**. Compare with parent and swap if smaller (min-heap) or larger (max-heap).

```
Before siftUp(4):        After siftUp:
       5                       1
      / \                     / \
     8   10       →          5   10
    / \                     / \
   12   1                 12    8
```

```javascript
// JavaScript — Min-Heap Sift Up
function siftUp(arr, node) {
    let parent = Math.floor((node - 1) / 2);
    if (parent >= 0 && arr[parent] > arr[node]) {
        [arr[parent], arr[node]] = [arr[node], arr[parent]];
        siftUp(arr, parent);
    }
}
```

```python
# Python — Min-Heap Sift Up
def sift_up(arr, node):
    parent = (node - 1) // 2
    if parent >= 0 and arr[parent] > arr[node]:
        arr[parent], arr[node] = arr[node], arr[parent]
        sift_up(arr, parent)
```

**Time:** O(log n) — at most travels from leaf to root

---

### 5.3 Insert

Add a new element: push to the **end** of the array, then **sift up**.

```
Insert 1 into [2, 5, 10, 12, 8]:

Step 1: Push to end     Step 2: Sift up
  [2, 5, 10, 12, 8, 1]    [1, 5, 2, 12, 8, 10]

       2                        1
      / \                      / \
     5   10        →          5    2
    / \  /                   / \  /
   12  8 1                 12  8 10
```

```javascript
// Insert into min-heap
insert(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
}
```

**Time:** O(log n)

---

### 5.4 Extract Min/Max (Remove Root)

Remove the root: replace root with **last element**, pop the last, then **heapify (sift down)** from root.

```
Extract min from [1, 5, 2, 12, 8, 10]:

Step 1: Swap root & last   Step 2: Remove last   Step 3: Heapify root
  [10, 5, 2, 12, 8, 1]     [10, 5, 2, 12, 8]     [2, 5, 10, 12, 8]

       10                        10                       2
      / \                       / \                      / \
     5    2          →         5    2         →         5   10
    / \  /                    / \                      / \
   12  8 1                  12   8                   12   8
```

```javascript
// Extract min from min-heap
extractMin() {
    if (this.heap.length === 0) return null;
    let min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    if (this.heap.length > 0) this._heapify(0);
    return min;
}
```

**Time:** O(log n)

---

### 5.5 Peek (Get Min/Max)

Return the root element without removing it.

```javascript
peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
}
```

**Time:** O(1)

---

### 5.6 Build Heap from Array

Convert an arbitrary array into a heap. Start from the **last internal node** and heapify each node bottom-up.

```
Array: [20, 12, 10, 5, 8, 2]

Start from last internal node: floor(6/2) - 1 = index 2

Heapify index 2 (10):  10 vs 2 → swap       → [20, 12, 2, 5, 8, 10]
Heapify index 1 (12):  12 vs 5 → swap        → [20, 5, 2, 12, 8, 10]
Heapify index 0 (20):  20 vs 2 → swap, recurse → [2, 5, 10, 12, 8, 20]
```

```javascript
// JavaScript — Build Min-Heap
function buildHeap(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, i, n);
    }
}
```

```python
# Python — Build Min-Heap
def build_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, i, n)

# Or simply use heapq:
import heapq
heapq.heapify(arr)  # In-place, O(n)
```

**Time:** O(n) — NOT O(n log n)!

 > 🔑 **Why O(n)?** Most nodes are near the bottom of the tree. Leaves (half the nodes) need 0 work. The math: Σ(height × nodes at that level) = O(n). This is a classic interview question!

---

### 5.7 Delete Arbitrary Element

To delete an element at index `i` (not the root):

```
1. Replace heap[i] with the LAST element
2. Remove the last element
3. Sift down OR sift up from index i (depending on new value vs parent/children)
```

```javascript
// Min-Heap — Delete element at index i
function deleteAt(heap, i) {
    let n = heap.length;
    if (i >= n) return;

    heap[i] = heap[n - 1];       // Replace with last
    heap.pop();                    // Remove last

    if (i < heap.length) {
        // Try sift down first, then sift up
        siftDown(heap, i, heap.length);
        siftUp(heap, i);
    }
}
```

```python
# Python — Delete arbitrary (for custom heap, not heapq)
def delete_at(heap, i):
    n = len(heap)
    if i >= n:
        return
    heap[i] = heap[-1]
    heap.pop()
    if i < len(heap):
        sift_down(heap, i, len(heap))
        sift_up(heap, i)
```

**Time:** O(n) to find + O(log n) to fix = **O(n)** overall (finding the index is the bottleneck)

> 🔑 **If you know the index**, deletion is O(log n). The O(n) comes from searching. Use an **index map** (hash map of value → index) to make it O(log n) total.

---

### 5.8 Decrease Key / Increase Key

Change the value of an element and restore the heap property.

```
Decrease Key (Min-Heap):  Make value smaller → sift UP   (it might be smaller than parent now)
Increase Key (Min-Heap):  Make value larger  → sift DOWN (it might be larger than children now)

Decrease Key (Max-Heap):  Make value smaller → sift DOWN
Increase Key (Max-Heap):  Make value larger  → sift UP
```

```javascript
// Min-Heap — Decrease Key
function decreaseKey(heap, i, newVal) {
    if (newVal > heap[i]) return;  // Can only decrease
    heap[i] = newVal;
    siftUp(heap, i);               // Might need to move up
}

// Min-Heap — Increase Key
function increaseKey(heap, i, newVal) {
    if (newVal < heap[i]) return;  // Can only increase
    heap[i] = newVal;
    siftDown(heap, i, heap.length); // Might need to move down
}
```

```python
# Python — Decrease Key (Min-Heap)
def decrease_key(heap, i, new_val):
    if new_val > heap[i]:
        return
    heap[i] = new_val
    sift_up(heap, i)

# Python — Increase Key (Min-Heap)
def increase_key(heap, i, new_val):
    if new_val < heap[i]:
        return
    heap[i] = new_val
    sift_down(heap, i, len(heap))
```

**Time:** O(log n)

> 🔑 **Where is this used?**
> - **Dijkstra's Algorithm:** When a shorter path to a node is found, decrease its key in the min-heap.
> - **Prim's MST:** When a cheaper edge to a node is found, decrease its key.
> - In practice (Python/JS), we often just push a new entry and use **lazy deletion** instead, since `heapq` doesn't support decrease-key natively.

---

## 6. Full Min-Heap Implementation

### 6.1 JavaScript

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // --- Index helpers ---
    _parent(i)  { return Math.floor((i - 1) / 2); }
    _left(i)    { return 2 * i + 1; }
    _right(i)   { return 2 * i + 2; }

    // --- Core operations ---
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    _siftUp(idx) {
        while (idx > 0) {
            let parent = this._parent(idx);
            if (this.heap[parent] <= this.heap[idx]) break;
            this._swap(parent, idx);
            idx = parent;
        }
    }

    _siftDown(idx) {
        let n = this.heap.length;
        while (true) {
            let smallest = idx;
            let left = this._left(idx);
            let right = this._right(idx);

            if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;

            if (smallest === idx) break;
            this._swap(idx, smallest);
            idx = smallest;
        }
    }

    // --- Public API ---
    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        let min = this.heap[0];
        let last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return min;
    }

    peek()    { return this.heap.length > 0 ? this.heap[0] : null; }
    size()    { return this.heap.length; }
    isEmpty() { return this.heap.length === 0; }
}
```

### 6.2 Python

```python
class MinHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, i):  return (i - 1) // 2
    def _left(self, i):    return 2 * i + 1
    def _right(self, i):   return 2 * i + 2

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def _sift_up(self, idx):
        while idx > 0:
            parent = self._parent(idx)
            if self.heap[parent] <= self.heap[idx]:
                break
            self._swap(parent, idx)
            idx = parent

    def _sift_down(self, idx):
        n = len(self.heap)
        while True:
            smallest = idx
            left = self._left(idx)
            right = self._right(idx)

            if left < n and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < n and self.heap[right] < self.heap[smallest]:
                smallest = right

            if smallest == idx:
                break
            self._swap(idx, smallest)
            idx = smallest

    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self):
        if not self.heap:
            return None
        min_val = self.heap[0]
        last = self.heap.pop()
        if self.heap:
            self.heap[0] = last
            self._sift_down(0)
        return min_val

    def peek(self):    return self.heap[0] if self.heap else None
    def size(self):    return len(self.heap)
    def is_empty(self): return len(self.heap) == 0
```

> 🔑 **In practice for Python, use the built-in `heapq` module** (see Section 8). Implement from scratch only when asked in interviews.

---

## 7. Full Max-Heap Implementation

### 7.1 JavaScript

```javascript
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    _parent(i)  { return Math.floor((i - 1) / 2); }
    _left(i)    { return 2 * i + 1; }
    _right(i)   { return 2 * i + 2; }
    _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }

    _siftUp(idx) {
        while (idx > 0) {
            let parent = this._parent(idx);
            if (this.heap[parent] >= this.heap[idx]) break;  // >= for max-heap
            this._swap(parent, idx);
            idx = parent;
        }
    }

    _siftDown(idx) {
        let n = this.heap.length;
        while (true) {
            let largest = idx;
            let left = this._left(idx);
            let right = this._right(idx);

            if (left < n && this.heap[left] > this.heap[largest]) largest = left;    // > for max-heap
            if (right < n && this.heap[right] > this.heap[largest]) largest = right;

            if (largest === idx) break;
            this._swap(idx, largest);
            idx = largest;
        }
    }

    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        let max = this.heap[0];
        let last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return max;
    }

    peek()    { return this.heap.length > 0 ? this.heap[0] : null; }
    size()    { return this.heap.length; }
    isEmpty() { return this.heap.length === 0; }
}
```

### 7.2 Python

```python
class MaxHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, i):  return (i - 1) // 2
    def _left(self, i):    return 2 * i + 1
    def _right(self, i):   return 2 * i + 2

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def _sift_up(self, idx):
        while idx > 0:
            parent = self._parent(idx)
            if self.heap[parent] >= self.heap[idx]:
                break
            self._swap(parent, idx)
            idx = parent

    def _sift_down(self, idx):
        n = len(self.heap)
        while True:
            largest = idx
            left = self._left(idx)
            right = self._right(idx)

            if left < n and self.heap[left] > self.heap[largest]:
                largest = left
            if right < n and self.heap[right] > self.heap[largest]:
                largest = right

            if largest == idx:
                break
            self._swap(idx, largest)
            idx = largest

    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self):
        if not self.heap:
            return None
        max_val = self.heap[0]
        last = self.heap.pop()
        if self.heap:
            self.heap[0] = last
            self._sift_down(0)
        return max_val

    def peek(self):    return self.heap[0] if self.heap else None
    def size(self):    return len(self.heap)
    def is_empty(self): return len(self.heap) == 0
```

---

## 8. Python heapq Module — Built-in Heap

Python's `heapq` module provides a **min-heap** implementation using a regular list. This is the go-to for Python competitive programming and interviews.

### 8.1 Basic Operations

```python
import heapq

# Create a heap from a list (in-place, O(n))
arr = [5, 3, 8, 1, 2]
heapq.heapify(arr)
print(arr)  # [1, 2, 8, 5, 3] — min-heap

# Push an element (O(log n))
heapq.heappush(arr, 0)
print(arr)  # [0, 2, 1, 5, 3, 8]

# Pop the smallest element (O(log n))
smallest = heapq.heappop(arr)
print(smallest)  # 0

# Peek at the smallest (O(1))
print(arr[0])  # 1

# Push and pop in one operation (more efficient than separate push+pop)
result = heapq.heappushpop(arr, 4)  # push 4, then pop smallest
print(result)  # 1

# Pop and push in one operation (more efficient than separate pop+push)
result = heapq.heapreplace(arr, 0)  # pop smallest, then push 0
print(result)  # 2
```

### 8.2 Max-Heap Trick in Python

Python only has a min-heap. To simulate a **max-heap**, negate the values:

```python
import heapq

# Max-heap using negation
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -8)
heapq.heappush(max_heap, -1)

# Pop maximum (negate back)
max_val = -heapq.heappop(max_heap)
print(max_val)  # 8

# Peek at maximum
print(-max_heap[0])  # 5
```

> 🔑 **Always remember to negate when pushing AND when popping/peeking.** This is the #1 source of bugs with Python max-heaps.

### 8.3 Heap with Custom Objects / Tuples

`heapq` compares elements using `<`. For tuples, it compares element by element (first element first):

```python
import heapq

# Tuple heap — sorted by first element, then second
pq = []
heapq.heappush(pq, (3, "low"))
heapq.heappush(pq, (1, "high"))
heapq.heappush(pq, (2, "medium"))

print(heapq.heappop(pq))  # (1, 'high') — smallest first element

# Common pattern: (priority, index, data)
# Index as tiebreaker to maintain insertion order and avoid comparing uncomparable objects
pq = []
for i, task in enumerate(["email", "meeting", "code"]):
    heapq.heappush(pq, (3 - i, i, task))  # (priority, insertion_order, data)
```

> 🔑 **Tuple trick:** Use `(distance, node)` for Dijkstra's, `(frequency, char)` for task scheduling, `(value, index)` for merge K sorted.

### 8.4 Useful heapq Functions

```python
import heapq

arr = [5, 3, 8, 1, 2, 9, 4]

# Get K smallest elements — O(n + k log n)
print(heapq.nsmallest(3, arr))    # [1, 2, 3]

# Get K largest elements — O(n + k log n)
print(heapq.nlargest(3, arr))     # [9, 8, 5]

# Merge multiple sorted iterables — returns iterator
a = [1, 3, 5]
b = [2, 4, 6]
merged = list(heapq.merge(a, b))  # [1, 2, 3, 4, 5, 6]
```

| Function | Time | Description |
|----------|------|-------------|
| `heapify(arr)` | O(n) | Convert list to min-heap in-place |
| `heappush(heap, val)` | O(log n) | Push value onto heap |
| `heappop(heap)` | O(log n) | Pop and return smallest |
| `heappushpop(heap, val)` | O(log n) | Push then pop (faster than separate) |
| `heapreplace(heap, val)` | O(log n) | Pop then push (faster than separate) |
| `nsmallest(k, iterable)` | O(n + k log n) | Return k smallest elements |
| `nlargest(k, iterable)` | O(n + k log n) | Return k largest elements |
| `merge(*iterables)` | O(total elements) | Merge sorted iterables |

---

## 9. Heap Sort

**Heap Sort** uses the heap data structure to sort an array. It works in two phases:

```
Phase 1: Build a max-heap from the array          → O(n)
Phase 2: Repeatedly extract max and place at end   → O(n log n)
```

### Algorithm

```
1. Build a max-heap from the array
2. For i = n-1 down to 1:
   a. Swap heap[0] (max) with heap[i]
   b. Reduce heap size by 1
   c. Heapify root (index 0)
```

```javascript
// JavaScript — Heap Sort
function heapSort(arr) {
    let n = arr.length;

    // Phase 1: Build max-heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, i, n);
    }

    // Phase 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // Move max to end
        maxHeapify(arr, 0, i);                  // Heapify reduced heap
    }
}

function maxHeapify(arr, node, n) {
    let largest = node;
    let left = 2 * node + 1;
    let right = 2 * node + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== node) {
        [arr[node], arr[largest]] = [arr[largest], arr[node]];
        maxHeapify(arr, largest, n);
    }
}
```

```python
# Python — Heap Sort
def heap_sort(arr):
    n = len(arr)

    # Phase 1: Build max-heap
    for i in range(n // 2 - 1, -1, -1):
        max_heapify(arr, i, n)

    # Phase 2: Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        max_heapify(arr, 0, i)

def max_heapify(arr, node, n):
    largest = node
    left = 2 * node + 1
    right = 2 * node + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != node:
        arr[node], arr[largest] = arr[largest], arr[node]
        max_heapify(arr, largest, n)
```

**Time:** O(n log n) — always | **Space:** O(1) — in-place!

### Heap Sort Properties

| Property | Value |
|----------|-------|
| Time (Best/Average/Worst) | O(n log n) / O(n log n) / O(n log n) |
| Space | O(1) — in-place |
| Stable? | ❌ No |
| In-place? | ✅ Yes |

> 🔑 **Heap Sort vs Quick Sort vs Merge Sort:**
> - Heap Sort: O(n log n) worst case, in-place, but not stable, poor cache performance
> - Quick Sort: O(n log n) average, in-place, not stable, excellent cache performance (preferred in practice)
> - Merge Sort: O(n log n) always, stable, but O(n) extra space

---

## 10. Priority Queue

A **Priority Queue** is an abstract data type where each element has a **priority**. Elements are served in order of priority (not insertion order).

| Operation | Array (unsorted) | Array (sorted) | Heap |
|-----------|-----------------|----------------|------|
| Insert | O(1) | O(n) | **O(log n)** |
| Extract Min/Max | O(n) | O(1) | **O(log n)** |
| Peek | O(n) | O(1) | **O(1)** |

> 🔑 **A heap is the optimal implementation of a priority queue.** Both insert and extract are O(log n).

### JavaScript — No Built-in Priority Queue

JavaScript has no built-in priority queue. You must implement a heap class (see Sections 6–7) or use a sorted array for small inputs.

```javascript
// Quick-and-dirty PQ for competitive programming (NOT recommended for large inputs)
// Using sorted array — O(n) insert, O(1) extract
class SimplePQ {
    constructor(comparator = (a, b) => a - b) {
        this.data = [];
        this.comparator = comparator;
    }
    push(val) {
        this.data.push(val);
        this.data.sort(this.comparator);
    }
    pop() { return this.data.shift(); }
    peek() { return this.data[0]; }
    size() { return this.data.length; }
}
```

### Python — Use heapq

```python
import heapq

# Min Priority Queue
pq = []
heapq.heappush(pq, (5, "task_a"))   # (priority, data)
heapq.heappush(pq, (1, "task_b"))
heapq.heappush(pq, (3, "task_c"))

while pq:
    priority, task = heapq.heappop(pq)
    print(f"Processing {task} with priority {priority}")
# Output: task_b(1), task_c(3), task_a(5)
```

---

## 11. Check if Array is a Heap

### Iterative Approach (Preferred)

Check all internal nodes: each parent must be ≤ (min-heap) or ≥ (max-heap) its children.

```javascript
// JavaScript — Check if Max-Heap
function isMaxHeap(arr, n) {
    for (let i = 0; i <= Math.floor(n / 2) - 1; i++) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n && arr[i] < arr[left]) return false;
        if (right < n && arr[i] < arr[right]) return false;
    }
    return true;
}
```

```python
# Python — Check if Min-Heap
def is_min_heap(arr):
    n = len(arr)
    for i in range(n // 2):
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and arr[i] > arr[left]:
            return False
        if right < n and arr[i] > arr[right]:
            return False
    return True
```

**Time:** O(n) | **Space:** O(1)

---

## 12. Convert Min-Heap to Max-Heap

**Approach:** Ignore the existing heap property. Simply **build a max-heap** from the array using the build-heap procedure (heapify from last internal node).

```javascript
function convertMinToMaxHeap(arr, n) {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, i, n);
    }
}
```

```python
# Python — Convert Min-Heap to Max-Heap
def convert_min_to_max(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        max_heapify(arr, i, n)

def max_heapify(arr, node, n):
    largest = node
    left = 2 * node + 1
    right = 2 * node + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != node:
        arr[node], arr[largest] = arr[largest], arr[node]
        max_heapify(arr, largest, n)
```

**Time:** O(n) | **Space:** O(log n) recursive / O(1) iterative

> 🔑 **This works because build-heap doesn't care about the input's existing order.** It treats the array as an arbitrary collection and builds a valid heap in O(n).

---

## 13. Two-Heap Pattern

The **Two-Heap Pattern** uses a **Max-Heap** (for the smaller half) and a **Min-Heap** (for the larger half) to efficiently track the **median** of a data stream.

```
Numbers so far: [1, 3, 5, 7, 9]

Max-Heap (smaller half):    Min-Heap (larger half):
      3                          7
     / \                        / \
    1                          9

Max-Heap top: 3               Min-Heap top: 5 (actual root)
                  ↕
              Median = 5
```

### How It Works

```
1. Max-Heap stores the SMALLER half (root = largest of small half)
2. Min-Heap stores the LARGER half (root = smallest of large half)
3. Balance: sizes differ by at most 1

Adding a number:
  - If num ≤ maxHeap.top → push to maxHeap
  - Else → push to minHeap
  - Rebalance if sizes differ by > 1

Finding median:
  - If equal sizes → average of both tops
  - Else → top of the larger heap
```

```javascript
// JavaScript — Median Finder (Two-Heap)
class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap();  // smaller half
        this.minHeap = new MinHeap();  // larger half
    }

    addNum(num) {
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
            this.maxHeap.push(num);
        } else {
            this.minHeap.push(num);
        }

        // Balance: maxHeap can have at most 1 extra element
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.push(this.maxHeap.pop());
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.push(this.minHeap.pop());
        }
    }

    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek();
        }
        return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
}
```

```python
# Python — Median Finder (Two-Heap)
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negate values)
        self.large = []  # min-heap

    def addNum(self, num):
        if not self.small or num <= -self.small[0]:
            heapq.heappush(self.small, -num)  # negate for max-heap
        else:
            heapq.heappush(self.large, num)

        # Balance
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        elif len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2
```

**Time:** O(log n) per addNum, O(1) per findMedian | **Space:** O(n)

---

## 14. Key Patterns & Tricks for Interviews

### Pattern 1 — Top K / Kth Largest / Kth Smallest

```
Kth LARGEST  → Use MIN-heap of size K → root is answer
Kth SMALLEST → Use MAX-heap of size K → root is answer
```

Why inverted? A min-heap of size K keeps the K largest elements; the smallest among them (root) is the Kth largest.

```python
# Kth Largest — Python
import heapq
def kth_largest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)  # pop smallest, push num
    return heap[0]
```

**Examples:** Kth Largest Element, Kth Smallest Element, K Closest Points to Origin

---

### Pattern 2 — Merge K Sorted

```
Push the first element of each list into a min-heap.
Pop the minimum, then push the next element from the same list.
```

```python
import heapq
def merge_k_sorted(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))  # (value, list_index, element_index)

    result = []
    while heap:
        val, li, ei = heapq.heappop(heap)
        result.append(val)
        if ei + 1 < len(lists[li]):
            heapq.heappush(heap, (lists[li][ei + 1], li, ei + 1))
    return result
```

**Examples:** Merge K Sorted Arrays, Merge K Sorted Lists

---

### Pattern 3 — Greedy with Heap

When you need to always pick the "best" (min cost / max frequency) option:

```
Put all candidates in a heap.
Greedily pick the top, process it, and push back if still valid.
```

**Examples:** Minimum Cost to Join N Ropes, Task Scheduler, Reorganize String

---

### Pattern 4 — Two-Heap for Median

```
Max-Heap (smaller half) + Min-Heap (larger half)
Keep balanced: sizes differ by at most 1
Median = top of larger heap (odd) or average of both tops (even)
```

**Examples:** Find Median from Data Stream, Sliding Window Median

---

### Pattern 5 — Lazy Deletion

When you need to remove arbitrary elements from a heap but can't efficiently find them:

```
Don't remove immediately. Mark as "deleted."
When popping, skip elements that are marked deleted.
```

Useful when the heap doesn't support O(log n) arbitrary removal.

---

### Pattern 6 — Frequency-Based Heap

```
Count frequencies → push (frequency, element) into heap → process.
```

**Examples:** Top K Frequent Elements, Task Scheduler, Reorganize String

---

### Pattern 7 — Stream / Online Processing

```
Maintain a heap as elements arrive one by one.
Answer queries (median, Kth element) in O(log n) per insertion.
```

**Examples:** Kth Largest in Stream, Median in Stream

---

### Pattern 8 — Sliding Window + Heap

When you need the **max/min within a sliding window**:

```
Use a max-heap (or min-heap). Push (value, index).
When popping, check if the top's index is still within the window.
If not, discard it (lazy deletion).
```

```python
import heapq
def maxSlidingWindow(nums, k):
    result = []
    max_heap = []  # (-value, index) for max-heap

    for i, num in enumerate(nums):
        heapq.heappush(max_heap, (-num, i))

        # Remove elements outside the window
        while max_heap[0][1] <= i - k:
            heapq.heappop(max_heap)

        if i >= k - 1:
            result.append(-max_heap[0][0])
    return result
```

> 🔑 **Note:** For sliding window max/min, a **monotonic deque** is O(n) vs heap's O(n log n). But the heap approach is simpler to code and works well when you need top-K in a window.

**Examples:** Sliding Window Maximum, Sliding Window Median

---

### Pattern 9 — Heap in Graph Algorithms

Heaps power the key graph algorithms:

```
Dijkstra's Algorithm:  Min-Heap of (distance, node)
  → Always process the closest unvisited node
  → Push updated distances; use lazy deletion for stale entries

Prim's MST:           Min-Heap of (weight, node)
  → Always pick the cheapest edge to grow the MST

A* Search:            Min-Heap of (f_score, node)
  → f_score = g(actual cost) + h(heuristic)
```

```python
# Dijkstra's with heap — Python
import heapq
def dijkstra(V, adj, src):
    dis = [float('inf')] * V
    dis[src] = 0
    pq = [(0, src)]  # (distance, node)

    while pq:
        d, u = heapq.heappop(pq)
        if d > dis[u]:
            continue  # Lazy deletion: stale entry
        for v, wt in adj[u]:
            if dis[u] + wt < dis[v]:
                dis[v] = dis[u] + wt
                heapq.heappush(pq, (dis[v], v))
    return dis
```

> 🔑 **The `if d > dis[u]: continue` line IS lazy deletion** — instead of decreasing the key of an existing entry, we push a new one and skip stale entries when they surface.

---

## 15. Common Heap Problem Types

| Problem Type | Heap Type | Key Idea |
|-------------|-----------|----------|
| Kth largest element | Min-Heap size K | Root = Kth largest |
| Kth smallest element | Max-Heap size K | Root = Kth smallest |
| Top K frequent | Min-Heap size K + freq map | Keep top K frequencies |
| Merge K sorted lists | Min-Heap | Pop min, push next from same list |
| Median in stream | Max-Heap + Min-Heap | Two-heap pattern |
| Minimum cost (ropes, stones) | Min-Heap | Greedily combine two smallest |
| Task scheduling | Max-Heap by freq | Pick highest frequency first |
| K closest points | Max-Heap size K | Root = Kth closest (furthest among K) |
| Reorganize string | Max-Heap by freq | Place most frequent chars first |
| Design Twitter | Max-Heap | Merge K most recent feeds |
| K sum combinations | Max-Heap | Track top K pair sums |
| Consecutive groups | Min-Heap or sorted map | Greedily form groups |

---

## 16. Heap vs Other Data Structures

| Feature | Heap | Sorted Array | BST (Balanced) | Hash Map |
|---------|------|-------------|----------------|----------|
| **Insert** | O(log n) | O(n) | O(log n) | O(1) |
| **Get Min/Max** | O(1) | O(1) | O(log n) | O(n) |
| **Extract Min/Max** | O(log n) | O(1) / O(n) | O(log n) | O(n) |
| **Search** | O(n) | O(log n) | O(log n) | O(1) |
| **Delete arbitrary** | O(n) | O(n) | O(log n) | O(1) |
| **Space** | O(n) | O(n) | O(n) | O(n) |
| **Best for** | Priority access | Static sorted data | All operations balanced | Lookups |

> 🔑 **Use a Heap when you repeatedly need the min/max but DON'T need to search or delete arbitrary elements.**

### When to Use Heap vs Sort

| Scenario | Use | Why |
|----------|-----|-----|
| Need ALL elements sorted | **Sort** | O(n log n) once |
| Need only top K elements | **Heap** | O(n log K) < O(n log n) |
| Streaming data (elements arrive over time) | **Heap** | Can't sort what hasn't arrived |
| Need min/max repeatedly after modifications | **Heap** | O(log n) per operation |
| Need Kth element once from static array | **Quickselect** | O(n) average |

---

## 17. Complexity Cheat Sheet

| Operation | Time | Notes |
|-----------|------|-------|
| Build Heap | **O(n)** | NOT O(n log n)! Bottom-up heapify |
| Insert (Push) | O(log n) | Sift up |
| Extract Min/Max (Pop) | O(log n) | Sift down |
| Peek | O(1) | Just return root |
| Heapify (one node) | O(log n) | Sift down from that node |
| Sift Up (one node) | O(log n) | Bubble up to root |
| Delete arbitrary (unknown index) | O(n) | Find O(n) + heapify O(log n) |
| Delete arbitrary (known index) | O(log n) | Replace + sift down/up |
| Decrease Key | O(log n) | Update value + sift up (min-heap) |
| Increase Key | O(log n) | Update value + sift down (min-heap) |
| Search | O(n) | Heap is NOT ordered for search |
| Heap Sort | O(n log n) | In-place, not stable |
| Kth Largest/Smallest | O(n log K) | Heap of size K |
| Merge K sorted (total N) | O(N log K) | Min-heap of size K |
| Median (stream, per insert) | O(log n) | Two-heap pattern |

---

## 18. Common Mistakes

### ❌ Confusing Min-Heap and Max-Heap for Kth problems

```
Kth LARGEST  → MIN-heap of size K   (not max-heap!)
Kth SMALLEST → MAX-heap of size K   (not min-heap!)
```

The inversion is because you want to **evict the worst candidate** quickly. A min-heap root is the smallest among K largest → that's your Kth largest.

---

### ❌ Forgetting to negate values for Python Max-Heap

```python
# WRONG — this is a min-heap, NOT max-heap
heapq.heappush(heap, val)

# CORRECT — negate for max-heap
heapq.heappush(heap, -val)
max_val = -heapq.heappop(heap)  # negate back!
```

---

### ❌ Thinking Build Heap is O(n log n)

```
Build Heap is O(n), NOT O(n log n).
Inserting n elements one by one IS O(n log n).
Building bottom-up (heapify from last internal node) IS O(n).
```

---

### ❌ Using Heap when Sort suffices

If you only need the answer once from a static array, sorting might be simpler. Heap shines when data is **streaming** or you need **repeated** min/max extraction.

---

### ❌ Not handling the empty heap case

```javascript
// WRONG — crashes on empty heap
let min = heap.pop();

// CORRECT — guard check
if (!heap.isEmpty()) {
    let min = heap.pop();
}
```

---

### ❌ Comparing uncomparable objects in Python heapq

```python
# WRONG — if priorities are equal, Python tries to compare the objects
heapq.heappush(pq, (1, some_object))

# CORRECT — add a tiebreaker (e.g., insertion index)
heapq.heappush(pq, (1, counter, some_object))
counter += 1
```

---

### ❌ Modifying heap elements directly

Never modify `heap[i]` directly — it breaks the heap property. Always use push/pop.

---

## 19. Interview Cheat Sheet

### Quick Decision Framework

```
📋 Read the Problem
    ↓
Does it involve "Kth largest/smallest" or "Top K"?
  YES → Heap of size K (inverted type)
    ↓
Does it involve "merge K sorted"?
  YES → Min-Heap with (value, list_index, element_index)
    ↓
Does it involve "median" in a stream?
  YES → Two-Heap pattern (max-heap + min-heap)
    ↓
Does it involve "minimum cost" combining elements?
  YES → Min-Heap, greedily combine two smallest
    ↓
Does it involve "scheduling" or "frequency-based" ordering?
  YES → Max-Heap by frequency
    ↓
Does it need repeated min/max from a dynamic collection?
  YES → Heap
  NO  → Maybe sort is enough
```

### Template: Kth Largest Element

```javascript
function findKthLargest(nums, k) {
    let minHeap = new MinHeap();
    for (let num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();  // evict smallest — keep only K largest
        }
    }
    return minHeap.peek();  // root = Kth largest
}
```

```python
import heapq
def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
```

### Template: Merge K Sorted Lists

```javascript
function mergeKSorted(lists) {
    let minHeap = new MinHeap();  // stores [value, listIdx, elemIdx]
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].length > 0) {
            minHeap.push([lists[i][0], i, 0]);
        }
    }
    let result = [];
    while (!minHeap.isEmpty()) {
        let [val, li, ei] = minHeap.pop();
        result.push(val);
        if (ei + 1 < lists[li].length) {
            minHeap.push([lists[li][ei + 1], li, ei + 1]);
        }
    }
    return result;
}
```

### Template: Minimum Cost (Greedy Combine)

```python
import heapq
def min_cost_ropes(ropes):
    heapq.heapify(ropes)
    total = 0
    while len(ropes) > 1:
        a = heapq.heappop(ropes)
        b = heapq.heappop(ropes)
        cost = a + b
        total += cost
        heapq.heappush(ropes, cost)
    return total
```

---

## 20. Quick Revision Flashcards

> ⚡ Rapid-fire notes for last-minute revision. Read top to bottom in 5 minutes.

### 🔵 Core Concepts

```
✦ Heap = Complete Binary Tree + Heap Property (parent ≤ children or ≥ children)
✦ Stored as ARRAY — parent: (i-1)/2, left: 2i+1, right: 2i+2
✦ Height = ⌊log₂ n⌋ — all operations O(log n) max
✦ NOT sorted — only root is guaranteed min/max
✦ Leaves = indices n/2 to n-1 (about HALF the nodes)
```

### 🔵 Operation Quick Reference

```
Insert:           Push to end → Sift UP                    O(log n)
Extract Min/Max:  Swap root with last → Pop → Sift DOWN    O(log n)
Peek:             Return heap[0]                            O(1)
Build Heap:       Heapify from last internal node → root    O(n) ⚠️ NOT O(n log n)
Delete at index:  Replace with last → Sift down + Sift up  O(log n) if index known
Decrease Key:     Update value → Sift UP (min-heap)         O(log n)
Heap Sort:        Build max-heap → Extract max repeatedly   O(n log n), in-place, NOT stable
```

### 🔵 The Kth Element Trick (MEMORIZE THIS)

```
┌─────────────────────────────────────────────────────────┐
│  Kth LARGEST   →  MIN-heap of size K  →  root = answer  │
│  Kth SMALLEST  →  MAX-heap of size K  →  root = answer  │
│                                                         │
│  WHY inverted? The heap EVICTS the wrong candidates.    │
│  Min-heap evicts smallest → keeps K largest.            │
│  Root of those K largest = the Kth largest.             │
└─────────────────────────────────────────────────────────┘
```

### 🔵 Python heapq Cheat Card

```python
import heapq

heapq.heapify(arr)              # List → min-heap, O(n)
heapq.heappush(heap, val)       # Push, O(log n)
heapq.heappop(heap)             # Pop smallest, O(log n)
heapq.heappushpop(heap, val)    # Push then pop (fast)
heapq.heapreplace(heap, val)    # Pop then push (fast)
heap[0]                          # Peek smallest, O(1)

# MAX-HEAP: negate everything!
heapq.heappush(heap, -val)
max_val = -heapq.heappop(heap)

# Tuple heap: (priority, tiebreaker, data)
heapq.heappush(pq, (dist, idx, node))
```

### 🔵 Pattern Recognition Cheat Card

```
"Kth largest/smallest"          → Heap of size K (inverted type)
"Top K / K most frequent"       → Heap of size K + freq map
"Merge K sorted"                → Min-heap of K heads
"Median in stream"              → Two heaps (max + min)
"Minimum cost to combine"       → Min-heap, greedy combine 2 smallest
"Schedule tasks / cooldown"     → Max-heap by frequency
"Sliding window max/min"        → Heap + lazy deletion (or monotonic deque)
"Dijkstra / Prim's"            → Min-heap of (distance/weight, node)
"Repeated min/max from dynamic" → Heap
"Stream / online queries"       → Heap maintained incrementally
```

### 🔵 Complexity One-Liner

```
Build: O(n)  |  Push/Pop: O(log n)  |  Peek: O(1)  |  Search: O(n)
Kth element: O(n log K)  |  Merge K sorted (N total): O(N log K)
Heap Sort: O(n log n) time, O(1) space, NOT stable
```

### 🔵 Top 5 Mistakes to Avoid

```
1. Kth LARGEST needs MIN-heap, NOT max-heap (inverted!)
2. Python heapq is MIN-heap only — negate for max-heap
3. Build heap is O(n), not O(n log n) — explain the math!
4. Never modify heap[i] directly — breaks heap property
5. Mark visited BEFORE pushing in BFS-style heap problems (like Dijkstra)
```

---

## 21. Problem Walkthroughs — Quick Revision

> Each problem covered with: **Question → Key Insight → Algorithm → Code → Complexity.**
> Designed for rapid revision before interviews.

---

### 📗 Medium 01 — Kth Largest Element

**Problem:** Given an array and integer K, return the Kth largest element.

**Key Insight:** Use a **min-heap of size K**. The root is always the Kth largest because the heap holds only the K largest elements seen so far, and the root is the smallest among them.

```
Algorithm:
1. Push first K elements into min-heap
2. For remaining elements: if element > heap root → pop root, push element
3. Root = Kth largest
```

```python
import heapq
def findKthLargest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)          # O(k)
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)  # O(log k)
    return heap[0]
```

> 🔑 **Why min-heap for LARGEST?** The min-heap evicts the smallest of the K candidates. After processing all elements, only the K largest remain, and the root (smallest of them) = Kth largest.

**Time:** O(n log K) | **Space:** O(K)

---

### 📗 Medium 02 — Kth Smallest Element

**Problem:** Given an array and integer K, return the Kth smallest element.

**Key Insight:** Mirror of Kth largest — use a **max-heap of size K**. Root = Kth smallest.

```
Algorithm:
1. Push first K elements into max-heap
2. For remaining elements: if element < heap root → pop root, push element
3. Root = Kth smallest
```

```python
import heapq
def findKthSmallest(nums, k):
    # Max-heap via negation
    heap = [-x for x in nums[:k]]
    heapq.heapify(heap)
    for num in nums[k:]:
        if num < -heap[0]:
            heapq.heapreplace(heap, -num)
    return -heap[0]
```

> 🔑 **Inversion trick:** Kth largest = min-heap. Kth smallest = max-heap. Always **inverted**.

**Time:** O(n log K) | **Space:** O(K)

---

### 📗 Medium 03 — Merge K Sorted Arrays

**Problem:** Given K sorted arrays (K×K matrix), merge them into one sorted array.

**Key Insight:** Use a **min-heap of size K** holding the smallest unprocessed element from each array. Pop min, push the next element from the same array.

```
Algorithm:
1. Push first element of each array as {value, row, col} into min-heap
2. While heap not empty:
   a. Pop minimum {val, row, col}
   b. Add val to result
   c. If col+1 < K → push {arr[row][col+1], row, col+1}
```

```python
import heapq
def mergeKArrays(arr, K):
    heap = [(arr[i][0], i, 0) for i in range(K)]
    heapq.heapify(heap)
    result = []
    while heap:
        val, row, col = heapq.heappop(heap)
        result.append(val)
        if col + 1 < K:
            heapq.heappush(heap, (arr[row][col + 1], row, col + 1))
    return result
```

> 🔑 **The heap always has at most K elements** (one per array), so each push/pop is O(log K). Total: O(K² log K) for K×K matrix, or O(N log K) for N total elements.

**Time:** O(N log K) | **Space:** O(K)

---

### 📗 Medium 04 — Merge K Sorted Linked Lists

**Problem:** Given K sorted linked lists, merge them into one sorted list.

**Key Insight:** Same as merge K sorted arrays, but push **list nodes** into the min-heap. Compare by `node.val`.

```
Algorithm:
1. Push head of each non-null list into min-heap
2. While heap not empty:
   a. Pop node with smallest val
   b. Append to result linked list
   c. If node.next exists → push node.next
```

```python
import heapq
def mergeKLists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))  # (val, index_tiebreaker, node)
    dummy = ListNode()
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = ListNode(val)
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next
```

> 🔑 **The `i` tiebreaker is essential** in Python to avoid comparing ListNode objects when values are equal.

**Time:** O(N log K) where N = total nodes | **Space:** O(K)

---

### 📗 Medium 05 — Arrange by Rank (Array Rank Transform)

**Problem:** Given an array, replace each element with its rank (1 = smallest, 2 = next, etc.). Equal elements get the same rank.

**Key Insight:** Use a **min-heap** storing `(value, original_index)`. Pop in sorted order and assign incrementing ranks. Skip rank increment for duplicates.

```
Algorithm:
1. Push all (value, index) pairs into min-heap
2. Pop elements one by one (sorted order)
3. If value differs from previous → increment rank
4. Assign rank to result[index]
```

```python
import heapq
def arrayRankTransform(arr):
    heap = [(val, i) for i, val in enumerate(arr)]
    heapq.heapify(heap)
    result = [0] * len(arr)
    rank, prev = 0, None
    while heap:
        val, idx = heapq.heappop(heap)
        if val != prev:
            rank += 1
        result[idx] = rank
        prev = val
    return result
```

> 🔑 **Alternative:** Sort + hash map is simpler. But this demonstrates heap-based sorting while preserving original indices.

**Time:** O(n log n) | **Space:** O(n)

---

### 📗 Medium 06 — Task Scheduler

**Problem:** Given tasks with cooldown period `n`, find the minimum intervals (including idle) to finish all tasks.

**Key Insight:** This is a **math/greedy** problem. The task with the highest frequency determines the frame structure.

```
Formula:
  ans = (maxFreq - 1) × (n + 1) + countOfMaxFreqTasks
  return max(ans, total_tasks)

Visual for tasks = [A,A,A,B,B,B], n=2:
  A B _ | A B _ | A B     ← (3-1) frames of size (2+1) + 2 max-freq tasks
  = 2 × 3 + 2 = 8
```

```python
from collections import Counter
def leastInterval(tasks, n):
    freq = Counter(tasks)
    max_freq = max(freq.values())
    max_count = sum(1 for f in freq.values() if f == max_freq)
    ans = (max_freq - 1) * (n + 1) + max_count
    return max(ans, len(tasks))
```

> 🔑 **The `max(ans, len(tasks))` handles the case where there are enough different tasks to fill all idle slots**, making total time = just the number of tasks.

**Time:** O(n) | **Space:** O(1) (max 26 letters)

---

### 📗 Medium 07 — Divide Array into Sets of K Consecutive Numbers

**Problem:** Given array `nums` and integer `k`, check if you can divide into groups of `k` consecutive numbers.

**Approach 1 — Sort + Greedy + Freq Map:** Sort array, iterate, greedily form groups from smallest available.

**Approach 2 — Min-Heap + Freq Map (Optimal for Heaps):**

**Key Insight:** Use a **min-heap of unique numbers**. The heap top is always the smallest unused number — which **must** be the start of a group (nothing smaller can start a group containing it). The clever trick: if a number's frequency hits 0 but it's NOT the heap top, a **gap** exists → return false.

```
Algorithm:
1. If len(nums) % k ≠ 0 → false
2. Build frequency map, push all unique numbers into min-heap
3. While heap not empty:
   a. start = heap.peek() (smallest available)
   b. Form group [start, start+1, ..., start+k-1]
   c. For each i in group:
      - If freq[i] == 0 → false
      - freq[i]--
      - If freq[i] == 0 AND i == heap.peek() → pop (exhausted)
      - If freq[i] == 0 AND i ≠ heap.peek() → false (GAP!)
```

```python
import heapq
from collections import Counter
def isPossibleDivide(nums, k):
    if len(nums) % k != 0:
        return False
    freq = Counter(nums)
    heap = list(freq.keys())
    heapq.heapify(heap)
    while heap:
        start = heap[0]
        for i in range(start, start + k):
            if freq[i] <= 0:
                return False
            freq[i] -= 1
            if freq[i] == 0:
                if i != heap[0]:
                    return False    # Gap detected!
                heapq.heappop(heap)
    return True
```

> 🔑 **Why the gap check?** If number `i` in the middle of our group hits freq 0 but the heap top is a smaller number `j`, then `j` still has remaining count but `i` (which j's group would need) is gone. So `j` can never form a valid group → impossible.

> 🔑 **Heap vs Sort:** Time is O(n log m) where m = unique elements. When many duplicates (m << n), heap is faster than sorting the entire array O(n log n).

**Time:** O(n log m) | **Space:** O(n)

---

### 📕 Hard 01 — Design Twitter

**Problem:** Design Twitter with `postTweet`, `getNewsFeed` (10 most recent from self + follows), `follow`, `unfollow`.

**Key Insight:** This is a **system design + merge K sorted** problem. Each user's tweets are sorted by time. `getNewsFeed` = merge K sorted feeds (from followed users) and take top 10.

```
Data Structures:
  - following: Map<userId, Set<followeeIds>>  (user always follows self)
  - posts:     Map<userId, [(timestamp, tweetId)]>
  - time:      global counter (increments per tweet)

getNewsFeed: Collect all posts from followed users → sort by timestamp desc → return top 10
```

```python
import heapq
from collections import defaultdict

class Twitter:
    def __init__(self):
        self.following = defaultdict(set)
        self.posts = defaultdict(list)
        self.time = 0

    def postTweet(self, userId, tweetId):
        self.following[userId].add(userId)
        self.posts[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId):
        self.following[userId].add(userId)
        # Max-heap merge of followed users' posts
        heap = []
        for uid in self.following[userId]:
            for t, tid in self.posts[uid]:
                heapq.heappush(heap, (-t, tid))  # negate for max-heap
        result = []
        while heap and len(result) < 10:
            result.append(heapq.heappop(heap)[1])
        return result

    def follow(self, followerId, followeeId):
        self.following[followerId].add(followeeId)

    def unfollow(self, followerId, followeeId):
        if followeeId != followerId:
            self.following[followerId].discard(followeeId)
```

> 🔑 **Optimized approach:** Use a heap of size K (one entry per followed user pointing to their latest tweet) instead of collecting all posts. This avoids O(total posts) collection.

**Time:** postTweet O(1), getNewsFeed O(F×P×log(F×P)), follow/unfollow O(1) | **Space:** O(U + P)

---

### 📕 Hard 02 — Minimum Cost to Join N Ropes

**Problem:** Connect N ropes into one. Cost of connecting two ropes = sum of their lengths. Minimize total cost.

**Key Insight:** **Greedy + min-heap.** Always combine the two shortest ropes first (Huffman-style). This minimizes the cost because shorter ropes get added into future sums more times.

```
Algorithm:
1. Push all rope lengths into min-heap
2. While heap has > 1 element:
   a. Pop two smallest: a, b
   b. cost = a + b
   c. total += cost
   d. Push cost back into heap
3. Return total
```

```python
import heapq
def connectRopes(arr):
    heapq.heapify(arr)
    total = 0
    while len(arr) > 1:
        a = heapq.heappop(arr)
        b = heapq.heappop(arr)
        cost = a + b
        total += cost
        heapq.heappush(arr, cost)
    return total
```

> 🔑 **This is identical to Huffman coding's tree construction.** The element combined first appears in the most sums → keep it smallest.

**Dry run:** `[2, 3, 4, 6]` → combine(2,3)=5, cost=5 → `[4, 5, 6]` → combine(4,5)=9, cost=14 → `[6, 9]` → combine(6,9)=15, cost=29 → **Total: 29**

**Time:** O(n log n) | **Space:** O(n)

---

### 📕 Hard 03 — Kth Largest Element in Stream

**Problem:** Design a class that maintains the Kth largest element as numbers are streamed in.

**Key Insight:** Maintain a **min-heap of size K** throughout the stream. After every `add()`, the root = Kth largest.

```
Constructor: push all nums, keep heap size ≤ K
add(val):    push val, if size > K → pop, return root
```

```python
import heapq
class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = []
        for num in nums:
            heapq.heappush(self.heap, num)
            if len(self.heap) > k:
                heapq.heappop(self.heap)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]
```

> 🔑 **This is the "streaming" version of Kth Largest.** Same min-heap-of-size-K trick, but maintained incrementally.

**Time:** O(log K) per add | **Space:** O(K)

---

### 📕 Hard 04 — Maximum K Sum Combinations

**Problem:** Given two sorted arrays A and B of size N, find K largest pair sums (A[i] + B[j]).

**Key Insight:** **Max-heap + systematic exploration.** Start with the largest possible sums (each A[i] paired with the largest B element). Pop max, then explore the next candidate from the same A[i].

```
Algorithm:
1. Sort A and B ascending
2. Push {A[i] + B[N-1], i, N-1} for all i into max-heap
3. Pop K times:
   a. Pop {sum, aIdx, bIdx}
   b. Add sum to result
   c. If bIdx > 0 → push {A[aIdx] + B[bIdx-1], aIdx, bIdx-1}
```

```python
import heapq
def maxCombinations(N, K, A, B):
    A.sort()
    B.sort()
    # Max-heap via negation
    heap = [(-A[i] - B[N-1], i, N-1) for i in range(N)]
    heapq.heapify(heap)
    result = []
    for _ in range(K):
        neg_sum, ai, bi = heapq.heappop(heap)
        result.append(-neg_sum)
        if bi > 0:
            heapq.heappush(heap, (-A[ai] - B[bi-1], ai, bi-1))
    return result
```

> 🔑 **Avoids generating all N² pairs.** Only explores candidates reachable from already-popped entries. Similar to merge K sorted lists where each "list" is A[i]+B[N-1], A[i]+B[N-2], ...

**Time:** O(N log N + K log N) | **Space:** O(N)

---

### 📕 Hard 05 — Median in a Stream

**Problem:** Design a class to find the median as numbers arrive one by one.

**Key Insight:** **Two-Heap pattern.** Max-heap (smaller half) + Min-heap (larger half). Keep balanced.

```
addNum:
  - If num ≤ maxHeap.top → push to maxHeap
  - Else → push to minHeap
  - Balance: sizes differ by at most 1

findMedian:
  - Equal sizes → average of both tops
  - Else → top of larger heap
```

```python
import heapq
class MedianFinder:
    def __init__(self):
        self.small = []   # max-heap (negate)
        self.large = []   # min-heap

    def addNum(self, num):
        if not self.small or num <= -self.small[0]:
            heapq.heappush(self.small, -num)
        else:
            heapq.heappush(self.large, num)
        # Balance
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        elif len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2
```

> 🔑 **The two heaps split the data at the median.** Max-heap root = largest of small half. Min-heap root = smallest of large half. Median is always at the boundary.

**Dry run:** Add 1,2,3 → small=[-1], large=[] → small=[-1], large=[2] → small=[-2,-1], large=[3] → balance → small=[-2], large=[2,3] → wait, let me redo: add(1): small=[-1]. add(2): 2>1 → large=[2]. add(3): 3>1 → large=[2,3] → large bigger → move 2 to small → small=[-2,-1], large=[3]. median = -small[0] = 2 ✅

**Time:** O(log n) per add, O(1) per findMedian | **Space:** O(n)

---

### 📕 Hard 06 — Top K Frequent Elements

**Problem:** Given array `nums` and integer `k`, return the k most frequent elements.

**Key Insight:** **Frequency map + min-heap of size K** (sorted by frequency). The heap evicts the least frequent, keeping only top K.

```
Algorithm:
1. Build frequency map: {element → count}
2. For each (element, freq) in map:
   - Push (freq, element) into min-heap
   - If heap size > K → pop (evicts lowest frequency)
3. Heap contains top K frequent elements
```

```python
import heapq
from collections import Counter
def topKFrequent(nums, k):
    freq = Counter(nums)
    heap = []
    for num, f in freq.items():
        heapq.heappush(heap, (f, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [x[1] for x in heap]
```

> 🔑 **Same "heap of size K" trick as Kth Largest**, but applied to frequencies instead of values. Min-heap evicts lowest frequency → only top K remain.

> 🔑 **Alternative: Bucket Sort O(n).** Create buckets[i] = elements with frequency i. Iterate from highest bucket. No heap needed. But heap approach is more universal.

**Time:** O(n log K) | **Space:** O(n)

---

## 22. Problem Map — All Covered Problems

### 📁 1. Learning
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Implement Min Heap | Array-based heap with sift up/down |
| 02 | Check if Array is Heap | Verify parent ≥ children for all internal nodes |
| 03 | Convert Min-Heap to Max-Heap | Build max-heap from scratch — O(n) |

### 📁 2. Medium Problems
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Kth Largest Element | Min-Heap of size K |
| 02 | Kth Smallest Element | Max-Heap of size K |
| 03 | Merge K Sorted Arrays | Min-Heap with (value, listIdx, elemIdx) |
| 04 | Merge K Sorted Lists | Min-Heap on linked list heads |
| 05 | Arrange by Rank | Priority Queue ordering |
| 06 | Task Scheduler | Max frequency + greedy intervals |
| 07 | Divide Array into Sets of K Consecutive | Sorted map / min-heap + greedy |

### 📁 3. Hard Problems
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Design Twitter | Max-Heap merge K recent feeds |
| 02 | Minimum Cost to Join N Ropes | Min-Heap greedy combine |
| 03 | Kth Largest Element in Stream | Min-Heap of size K (online) |
| 04 | Maximum K Sum Combinations | Max-Heap + visited set |
| 05 | Median in a Stream | Two-Heap pattern (max + min) |
| 06 | Top K Frequent Elements | Min-Heap of size K + frequency map |

---

> 💡 **Tip:** When stuck on a heap problem in an interview, always ask:
> 1. Do I need **repeated access** to the min or max?
> 2. Is the data **streaming** (arriving over time)?
> 3. Am I looking for **top K** or **Kth** element?
> 4. Can I use a heap to make a **greedy** choice (always pick the best)?
> 5. Do I need **two heaps** to track both halves (median)?
>
> If any answer is YES → a heap is likely the right choice.

