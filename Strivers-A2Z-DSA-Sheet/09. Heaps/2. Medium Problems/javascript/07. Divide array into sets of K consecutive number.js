/*
QUESTION:
Given an array of integers nums and a positive integer k, check whether it is possible to
divide this array into sets of k consecutive numbers.

Return true if it is possible. Otherwise, return false.

Example:
Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].

═══════════════════════════════════════════════════════
  APPROACH 1: Sort + Frequency Map (Greedy)
═══════════════════════════════════════════════════════

1. First, we check if the array size is divisible by k. If not, it is not possible to
   divide the array into sets of k consecutive numbers.
2. We use a frequency map mp to count the occurrences of each element in the array.
3. We sort the array nums in ascending order.
4. For each number num in nums, we check if it is still available (mp[num] > 0).
5. If num is available, we iterate from num + 1 to num + k - 1 and check if each number
   is available in mp as well. If any number is not available, we return false.
6. If all numbers are available, we decrement the counts in mp accordingly.
7. If we reach the end of the loop, it means it is possible to divide the array into
   sets of k consecutive numbers, and we return true.

COMPLEXITY ANALYSIS:
- Time complexity: O(n log n), where n is the size of the input array nums.
  The complexity is dominated by the sorting step.
- Space complexity: O(n), to store the frequency map.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function isPossibleDivide(nums, k) {
    if (nums.length % k !== 0) {
        return false;
    }

    const mp = new Map();

    // Count frequency of each number
    for (const num of nums) {
        mp.set(num, (mp.get(num) || 0) + 1);
    }

    // Sort the array
    nums.sort((a, b) => a - b);

    for (const num of nums) {
        if (mp.get(num) > 0) {
            // Try to form a group starting from num
            for (let i = num + 1; i < num + k; i++) {
                if (!mp.has(i) || mp.get(i) === 0) {
                    return false;
                }
                mp.set(i, mp.get(i) - 1);
            }
            mp.set(num, mp.get(num) - 1);
        }
    }

    return true;
}


/*
═══════════════════════════════════════════════════════
  APPROACH 2: Min-Heap + Frequency Map (Optimal Heap)
═══════════════════════════════════════════════════════

Key Insight:
  Instead of sorting the entire array, use a min-heap of UNIQUE numbers.
  The heap always gives us the smallest available number — which MUST be the
  start of a group (it can't be in the middle of any group, since nothing
  smaller exists to start a group that includes it).

Algorithm:
  1. If n % k ≠ 0 → false
  2. Build frequency map
  3. Push all UNIQUE numbers into a min-heap
  4. While heap is not empty:
     a. Peek at the minimum (= start of next group)
     b. Try to form group: [start, start+1, ..., start+k-1]
     c. For each number in the group:
        - If freq is 0 → impossible → return false
        - Decrement freq
        - If freq becomes 0 AND it's the current heap top → pop it
        - If freq becomes 0 AND it's NOT the heap top → GAP exists → return false
          (because the heap top is smaller and still has remaining count, meaning
           there's no way to start a valid group from it)
  5. Return true

Why this works:
  The min-heap ensures we always process the smallest unused number.
  If after decrementing, a number's freq hits 0 and it's the heap top, we remove it.
  If a number in the middle of our group hits 0 but ISN'T the heap top, that means
  there's a smaller number still in the heap that can never be the start of a valid
  consecutive group (gap detected).

COMPLEXITY ANALYSIS:
  - Time:  O(n log m) where m = number of unique elements. Each unique element
    is pushed/popped at most once → O(m log m). Building freq map = O(n).
    In worst case m = n → O(n log n), same as sort approach.
    But when there are many duplicates (m << n), this is faster.
  - Space: O(m) for heap + O(n) for frequency map.


DRY RUN — Example: nums = [1,2,3,3,4,4,5,6], k = 4

  Freq map: {1:1, 2:1, 3:2, 4:2, 5:1, 6:1}
  Min-heap (unique): [1, 2, 3, 4, 5, 6]

  ── Iteration 1: heap top = 1, form group [1,2,3,4] ──
    1: freq 1→0, 1 IS heap top → pop    heap: [2,3,4,5,6]
    2: freq 1→0, 2 IS heap top → pop    heap: [3,4,5,6]
    3: freq 2→1, 3 IS heap top, freq>0  heap: [3,4,5,6]  (don't pop)
    4: freq 2→1, not heap top, freq>0   heap: [3,4,5,6]
    ✅ Group [1,2,3,4] formed

  ── Iteration 2: heap top = 3, form group [3,4,5,6] ──
    3: freq 1→0, 3 IS heap top → pop    heap: [4,5,6]
    4: freq 1→0, 4 IS heap top → pop    heap: [5,6]
    5: freq 1→0, 5 IS heap top → pop    heap: [6]
    6: freq 1→0, 6 IS heap top → pop    heap: []
    ✅ Group [3,4,5,6] formed

  Heap empty → return true ✅


DRY RUN — Failure case: nums = [1,2,3,5,6,7], k = 3

  Freq map: {1:1, 2:1, 3:1, 5:1, 6:1, 7:1}
  Min-heap: [1, 2, 3, 5, 6, 7]

  ── Iteration 1: heap top = 1, form group [1,2,3] ──
    1: freq 1→0, pop → heap: [2,3,5,6,7]
    2: freq 1→0, pop → heap: [3,5,6,7]
    3: freq 1→0, pop → heap: [5,6,7]
    ✅ Group [1,2,3] formed

  ── Iteration 2: heap top = 5, form group [5,6,7] ──
    5: freq 1→0, pop → heap: [6,7]
    6: freq 1→0, pop → heap: [7]
    7: freq 1→0, pop → heap: []
    ✅ Group [5,6,7] formed

  Return true ✅


DRY RUN — Gap detected: nums = [1,2,4,5], k = 2 (no 3, can't pair 2 with 3)

  Wait — k=2 so groups are pairs: [1,2] and [4,5] → actually works!

  Better example: nums = [1,2,3,4,4,5], k = 3 → need groups of 3 consecutive
  n=6, 6%3=0 ✓

  Freq: {1:1, 2:1, 3:1, 4:2, 5:1}
  Heap: [1,2,3,4,5]

  ── Iter 1: start=1, group [1,2,3] ──
    1→0 pop. 2→0 pop. 3→0 pop. heap: [4,5]

  ── Iter 2: start=4, group [4,5,6] ──
    4: freq 2→1. 5: freq 1→0. 5 IS NOT heap top (4 is). freq=0 but not top!
    → This means 4 still remains but 5 is gone → no way to form a group starting with 4
    → return false ✅ (correct — can't make [4,5,6] since no 6)

*/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._bubbleDown(0);
        }
        return top;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.heap[parent] <= this.heap[idx]) break;
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }

    _bubbleDown(idx) {
        const n = this.heap.length;
        while (true) {
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            let smallest = idx;
            if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function isPossibleDivideHeap(nums, k) {
    if (nums.length % k !== 0) {
        return false;
    }

    // Build frequency map
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Push all unique numbers into min-heap
    const pq = new MinHeap();
    for (const key of freq.keys()) {
        pq.push(key);
    }

    // Process groups
    while (!pq.isEmpty()) {
        const start = pq.peek();  // Smallest available = must be start of a group

        // Try to form group [start, start+1, ..., start+k-1]
        for (let i = start; i < start + k; i++) {
            // Check if this number exists with remaining count
            if (!freq.has(i) || freq.get(i) === 0) {
                return false;  // Can't form consecutive group
            }

            freq.set(i, freq.get(i) - 1);

            // If count becomes 0, it MUST be the current heap top
            // (otherwise there's a gap — a smaller number still needs to start a group)
            if (freq.get(i) === 0) {
                if (i !== pq.peek()) {
                    return false;  // Gap detected!
                }
                pq.pop();  // Remove exhausted number from heap
            }
        }
    }

    return true;
}


// ─── Test Cases ───
console.log("=== Approach 1: Sort + Freq Map ===");
console.log(isPossibleDivide([1,2,3,3,4,4,5,6], 4));              // true
console.log(isPossibleDivide([3,2,1,2,3,4,3,4,5,9,10,11], 3));    // true
console.log(isPossibleDivide([1,2,3,4], 3));                       // false

console.log("\n=== Approach 2: Min-Heap + Freq Map ===");
console.log(isPossibleDivideHeap([1,2,3,3,4,4,5,6], 4));           // true
console.log(isPossibleDivideHeap([3,2,1,2,3,4,3,4,5,9,10,11], 3)); // true
console.log(isPossibleDivideHeap([1,2,3,4], 3));                    // false
console.log(isPossibleDivideHeap([1,2,3,4,4,5], 3));                // false (gap: no 6)

