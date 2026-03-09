"""
QUESTION:
Delete the middle node of a linked list and return the head.
Middle = floor(n/2) index (0-based). For n=7, middle index is 3.

Example:
  Input:  [1,3,4,7,1,2,6]  Output: [1,3,4,1,2,6]  (node 7 removed)

APPROACH: Slow & Fast + prev pointer
- slow moves 1 step, fast moves 2 steps.
- Track prev (node before slow).
- When fast reaches end, slow is at middle.
- prev.next = slow.next  →  skips middle node.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def delete_middle(head):
    # Edge case: single node
    if not head or not head.next:
        return None

    slow = head
    fast = head
    prev = None

    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    # slow is at the middle; skip it
    prev.next = slow.next
    return head


# Helpers
def build_ll(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = ListNode(arr[i]); curr = curr.next
    return head

def print_ll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.val)); curr = curr.next
    print(" -> ".join(result) if result else "[]")


# Driver
if __name__ == "__main__":
    print_ll(delete_middle(build_ll([1, 3, 4, 7, 1, 2, 6])))  # 1 -> 3 -> 4 -> 1 -> 2 -> 6
    print_ll(delete_middle(build_ll([1, 2, 3, 4])))            # 1 -> 2 -> 4
    print_ll(delete_middle(build_ll([1])))                     # []

