"""
================================================================================
PYTHON HEAP HANDBOOK - COMPLETE REFERENCE FOR DSA PROBLEM SOLVING
================================================================================

This file serves as a comprehensive reference for all heap-related operations,
concepts, and patterns commonly used in Data Structures and Algorithms problems.

TABLE OF CONTENTS:
1. Heap Basics & Theory
2. Python's heapq Module - Built-in Functions
3. Min Heap Operations
4. Max Heap Operations (using negation trick)
5. Custom Heap with Objects/Tuples
6. Common Heap Patterns in DSA
7. Heap Implementation from Scratch
8. Time & Space Complexity Reference
9. Common Interview Problems & Patterns

================================================================================
"""

import heapq
from typing import List, Tuple, Any, Union
from dataclasses import dataclass, field


# ==============================================================================
# 1. HEAP BASICS & THEORY
# ==============================================================================
"""
WHAT IS A HEAP?
---------------
- A heap is a complete binary tree that satisfies the heap property.
- Complete binary tree: All levels are fully filled except possibly the last,
  which is filled from left to right.

TYPES OF HEAPS:
---------------
1. Min Heap: Parent node is SMALLER than or equal to its children.
   - Root contains the MINIMUM element.
   - Used for: Finding minimum, priority queues (ascending), Dijkstra's algorithm.

2. Max Heap: Parent node is GREATER than or equal to its children.
   - Root contains the MAXIMUM element.
   - Used for: Finding maximum, priority queues (descending), heap sort.

ARRAY REPRESENTATION:
---------------------
For a node at index i (0-based indexing):
- Parent index:      (i - 1) // 2
- Left child index:  2 * i + 1
- Right child index: 2 * i + 2

Example Min Heap:
        1
       / \
      3   5
     / \
    7   9

Array: [1, 3, 5, 7, 9]
Index:  0  1  2  3  4

KEY OPERATIONS & COMPLEXITIES:
------------------------------
| Operation      | Time Complexity |
|----------------|-----------------|
| Insert         | O(log n)        |
| Delete Min/Max | O(log n)        |
| Get Min/Max    | O(1)            |
| Heapify array  | O(n)            |
| Search         | O(n)            |
"""


# ==============================================================================
# 2. PYTHON'S heapq MODULE - BUILT-IN FUNCTIONS
# ==============================================================================
"""
Python's heapq module implements a MIN HEAP by default.
All functions work on regular Python lists.
"""

