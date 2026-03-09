"""
QUESTION:
Given a linked list of n nodes and a key, check if the key is present in the linked list.

Example:
  Input:  1 -> 2 -> 3 -> 4,  key = 3
  Output: True

  Input:  1 -> 2 -> 3 -> 4,  key = 7
  Output: False

APPROACH:
Traverse the entire linked list. If any node's data matches the key, return True.
If we reach the end without a match, return False.

Time Complexity:  O(N) — worst case visit every node
Space Complexity: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def search_key(head, key):
    curr = head
    while curr:
        if curr.data == key:
            return True
        curr = curr.next
    return False


# Helper: build linked list from array
def build_ll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = Node(arr[i])
        curr = curr.next
    return head


# Driver code
if __name__ == "__main__":
    head = build_ll([1, 2, 3, 4])
    print(search_key(head, 3))  # True
    print(search_key(head, 7))  # False

