"""
QUESTION:
Given a singly linked list and an integer x (1-based index).
Delete the xth node from the linked list.

Example 1:
  Input:  1 -> 3 -> 4,  x = 3
  Output: 1 -> 3

Example 2:
  Input:  1 -> 5 -> 2 -> 9,  x = 2
  Output: 1 -> 2 -> 9

APPROACH:
1. If x == 1, the head itself is deleted → return head.next.
2. Traverse to the (x-1)th node using a counter.
3. Skip the xth node: curr.next = curr.next.next
4. Return the (possibly unchanged) head.

Time Complexity:  O(N) — traverse up to position x
Space Complexity: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def delete_node(head, x):
    # Deleting head node
    if x == 1:
        return head.next

    cnt = 1
    curr = head
    # Traverse to (x-1)th node
    while cnt < x - 1:
        curr = curr.next
        cnt += 1
    # Skip the xth node
    curr.next = curr.next.next
    return head


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
    head = build_ll([1, 3, 4])
    head = delete_node(head, 3)
    print_ll(head)  # 1 -> 3

    head = build_ll([1, 5, 2, 9])
    head = delete_node(head, 2)
    print_ll(head)  # 1 -> 2 -> 9