def heapq_basics_demo():
    """Demonstrates all basic heapq functions."""

    # --------------------------------------------------------------------------
    # heapq.heappush(heap, item) - Push item onto heap
    # Time: O(log n)
    # --------------------------------------------------------------------------
    heap = []
    heapq.heappush(heap, 5)
    heapq.heappush(heap, 3)
    heapq.heappush(heap, 7)
    heapq.heappush(heap, 1)
    print(f"After pushes: {heap}")  # [1, 3, 7, 5]

    # --------------------------------------------------------------------------
    # heapq.heappop(heap) - Pop and return smallest item
    # Time: O(log n)
    # --------------------------------------------------------------------------
    smallest = heapq.heappop(heap)
    print(f"Popped: {smallest}")  # 1
    print(f"After pop: {heap}")   # [3, 5, 7]

    # --------------------------------------------------------------------------
    # heap[0] - Access smallest item WITHOUT removing
    # Time: O(1)
    # --------------------------------------------------------------------------
    print(f"Smallest (peek): {heap[0]}")  # 3

    # --------------------------------------------------------------------------
    # heapq.heapify(list) - Convert list to heap IN-PLACE
    # Time: O(n) - More efficient than n pushes which would be O(n log n)
    # --------------------------------------------------------------------------
    arr = [9, 5, 2, 7, 3, 8, 1]
    heapq.heapify(arr)
    print(f"Heapified: {arr}")  # [1, 3, 2, 7, 5, 8, 9]

    # --------------------------------------------------------------------------
    # heapq.heappushpop(heap, item) - Push then pop (more efficient than separate ops)
    # Time: O(log n)
    # Returns: The smaller of (item, current_min)
    # --------------------------------------------------------------------------
    heap = [2, 4, 6]
    result = heapq.heappushpop(heap, 1)  # Push 1, then pop smallest
    print(f"heappushpop result: {result}")  # 1 (pushed 1, popped 1)

    result = heapq.heappushpop(heap, 5)  # Push 5, then pop smallest
    print(f"heappushpop result: {result}")  # 2

    # --------------------------------------------------------------------------
    # heapq.heapreplace(heap, item) - Pop then push (more efficient than separate ops)
    # Time: O(log n)
    # Returns: The old minimum (before replacement)
    # NOTE: Does NOT push first, so new item may be smaller than returned value
    # --------------------------------------------------------------------------
    heap = [1, 3, 5]
    result = heapq.heapreplace(heap, 10)  # Pop 1, then push 10
    print(f"heapreplace result: {result}")  # 1
    print(f"After heapreplace: {heap}")     # [3, 10, 5]

    # --------------------------------------------------------------------------
    # heapq.nlargest(n, iterable, key=None) - Get n largest elements
    # Time: O(n log k) where k is the number of elements requested
    # Efficient when k << len(iterable)
    # --------------------------------------------------------------------------
    arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
    largest_3 = heapq.nlargest(3, arr)
    print(f"3 largest: {largest_3}")  # [9, 6, 5]

    # --------------------------------------------------------------------------
    # heapq.nsmallest(n, iterable, key=None) - Get n smallest elements
    # Time: O(n log k)
    # --------------------------------------------------------------------------
    smallest_3 = heapq.nsmallest(3, arr)
    print(f"3 smallest: {smallest_3}")  # [1, 1, 2]

    # --------------------------------------------------------------------------
    # Using key parameter with nlargest/nsmallest
    # --------------------------------------------------------------------------
    people = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
    oldest = heapq.nlargest(2, people, key=lambda x: x[1])
    print(f"2 oldest: {oldest}")  # [('Charlie', 35), ('Alice', 30)]


# ==============================================================================
# 3. MIN HEAP OPERATIONS
# ==============================================================================

class MinHeapOperations:
    """Common min heap operations for DSA problems."""

    @staticmethod
    def create_min_heap(arr: List[int]) -> List[int]:
        """Create min heap from array."""
        heap = arr.copy()
        heapq.heapify(heap)
        return heap

    @staticmethod
    def push(heap: List[int], val: int) -> None:
        """Push value onto min heap."""
        heapq.heappush(heap, val)

    @staticmethod
    def pop(heap: List[int]) -> int:
        """Pop and return minimum value."""
        return heapq.heappop(heap)

    @staticmethod
    def peek(heap: List[int]) -> int:
        """Return minimum value without removing."""
        return heap[0] if heap else None

    @staticmethod
    def push_pop(heap: List[int], val: int) -> int:
        """Push value then pop minimum (efficient)."""
        return heapq.heappushpop(heap, val)

    @staticmethod
    def replace(heap: List[int], val: int) -> int:
        """Pop minimum then push value (efficient)."""
        return heapq.heapreplace(heap, val)

    @staticmethod
    def get_k_smallest(arr: List[int], k: int) -> List[int]:
        """Get k smallest elements."""
        return heapq.nsmallest(k, arr)


# ==============================================================================
# 4. MAX HEAP OPERATIONS (Using Negation Trick)
# ==============================================================================
"""
Python's heapq only provides MIN heap.
To simulate MAX heap, we NEGATE values when pushing and negate again when popping.

push(x)  → heappush(heap, -x)
pop()    → -heappop(heap)
peek()   → -heap[0]
"""

