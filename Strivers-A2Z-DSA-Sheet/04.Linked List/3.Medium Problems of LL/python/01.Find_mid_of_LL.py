"""
QUESTION:
Given the head of a singly linked list, return the middle node.
If there are two middle nodes, return the second middle node.

Example 1:  Input: [1,2,3,4,5]    Output: node(3)
Example 2:  Input: [1,2,3,4,5,6]  Output: node(4)

APPROACH: Slow & Fast Pointer (Floyd's tortoise)
- slow moves 1 step, fast moves 2 steps.
- When fast reaches the end, slow is at the middle.
- For even-length lists, slow lands on the 2nd middle.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def middle_node(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow  # slow is at the middle


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
    print_ll(middle_node(build_ll([1,2,3,4,5])))    # 3 -> 4 -> 5
    print_ll(middle_node(build_ll([1,2,3,4,5,6])))  # 4 -> 5 -> 6

