"""
QUESTION:
Given the head of a doubly linked list and a key, delete ALL occurrences
of the key and return the updated head.

Example:
  Input:  2 <-> 2 <-> 10 <-> 8 <-> 4 <-> 2 <-> 5 <-> 2,  key = 2
  Output: 10 <-> 8 <-> 4 <-> 5

APPROACH:
Traverse every node. When curr.data == key, handle 3 cases:
  1. Head node  (curr.prev is None) → update head to curr.next, fix new head's prev
  2. Tail node  (curr.next is None) → curr.prev.next = None
  3. Middle node                    → wire prev and next around curr

Save curr.next BEFORE unlinking so traversal continues correctly.

TIME COMPLEXITY:  O(N) — single pass
SPACE COMPLEXITY: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def delete_all_occurrences(head, key):
    curr = head

    while curr:
        next_node = curr.next  # save next before potential unlink

        if curr.data == key:
            if not curr.prev:
                # Case 1: deleting head node
                head = curr.next
                if head:
                    head.prev = None
            elif not curr.next:
                # Case 2: deleting tail node
                curr.prev.next = None
            else:
                # Case 3: deleting middle node
                curr.prev.next = curr.next
                curr.next.prev = curr.prev

        curr = next_node  # move to saved next

    return head


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

def print_dll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data)); curr = curr.next
    print(" <-> ".join(result) if result else "(empty)")


# Driver
if __name__ == "__main__":
    head = build_dll([2, 2, 10, 8, 4, 2, 5, 2])
    head = delete_all_occurrences(head, 2)
    print_dll(head)  # 10 <-> 8 <-> 4 <-> 5

    head = build_dll([1, 2, 3, 2, 4])
    head = delete_all_occurrences(head, 2)
    print_dll(head)  # 1 <-> 3 <-> 4

    head = build_dll([5, 5, 5])
    head = delete_all_occurrences(head, 5)
    print_dll(head)  # (empty)

