"""
QUESTION:
Given a linked list containing only 0s, 1s, and 2s, sort it so that
all 0s come first, then 1s, then 2s.

Example:
  Input:  [1,2,2,1,2,0,2,2]  Output: [0,1,1,2,2,2,2,2]

APPROACH: Count & Overwrite
1. Traverse once and count number of 0s, 1s, and 2s.
2. Traverse again and overwrite node values in order.

TIME COMPLEXITY:  O(N)  — two passes
SPACE COMPLEXITY: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def segregate(head):
    zero_cnt = one_cnt = two_cnt = 0
    curr = head

    # Pass 1: count each value
    while curr:
        if curr.data == 0:   zero_cnt += 1
        elif curr.data == 1: one_cnt  += 1
        else:                two_cnt  += 1
        curr = curr.next

    # Pass 2: overwrite with counted values
    curr = head
    while zero_cnt:
        curr.data = 0; curr = curr.next; zero_cnt -= 1
    while one_cnt:
        curr.data = 1; curr = curr.next; one_cnt  -= 1
    while two_cnt:
        curr.data = 2; curr = curr.next; two_cnt  -= 1

    return head


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
    print_ll(segregate(build_ll([1, 2, 2, 1, 2, 0, 2, 2])))  # 0 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 2
    print_ll(segregate(build_ll([0, 1, 2, 0, 1, 2])))         # 0 -> 0 -> 1 -> 1 -> 2 -> 2

