"""
QUESTION:
Given a doubly linked list, a position p (0-based), and an integer x.
Insert a new node with value x just after the pth node.

Example 1:
  Input:  2 <--> 4 <--> 5,  p = 2, x = 6
  Output: 2 <--> 4 <--> 5 <--> 6

Example 2:
  Input:  1 <--> 2 <--> 3 <--> 4,  p = 0, x = 44
  Output: 1 <--> 44 <--> 2 <--> 3 <--> 4

APPROACH:
1. Traverse to the pth node (0-based) using a counter.
2. Create a new node with value x.
3. Wire the new node:
   - new_node.next = curr.next     (point forward to what was after curr)
   - new_node.prev = curr          (point back to curr)
   - curr.next.prev = new_node     (if next exists, fix its back pointer)
   - curr.next = new_node          (curr now points forward to new_node)

Time Complexity:  O(N) — traverse to position p
Space Complexity: O(1) extra
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def add_node(head, pos, data):
    cnt = 0
    curr = head

    # Traverse to pth node
    while cnt < pos:
        curr = curr.next
        cnt += 1

    new_node = Node(data)
    nxt = curr.next

    new_node.next = nxt         # new → old next
    new_node.prev = curr        # new ← curr
    curr.next = new_node        # curr → new
    if nxt:
        nxt.prev = new_node     # old next ← new


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
    head = build_dll([2, 4, 5])
    add_node(head, 2, 6)
    print_dll(head)  # 2 <--> 4 <--> 5 <--> 6

    head = build_dll([1, 2, 3, 4])
    add_node(head, 0, 44)
    print_dll(head)  # 1 <--> 44 <--> 2 <--> 3 <--> 4

