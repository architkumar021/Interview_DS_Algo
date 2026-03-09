"""
QUESTION:
Given head of a linked list, determine if the linked list has a cycle.
Return True if there is a cycle, otherwise False.

Example 1:  Input: [3,2,0,-4], pos=1  Output: True
Example 2:  Input: [1], pos=-1        Output: False

APPROACH: Floyd's Cycle Detection (Tortoise & Hare)
- slow moves 1 step, fast moves 2 steps.
- If there is a cycle, fast will eventually lap slow → they meet.
- If fast reaches None, no cycle exists.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def has_cycle(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True  # cycle detected

    return False


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
    print(has_cycle(head1))  # True

    head2 = build_ll([1])
    print(has_cycle(head2))  # False