class MaxHeapOperations:
    """Max heap operations using negation trick."""

    @staticmethod
    def create_max_heap(arr: List[int]) -> List[int]:
        """Create max heap from array."""
        heap = [-x for x in arr]
        heapq.heapify(heap)
        return heap

    @staticmethod
    def push(heap: List[int], val: int) -> None:
        """Push value onto max heap."""
        heapq.heappush(heap, -val)

    @staticmethod
    def pop(heap: List[int]) -> int:
        """Pop and return maximum value."""
        return -heapq.heappop(heap)

    @staticmethod
    def peek(heap: List[int]) -> int:
        """Return maximum value without removing."""
        return -heap[0] if heap else None

    @staticmethod
    def get_k_largest(arr: List[int], k: int) -> List[int]:
        """Get k largest elements."""
        return heapq.nlargest(k, arr)


# Example usage of Max Heap
def max_heap_demo():
    """Demonstrates max heap using negation."""
    max_heap = []

    # Push elements (negate them)
    for val in [3, 1, 4, 1, 5, 9, 2, 6]:
        heapq.heappush(max_heap, -val)

    print("Max heap (internal):", max_heap)
    print("Actual max value:", -max_heap[0])  # 9

    # Pop in descending order
    sorted_desc = []
    while max_heap:
        sorted_desc.append(-heapq.heappop(max_heap))
    print("Sorted descending:", sorted_desc)  # [9, 6, 5, 4, 3, 2, 1, 1]


# ==============================================================================
# 5. CUSTOM HEAP WITH OBJECTS/TUPLES
# ==============================================================================
"""
When using tuples, Python compares element by element from left to right.
First element is the priority, subsequent elements are for tiebreaking or data.

Format: (priority, tiebreaker, data)
"""

def tuple_heap_demo():
    """Using tuples in heap for custom ordering."""

    # Priority Queue with (priority, task)
    tasks = []
    heapq.heappush(tasks, (2, "Medium priority task"))
    heapq.heappush(tasks, (1, "High priority task"))
    heapq.heappush(tasks, (3, "Low priority task"))

    while tasks:
        priority, task = heapq.heappop(tasks)
        print(f"Priority {priority}: {task}")

    # Using counter for tiebreaking (when priorities are equal)
    counter = 0
    pq = []

    def add_task(priority: int, task: str):
        nonlocal counter
        heapq.heappush(pq, (priority, counter, task))
        counter += 1

    add_task(1, "First task")
    add_task(1, "Second task")  # Same priority, but added later
    add_task(1, "Third task")

    while pq:
        priority, count, task = heapq.heappop(pq)
        print(f"({priority}, {count}): {task}")


# Using dataclass for custom objects in heap
@dataclass(order=True)
class PrioritizedItem:
    """Custom class that can be used in heap."""
    priority: int
    item: Any = field(compare=False)  # Exclude from comparison


def dataclass_heap_demo():
    """Using dataclass for heap items."""
    heap = []

    heapq.heappush(heap, PrioritizedItem(2, "Task B"))
    heapq.heappush(heap, PrioritizedItem(1, "Task A"))
    heapq.heappush(heap, PrioritizedItem(3, "Task C"))

    while heap:
        item = heapq.heappop(heap)
        print(f"Priority {item.priority}: {item.item}")


# ==============================================================================
# 6. COMMON HEAP PATTERNS IN DSA
# ==============================================================================

# Pattern 1: Kth Largest Element (use min heap of size k)
def find_kth_largest(nums: List[int], k: int) -> int:
    """
    Find kth largest element using min heap.
    Keep a min heap of size k - the root will be the kth largest.
    Time: O(n log k), Space: O(k)
    """
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]


# Pattern 2: Kth Smallest Element (use max heap of size k)
def find_kth_smallest(nums: List[int], k: int) -> int:
    """
    Find kth smallest element using max heap (negation).
    Time: O(n log k), Space: O(k)
    """
    heap = []
    for num in nums:
        heapq.heappush(heap, -num)
        if len(heap) > k:
            heapq.heappop(heap)
    return -heap[0]


