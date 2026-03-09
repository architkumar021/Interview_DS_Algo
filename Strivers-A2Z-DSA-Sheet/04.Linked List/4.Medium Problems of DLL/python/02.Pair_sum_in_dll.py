"""
QUESTION:
Given a SORTED doubly linked list of distinct positive integers, find all pairs
whose sum equals a given target.

Example 1:
  Input:  1 <-> 2 <-> 4 <-> 5 <-> 6 <-> 8 <-> 9,  target = 7
  Output: [(1, 6), (2, 5)]

Example 2:
  Input:  1 <-> 5 <-> 6,  target = 6
  Output: [(1, 5)]

APPROACH: Two Pointers (start from head & tail)
- start pointer at head (smallest value).
- end pointer at tail (largest value).
- While start.data < end.data:
    total = start.data + end.data
    total == target → record pair, move BOTH inward
    total  <  target → move start forward (need bigger value)
    total  >  target → move end backward  (need smaller value)

WHY this works: list is sorted → two-pointer converges correctly.

TIME COMPLEXITY:  O(N) — single pass after finding tail
SPACE COMPLEXITY: O(1) extra (O(P) for output where P = pairs found)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def find_pairs_with_given_sum(head, target):
    result = []

    # Find tail (end pointer)
    end = head
    while end.next:
        end = end.next

    start = head

    while start.data < end.data:
        total = start.data + end.data

        if total == target:
            result.append((start.data, end.data))  # valid pair
            start = start.next
            end   = end.prev
        elif total < target:
            start = start.next  # need larger sum → move start right
        else:
            end = end.prev      # need smaller sum → move end left

    return result


# Helpers
def build_dll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        n = Node(arr[i])
        n.prev = curr; curr.next = n; curr = n
    return head


# Driver
if __name__ == "__main__":
    head = build_dll([1, 2, 4, 5, 6, 8, 9])
    print(find_pairs_with_given_sum(head, 7))   # [(1, 6), (2, 5)]

    head = build_dll([1, 5, 6])
    print(find_pairs_with_given_sum(head, 6))   # [(1, 5)]

    head = build_dll([1, 2, 3, 4, 5])
    print(find_pairs_with_given_sum(head, 6))   # [(1, 5), (2, 4)]

