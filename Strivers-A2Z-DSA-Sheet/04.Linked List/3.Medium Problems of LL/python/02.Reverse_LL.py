"""
QUESTION:
Given the head of a singly linked list, reverse the list and return the reversed list.

Example 1:  Input: [1,2,3,4,5]  Output: [5,4,3,2,1]
Example 2:  Input: [1,2]        Output: [2,1]

APPROACH: Iterative — three pointers
- prev = None, curr = head, frwd = None
- For each node: save frwd = curr.next, flip curr.next = prev,
  advance prev = curr, curr = frwd.
- When curr is None, prev is the new head.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def reverse_list(head):
    prev = None
    curr = head

    while curr:
        frwd = curr.next   # save next
        curr.next = prev   # reverse link
        prev = curr        # advance prev
        curr = frwd        # advance curr

    return prev  # prev is new head


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
    print(" -> ".join(result))


# Driver
if __name__ == "__main__":
    print_ll(reverse_list(build_ll([1,2,3,4,5])))  # 5 -> 4 -> 3 -> 2 -> 1
    print_ll(reverse_list(build_ll([1,2])))          # 2 -> 1

