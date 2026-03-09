"""
QUESTION:
Given a doubly linked list and a position x (1-based). Delete the node at position x.

Example 1:
  Input:  1 <--> 3 <--> 4,  x = 3
  Output: 1 <--> 3

Example 2:
  Input:  1 <--> 5 <--> 2 <--> 9,  x = 1
  Output: 5 <--> 2 <--> 9

APPROACH:
1. If x == 1 → head is deleted. Return head.next (update its prev to None).
2. Otherwise traverse to node just BEFORE x (position x-1).
3. Let del_node = curr.next (node to delete).
4. curr.next = del_node.next        (skip del_node forward)
5. If del_node.next exists:
     del_node.next.prev = curr      (fix back pointer of next node)

Time Complexity:  O(N)
Space Complexity: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def delete_node(head, x):
    # Deleting head node
    if x == 1:
        new_head = head.next
        if new_head:
            new_head.prev = None    # unlink back pointer
        return new_head

    # Traverse to (x-1)th node
    curr = head
    for _ in range(x - 2):
        curr = curr.next

    del_node = curr.next            # node to be deleted
    curr.next = del_node.next       # skip it forward
    if del_node.next:
        del_node.next.prev = curr   # fix back pointer of next node

    return head


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
    head = build_dll([1, 3, 4])
    head = delete_node(head, 3)
    print_dll(head)  # 1 <--> 3

    head = build_dll([1, 5, 2, 9])
    head = delete_node(head, 1)
    print_dll(head)  # 5 <--> 2 <--> 9

