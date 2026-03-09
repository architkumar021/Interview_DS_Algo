"""
QUESTION:
Given the head of a linked list, remove the nth node from the end and return head.

Example 1:  Input: [1,2,3,4,5], n=2  Output: [1,2,3,5]
Example 2:  Input: [1], n=1          Output: []
Example 3:  Input: [1,2], n=1        Output: [1]

APPROACH: Two Pointers (left & right)
1. Move right pointer n nodes ahead.
2. If right is None → head itself is the nth from end → return head.next.
3. Move both left and right together until right.next is None.
4. Now left.next is the node to delete → left.next = left.next.next.

TIME COMPLEXITY:  O(N)  — single pass
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def remove_nth_from_end(head, n):
    left  = head
    right = head

    # Move right n steps ahead
    for _ in range(n):
        right = right.next

    # If right is None, remove the head
    if not right:
        return head.next

    # Move both until right reaches last node
    while right.next:
        left  = left.next
        right = right.next

    # Skip the nth node from end
    left.next = left.next.next
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
    print_ll(remove_nth_from_end(build_ll([1, 2, 3, 4, 5]), 2))  # 1 -> 2 -> 3 -> 5
    print_ll(remove_nth_from_end(build_ll([1]), 1))               # []
    print_ll(remove_nth_from_end(build_ll([1, 2]), 1))            # 1

