"""
QUESTION:
Given a singly linked list, find the length (number of nodes) of the linked list.

Example 1:
  Input:  1 -> 2 -> 3 -> 4 -> 5
  Output: 5

Example 2:
  Input:  2 -> 4 -> 6 -> 7 -> 5 -> 1 -> 0
  Output: 7

APPROACH:
1. Initialize a counter cnt = 0.
2. Traverse the list from head to None, incrementing cnt at each node.
3. Return cnt.

Time Complexity:  O(N) — visit every node once
Space Complexity: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def get_count(head):
    cnt = 0
    curr = head
    while curr:
        cnt += 1
        curr = curr.next
    return cnt


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
    head1 = build_ll([1, 2, 3, 4, 5])
    print(get_count(head1))  # 5

    head2 = build_ll([2, 4, 6, 7, 5, 1, 0])
    print(get_count(head2))  # 7

