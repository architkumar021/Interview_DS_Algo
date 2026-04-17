"""
QUESTION:
Given an array of integers nums and a positive integer k, check whether it is possible to
divide this array into sets of k consecutive numbers.

Return True if it is possible. Otherwise, return False.

Example:
Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: True
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
   is available in mp as well. If any number is not available, we return False.
6. If all numbers are available, we decrement the counts in mp accordingly.
7. If we reach the end of the loop, it means it is possible to divide the array into
   sets of k consecutive numbers, and we return True.

COMPLEXITY ANALYSIS:
- Time complexity: O(n log n), where n is the size of the input array nums.
  The complexity is dominated by the sorting step.
- Space complexity: O(n), to store the frequency map.
"""

from typing import List
from collections import Counter
import heapq


def is_possible_divide(nums: List[int], k: int) -> bool:
    """
    Approach 1: Sort + Frequency Map (Greedy)
    """
    if len(nums) % k != 0:
        return False

    freq = Counter(nums)
    nums.sort()

    for num in nums:
        if freq[num] > 0:
            for i in range(num + 1, num + k):
                if freq[i] == 0:
                    return False
                freq[i] -= 1
            freq[num] -= 1

    return True


"""
═══════════════════════════════════════════════════════
  APPROACH 2: Min-Heap + Frequency Map (Optimal Heap)
═══════════════════════════════════════════════════════

Key Insight:
  Instead of sorting the entire array, use a min-heap of UNIQUE numbers.
  The heap always gives us the smallest available number — which MUST be the
  start of a group (it can't be in the middle of any group, since nothing
  smaller exists to start a group that includes it).

Algorithm:
  1. If n % k ≠ 0 → False
  2. Build frequency map
  3. Push all UNIQUE numbers into a min-heap
  4. While heap is not empty:
     a. Peek at the minimum (= start of next group)
     b. Try to form group: [start, start+1, ..., start+k-1]
     c. For each number in the group:
        - If freq is 0 → impossible → return False
        - Decrement freq
        - If freq becomes 0 AND it's the current heap top → pop it
        - If freq becomes 0 AND it's NOT the heap top → GAP exists → return False
          (because the heap top is smaller and still has remaining count, meaning
           there's no way to start a valid group from it)
  5. Return True

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

  Heap empty → return True ✅
"""


def is_possible_divide_heap(nums: List[int], k: int) -> bool:
    """
    Approach 2: Min-Heap + Frequency Map (Optimal Heap)

    Uses a min-heap of unique numbers instead of sorting entire array.
    Faster when there are many duplicates (m unique << n total).
    """
    if len(nums) % k != 0:
        return False

    # Build frequency map
    freq = Counter(nums)

    # Push all unique numbers into min-heap
    heap = list(freq.keys())
    heapq.heapify(heap)

    # Process groups
    while heap:
        start = heap[0]  # Smallest available = must be start of a group

        # Try to form group [start, start+1, ..., start+k-1]
        for i in range(start, start + k):
            # Check if this number exists with remaining count
            if freq[i] <= 0:
                return False  # Can't form consecutive group

            freq[i] -= 1

            # If count becomes 0, it MUST be the current heap top
            # (otherwise there's a gap — a smaller number still needs to start a group)
            if freq[i] == 0:
                if i != heap[0]:
                    return False  # Gap detected!
                heapq.heappop(heap)  # Remove exhausted number from heap

    return True


# ─── Test Cases ───
if __name__ == "__main__":
    print("=== Approach 1: Sort + Freq Map ===")
    print(is_possible_divide([1, 2, 3, 3, 4, 4, 5, 6], 4))                # True
    print(is_possible_divide([3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11], 3))  # True
    print(is_possible_divide([1, 2, 3, 4], 3))                              # False

    print("\n=== Approach 2: Min-Heap + Freq Map ===")
    print(is_possible_divide_heap([1, 2, 3, 3, 4, 4, 5, 6], 4))             # True
    print(is_possible_divide_heap([3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11], 3))  # True
    print(is_possible_divide_heap([1, 2, 3, 4], 3))                           # False
    print(is_possible_divide_heap([1, 2, 3, 4, 4, 5], 3))                     # False (gap: no 6)
