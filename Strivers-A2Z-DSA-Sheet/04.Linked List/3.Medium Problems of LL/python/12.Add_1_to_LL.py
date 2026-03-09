"""
QUESTION:
A number N is represented in a linked list where each node holds a single digit.
Add 1 to the number and return the updated linked list.

Example:
  Input:  1 -> 9 -> 9   (represents 199)
  Output: 2 -> 0 -> 0   (represents 200)

APPROACH: Reverse → Add → Reverse Back
1. Reverse the list so the least significant digit is at the head.
2. Add 1 to head, propagate carry through the list.
3. If carry remains after traversal, append a new node.
4. Reverse again to restore original order.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def reverse_ll(head):
    prev = None
    curr = head
    while curr:
        frwd = curr.next
        curr.next = prev
        prev = curr
        curr = frwd
    return prev


def add_one(head):
    # Step 1: reverse
    head = reverse_ll(head)

    # Step 2: add 1 with carry
    curr  = head
    carry = 1
    last  = None

    while curr:
        total = curr.data + carry
        curr.data = total % 10
        carry = total // 10
        if not curr.next:
            last = curr
        curr = curr.next

    # Step 3: if carry remains, append new node
    if carry:
        last.next = Node(carry)

    # Step 4: reverse back
    return reverse_ll(head)


# Helpers
def build_ll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = Node(arr[i]); curr = curr.next
    return head

def print_ll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data)); curr = curr.next
    print(" -> ".join(result))


# Driver
if __name__ == "__main__":
    print_ll(add_one(build_ll([1, 9, 9])))  # 2 -> 0 -> 0
    print_ll(add_one(build_ll([9, 9, 9])))  # 1 -> 0 -> 0 -> 0
    print_ll(add_one(build_ll([1, 2, 3])))  # 1 -> 2 -> 4