# Pattern 3: Merge K Sorted Lists/Arrays
def merge_k_sorted_arrays(arrays: List[List[int]]) -> List[int]:
    """
    Merge k sorted arrays using min heap.
    Heap stores: (value, array_index, element_index)
    Time: O(n log k) where n is total elements, k is number of arrays
    """
    heap = []
    result = []

    # Initialize heap with first element of each array
    for i, arr in enumerate(arrays):
        if arr:
            heapq.heappush(heap, (arr[0], i, 0))

    while heap:
        val, arr_idx, elem_idx = heapq.heappop(heap)
        result.append(val)

        # Push next element from same array
        if elem_idx + 1 < len(arrays[arr_idx]):
            next_val = arrays[arr_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, arr_idx, elem_idx + 1))

    return result


# Pattern 4: Running Median (Two Heaps)
class MedianFinder:
    """
    Find median from a stream of numbers using two heaps.
    - max_heap: stores smaller half (negate for max heap behavior)
    - min_heap: stores larger half
    Time: O(log n) for addNum, O(1) for findMedian
    """

    def __init__(self):
        self.max_heap = []  # Smaller half (negated)
        self.min_heap = []  # Larger half

    def add_num(self, num: int) -> None:
        # Add to appropriate heap
        if not self.max_heap or num <= -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
        else:
            heapq.heappush(self.min_heap, num)

        # Balance heaps (max_heap can have at most 1 more element)
        if len(self.max_heap) > len(self.min_heap) + 1:
            heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        elif len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))

    def find_median(self) -> float:
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2


