"""
QUESTION:
Given the head of a linked list, rotate the list to the RIGHT by k places.

Example 1:  Input: [1,2,3,4,5], k=2  Output: [4,5,1,2,3]
Example 2:  Input: [0,1,2],     k=4  Output: [2,0,1]

APPROACH:
1. Find the length of the list; simultaneously reach the tail node.
2. Make the list circular: tail.next = head.
3. Effective rotations = k % length  (rotating by length = no change).
4. New tail is at position (length - k - 1) from original head.
5. New head = new_tail.next; break the circle: new_tail.next = None.

WHY circular? Avoids special-casing the wrap-around by naturally
connecting tail back to head, then just finding the split point.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val  = val
        self.next = None


def rotate_right(head, k):
    if not head or not head.next or k == 0:
        return head

    # Step 1: find length and reach tail
    tail = head
    length = 1
    while tail.next:
        tail = tail.next
        length += 1

    # Step 2: make circular
    tail.next = head

    # Step 3: effective rotations
    k = k % length
    if k == 0:
        tail.next = None  # break circle
        return head

    # Step 4: traverse to new tail (length - k - 1 steps from head)
    new_tail = head
    for _ in range(length - k - 1):
        new_tail = new_tail.next

    # Step 5: set new head and break circle
    new_head       = new_tail.next
    new_tail.next  = None

    return new_head


# Helpers
def build_ll(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = ListNode(arr[i]); curr = curr.next
    return head

def print_ll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.val)); curr = curr.next
    print(" -> ".join(result))


# Driver
if __name__ == "__main__":
    print_ll(rotate_right(build_ll([1,2,3,4,5]), 2))  # 4 -> 5 -> 1 -> 2 -> 3
    print_ll(rotate_right(build_ll([0,1,2]),     4))  # 2 -> 0 -> 1
    print_ll(rotate_right(build_ll([1,2,3]),     0))  # 1 -> 2 -> 3

