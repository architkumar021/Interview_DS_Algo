"""
QUESTION:
Given the head of a linked list, return the node where the cycle begins.
If there is no cycle, return None.

Example:  Input: [3,2,0,-4], pos=1  Output: node with val 2

APPROACH: Floyd's Cycle Detection + Cycle Entry
Step 1 — Detect meeting point:
  - slow moves 1 step, fast moves 2 steps.
  - If they meet → cycle exists.

Step 2 — Find cycle start:
  - Reset fast to head, keep slow at meeting point.
  - Move both 1 step at a time.
  - Where they meet again = start of the cycle.

WHY it works: Distance from head to cycle start = distance from
meeting point to cycle start (proven mathematically).

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def detect_cycle(head):
    slow = head
    fast = head

    # Step 1: find meeting point inside cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            # Step 2: find cycle start
            fast = head  # reset one pointer to head
            while slow is not fast:
                slow = slow.next
                fast = fast.next
            return slow  # meeting point = cycle start

    return None  # no cycle


# Helpers
def build_ll(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = ListNode(arr[i]); curr = curr.next
    return head


# Driver
if __name__ == "__main__":
    head1 = build_ll([3, 2, 0, -4])
    head1.next.next.next.next = head1.next  # cycle at pos 1
    print(detect_cycle(head1).val)  # 2

    head2 = build_ll([1])
    print(detect_cycle(head2))      # None

