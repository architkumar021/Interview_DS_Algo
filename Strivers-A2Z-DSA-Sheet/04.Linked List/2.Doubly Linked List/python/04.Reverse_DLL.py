"""
QUESTION:
Given a doubly linked list, reverse it in-place and return the new head.

Example 1:
  Input:  3 <--> 4 <--> 5
  Output: 5 <--> 4 <--> 3

Example 2:
  Input:  75 <--> 122 <--> 59 <--> 196
  Output: 196 <--> 59 <--> 122 <--> 75

APPROACH:
Traverse the list and for EVERY node, swap its next and prev pointers.
- Save curr.next in nxt before swapping (so we don't lose the reference).
- After swap: curr.prev holds the original curr.next (the way to move forward).
- When curr.prev becomes None after the swap, curr was the last node
  in the original list → it is now the new head.

  Before swap: curr.prev → left,  curr.next → right
  After  swap: curr.prev → right, curr.next → left
  New head = the node whose new prev is None (was the tail).

Time Complexity:  O(N) — every node visited once
Space Complexity: O(1) — no extra space
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def reverse_dll(head):
    curr = head
    new_head = None

    while curr:
        nxt = curr.next     # save next before overwriting

        # Swap next and prev
        curr.next = curr.prev
        curr.prev = nxt

        # After swap, curr.prev == nxt (original next).
        # When curr.prev is None, curr was the original tail → new head.
        if curr.prev is None:
            new_head = curr

        curr = curr.prev    # move forward (was nxt before swap)

    return new_head


# Helper: build DLL from array
def build_dll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        n = Node(arr[i])
        n.prev = curr
        curr.next = n
        curr = n
    return head


# Helper: print DLL
def print_dll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data))
        curr = curr.next
    print(" <--> ".join(result))


# Driver code
if __name__ == "__main__":
    head = build_dll([3, 4, 5])
    head = reverse_dll(head)
    print_dll(head)  # 5 <--> 4 <--> 3

    head = build_dll([75, 122, 59, 196])
    head = reverse_dll(head)
    print_dll(head)  # 196 <--> 59 <--> 122 <--> 75

