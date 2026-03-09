"""
QUESTION:
Create a linked list from input literals. Each integer is accompanied by an indicator
(0 or 1). If 0 → insert at the beginning. If 1 → insert at the end.

Example 1:
  Input:  [(9,0), (5,1), (6,1), (2,0), (5,0)]
  Output: 5 -> 2 -> 9 -> 5 -> 6

Example 2:
  Input:  [(5,1), (6,1), (9,1)]
  Output: 5 -> 6 -> 9

APPROACH:
- insert_at_beginning: Create new node, point its next to current head, return new node.
- insert_at_end: Traverse to last node, attach new node at the end.

Time Complexity:  O(N) per insert_at_end call
Space Complexity: O(1) extra per operation
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def insert_at_beginning(head, x):
    temp = Node(x)
    temp.next = head    # New node points to current head
    return temp         # New node becomes the new head


def insert_at_end(head, x):
    temp = Node(x)
    if not head:
        return temp     # Empty list → new node is head
    curr = head
    while curr.next:
        curr = curr.next
    curr.next = temp
    return head


# Helper: print linked list
def print_ll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data))
        curr = curr.next
    print(" -> ".join(result))


# Driver code
if __name__ == "__main__":
    head = None
    operations = [(9, 0), (5, 1), (6, 1), (2, 0), (5, 0)]

    for val, pos in operations:
        if pos == 0:
            head = insert_at_beginning(head, val)
        else:
            head = insert_at_end(head, val)

    print_ll(head)  # 5 -> 2 -> 9 -> 5 -> 6

