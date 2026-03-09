"""
QUESTION:
Given the head of a singly linked list, return True if it is a palindrome, False otherwise.

Example 1:  Input: [1,2,2,1]  Output: True
Example 2:  Input: [1,2]      Output: False

APPROACH: Find Middle → Reverse Second Half → Compare
1. Find middle using slow/fast pointers.
2. Reverse the second half starting from slow.
3. Compare first half (head) with reversed second half node by node.
4. If all values match → palindrome.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def reverse_ll(start):
    prev = None
    curr = start
    while curr:
        frwd = curr.next
        curr.next = prev
        prev = curr
        curr = frwd
    return prev


def is_palindrome(head):
    slow = head
    fast = head

    # Step 1: find middle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Step 2: reverse second half
    reversed_half = reverse_ll(slow)

    # Step 3: compare both halves
    left = head
    right = reversed_half
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next

    return True


# Helpers
def build_ll(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = ListNode(arr[i]); curr = curr.next
    return head


# Driver
if __name__ == "__main__":
    print(is_palindrome(build_ll([1, 2, 2, 1])))    # True
    print(is_palindrome(build_ll([1, 2])))            # False
    print(is_palindrome(build_ll([1, 2, 3, 2, 1])))  # True

