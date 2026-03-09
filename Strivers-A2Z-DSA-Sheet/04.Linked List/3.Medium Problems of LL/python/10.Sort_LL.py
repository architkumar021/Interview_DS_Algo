"""
QUESTION:
Given the head of a linked list, return the list sorted in ascending order.

Example:  Input: [4,2,1,3]  Output: [1,2,3,4]

APPROACH: Merge Sort on Linked List
1. Base case: 0 or 1 node → already sorted, return head.
2. Find middle using slow/fast pointers.
3. Split into two halves (break link at middle).
4. Recursively sort each half.
5. Merge the two sorted halves.

WHY merge sort? Unlike arrays, LL doesn't support random access.
Merge sort is optimal for LL: O(N log N) time, O(log N) stack space.

TIME COMPLEXITY:  O(N log N)
SPACE COMPLEXITY: O(log N)  — recursive call stack
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def merge(left, right):
    """Merge two sorted linked lists."""
    if not left:  return right
    if not right: return left

    if left.val <= right.val:
        left.next = merge(left.next, right)
        return left
    else:
        right.next = merge(left, right.next)
        return right


def sort_list(head):
    if not head or not head.next:
        return head  # base case

    # Find middle: fast starts one step ahead so slow lands before mid
    slow = head
    fast = head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    right_half = slow.next
    slow.next = None  # split the list

    left  = sort_list(head)        # sort left half
    right = sort_list(right_half)  # sort right half

    return merge(left, right)      # merge sorted halves


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
    print_ll(sort_list(build_ll([4, 2, 1, 3])))      # 1 -> 2 -> 3 -> 4
    print_ll(sort_list(build_ll([-1, 5, 3, 4, 0])))  # -1 -> 0 -> 3 -> 4 -> 5