# Pattern 5: Top K Frequent Elements
def top_k_frequent(nums: List[int], k: int) -> List[int]:
    """
    Find k most frequent elements using min heap.
    Time: O(n log k), Space: O(n)
    """
    from collections import Counter

    freq = Counter(nums)
    heap = []

    for num, count in freq.items():
        heapq.heappush(heap, (count, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for count, num in heap]


# Pattern 6: Task Scheduler / CPU Scheduling
def least_interval(tasks: List[str], n: int) -> int:
    """
    Calculate minimum intervals to complete all tasks with cooldown.
    Uses max heap to always process most frequent task first.
    Time: O(total_tasks), Space: O(1) - only 26 letters
    """
    from collections import Counter

    freq = Counter(tasks)
    max_heap = [-count for count in freq.values()]
    heapq.heapify(max_heap)

    time = 0
    cooldown = []  # (available_time, count)

    while max_heap or cooldown:
        time += 1

        if max_heap:
            count = heapq.heappop(max_heap) + 1  # Process one task
            if count < 0:
                cooldown.append((time + n, count))

        # Check if any task is ready to be processed again
        if cooldown and cooldown[0][0] == time:
            _, count = cooldown.pop(0)
            heapq.heappush(max_heap, count)

    return time


# Pattern 7: Dijkstra's Algorithm (Shortest Path)
def dijkstra(graph: List[List[Tuple[int, int]]], start: int) -> List[Union[int, float]]:
    """
    Find shortest path from start to all nodes.
    graph[u] = [(v, weight), ...] - adjacency list with weights
    Time: O((V + E) log V), Space: O(V)
    """
    n = len(graph)
    dist = [float('inf')] * n
    dist[start] = 0

    # Min heap: (distance, node)
    heap = [(0, start)]

    while heap:
        d, u = heapq.heappop(heap)

        if d > dist[u]:  # Skip outdated entries
            continue

        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(heap, (dist[v], v))

    return dist


# Pattern 8: Minimum Cost to Connect Ropes
def connect_ropes(ropes: List[int]) -> int:
    """
    Connect ropes with minimum cost.
    Always connect two smallest ropes first.
    Time: O(n log n), Space: O(n)
    """
    heapq.heapify(ropes)
    total_cost = 0

    while len(ropes) > 1:
        first = heapq.heappop(ropes)
        second = heapq.heappop(ropes)
        cost = first + second
        total_cost += cost
        heapq.heappush(ropes, cost)

    return total_cost


# Pattern 9: Sliding Window Maximum (using max heap with lazy deletion)
def max_sliding_window(nums: List[int], k: int) -> List[int]:
    """
    Find maximum in each sliding window of size k.
    Time: O(n log n), Space: O(n)
    """
    if not nums:
        return []

    # Max heap: (-value, index)
    heap = []
    result = []

    for i, num in enumerate(nums):
        heapq.heappush(heap, (-num, i))

        # Remove elements outside current window
        while heap[0][1] <= i - k:
            heapq.heappop(heap)

        # Add maximum to result once we have a complete window
        if i >= k - 1:
            result.append(-heap[0][0])

    return result


# ==============================================================================
# 7. HEAP IMPLEMENTATION FROM SCRATCH
# ==============================================================================

class MinHeap:
    """Complete min heap implementation from scratch."""

    def __init__(self):
        self.heap = []

    def _parent(self, i: int) -> int:
        return (i - 1) // 2

    def _left_child(self, i: int) -> int:
        return 2 * i + 1

    def _right_child(self, i: int) -> int:
        return 2 * i + 2

    def _swap(self, i: int, j: int) -> None:
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def _sift_up(self, i: int) -> None:
        """Move element up to maintain heap property."""
        parent = self._parent(i)
        while i > 0 and self.heap[parent] > self.heap[i]:
            self._swap(parent, i)
            i = parent
            parent = self._parent(i)

    def _sift_down(self, i: int) -> None:
        """Move element down to maintain heap property."""
        min_idx = i
        n = len(self.heap)

        left = self._left_child(i)
        if left < n and self.heap[left] < self.heap[min_idx]:
            min_idx = left

        right = self._right_child(i)
        if right < n and self.heap[right] < self.heap[min_idx]:
            min_idx = right

        if min_idx != i:
            self._swap(i, min_idx)
            self._sift_down(min_idx)

    def push(self, val: int) -> None:
        """Insert element. Time: O(log n)"""
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self) -> int:
        """Remove and return minimum. Time: O(log n)"""
        if not self.heap:
            raise IndexError("pop from empty heap")

        min_val = self.heap[0]
        last_val = self.heap.pop()

        if self.heap:
            self.heap[0] = last_val
            self._sift_down(0)

        return min_val

    def peek(self) -> int:
        """Return minimum without removing. Time: O(1)"""
        if not self.heap:
            raise IndexError("peek from empty heap")
        return self.heap[0]

    def __len__(self) -> int:
        return len(self.heap)

    def __bool__(self) -> bool:
        return bool(self.heap)

    @classmethod
    def heapify(cls, arr: List[int]) -> 'MinHeap':
        """Build heap from array. Time: O(n)"""
        heap = cls()
        heap.heap = arr.copy()

        # Start from last non-leaf node and sift down
        for i in range((len(arr) - 2) // 2, -1, -1):
            heap._sift_down(i)

        return heap


class MaxHeap:
    """Max heap implementation (wraps MinHeap with negation)."""

    def __init__(self):
        self._heap = MinHeap()

    def push(self, val: int) -> None:
        self._heap.push(-val)

    def pop(self) -> int:
        return -self._heap.pop()

    def peek(self) -> int:
        return -self._heap.peek()

    def __len__(self) -> int:
        return len(self._heap)

    def __bool__(self) -> bool:
        return bool(self._heap)


# ==============================================================================
# 8. TIME & SPACE COMPLEXITY REFERENCE
# ==============================================================================
"""
HEAP OPERATIONS COMPLEXITY:
===========================

| Operation              | Time Complexity | Space Complexity |
|------------------------|-----------------|------------------|
| heappush               | O(log n)        | O(1)             |
| heappop                | O(log n)        | O(1)             |
| peek (heap[0])         | O(1)            | O(1)             |
| heapify                | O(n)            | O(1) in-place    |
| heappushpop            | O(log n)        | O(1)             |
| heapreplace            | O(log n)        | O(1)             |
| nlargest(k, arr)       | O(n log k)      | O(k)             |
| nsmallest(k, arr)      | O(n log k)      | O(k)             |
| Build heap from array  | O(n)            | O(1) in-place    |
| Search in heap         | O(n)            | O(1)             |
| Delete arbitrary       | O(n)            | O(1)             |

WHEN TO USE WHAT:
=================
- k largest/smallest with k << n: Use heap O(n log k)
- k largest/smallest with k ≈ n: Use sorting O(n log n)
- Continuous stream: Use heap
- Find median in stream: Use two heaps
- Merge k sorted: Use heap O(n log k)
- Priority queue: Use heap
- Shortest path (Dijkstra): Use min heap
"""


# ==============================================================================
# 9. QUICK REFERENCE CHEAT SHEET
# ==============================================================================
"""
QUICK REFERENCE:
================

# Import
import heapq

# Create heap from list
heapq.heapify(arr)                    # In-place, O(n)

# Push
heapq.heappush(heap, item)            # O(log n)

# Pop minimum
min_val = heapq.heappop(heap)         # O(log n)

# Peek minimum
min_val = heap[0]                     # O(1)

# Push then pop (efficient)
val = heapq.heappushpop(heap, item)   # O(log n)

# Pop then push (efficient)
val = heapq.heapreplace(heap, item)   # O(log n)

# Get k largest
k_largest = heapq.nlargest(k, arr)    # O(n log k)

# Get k smallest
k_smallest = heapq.nsmallest(k, arr)  # O(n log k)

# MAX HEAP (negate values):
heapq.heappush(heap, -val)            # Push
max_val = -heapq.heappop(heap)        # Pop
max_val = -heap[0]                    # Peek

# TUPLE HEAP (priority queue):
heapq.heappush(heap, (priority, counter, data))
priority, counter, data = heapq.heappop(heap)

# COMMON PATTERNS:
- Kth largest:     min heap of size k, return heap[0]
- Kth smallest:    max heap of size k, return -heap[0]
- Running median:  two heaps (max_heap for smaller, min_heap for larger)
- Merge k sorted:  min heap of (value, array_idx, elem_idx)
- Top k frequent:  min heap of (frequency, element)
"""


# ==============================================================================
# EXAMPLE USAGE AND TESTING
# ==============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print("HEAP BASICS DEMO")
    print("=" * 60)
    heapq_basics_demo()

    print("\n" + "=" * 60)
    print("MAX HEAP DEMO")
    print("=" * 60)
    max_heap_demo()

    print("\n" + "=" * 60)
    print("TUPLE HEAP DEMO")
    print("=" * 60)
    tuple_heap_demo()

    print("\n" + "=" * 60)
    print("PATTERN DEMOS")
    print("=" * 60)

    # Kth largest
    nums = [3, 2, 1, 5, 6, 4]
    print(f"Kth largest (k=2) in {nums}: {find_kth_largest(nums, 2)}")

    # Merge k sorted arrays
    arrays = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    print(f"Merged sorted arrays: {merge_k_sorted_arrays(arrays)}")

    # Median finder
    mf = MedianFinder()
    for num in [1, 2, 3, 4, 5]:
        mf.add_num(num)
        print(f"After adding {num}, median: {mf.find_median()}")

    # Connect ropes
    ropes = [4, 3, 2, 6]
    print(f"Min cost to connect ropes {ropes}: {connect_ropes(ropes.copy())}")

    print("\n" + "=" * 60)
    print("CUSTOM HEAP DEMO")
    print("=" * 60)
    heap = MinHeap()
    for val in [5, 3, 8, 1, 9, 2]:
        heap.push(val)
        print(f"Pushed {val}, heap min: {heap.peek()}")

    print("\nPopping all elements:")
    while heap:
        print(f"Popped: {heap.pop()}")

