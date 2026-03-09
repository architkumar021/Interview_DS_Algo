"""
QUESTION:
Given a SORTED doubly linked list, remove all duplicate nodes so that each
value appears only once. Return the head of the modified list.

Example 1:
  Input:  1 <-> 1 <-> 1 <-> 2 <-> 3 <-> 4
  Output: 1 <-> 2 <-> 3 <-> 4

Example 2:
  Input:  1 <-> 2 <-> 2 <-> 3 <-> 3 <-> 4 <-> 4
  Output: 1 <-> 2 <-> 3 <-> 4

APPROACH:
- Track current unique value in `dup_val` (start with head.data).
- Walk curr from head.next:
    - Inner while: while curr exists AND curr.data == dup_val
        → unlink curr: fix prev.next and next.prev, advance curr.
    - After inner while: curr is either None or a new unique value.
        → update dup_val = curr.data, advance curr = curr.next.

Since the list is SORTED, all duplicates are contiguous → single pass.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def remove_duplicates(head):
    if not head:
        return None

    dup_val = head.data
    curr    = head.next

    while curr:
        # Remove all nodes with value == dup_val
        while curr and curr.data == dup_val:
            # Unlink curr from DLL
            curr.prev.next = curr.next
            if curr.next:
                curr.next.prev = curr.prev
            curr = curr.next

        # curr is now at a new unique value (or None)
        if curr:
            dup_val = curr.data
            curr    = curr.next

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
    print(" <-> ".join(result))


# Driver
if __name__ == "__main__":
    head = build_dll([1, 1, 1, 2, 3, 4])
    print_dll(remove_duplicates(head))  # 1 <-> 2 <-> 3 <-> 4

    head = build_dll([1, 2, 2, 3, 3, 4, 4])
    print_dll(remove_duplicates(head))  # 1 <-> 2 <-> 3 <-> 4

    head = build_dll([1, 1, 2, 2, 3])
    print_dll(remove_duplicates(head))  # 1 <-> 2 <-> 3

