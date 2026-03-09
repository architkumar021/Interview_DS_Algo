"""
QUESTION:
Given the head of a linked list, reverse the nodes k at a time and return the modified list.
If the remaining nodes are less than k, leave them as-is.

Example 1:  Input: [1,2,3,4,5], k=2  Output: [2,1,4,3,5]
Example 2:  Input: [1,2,3,4,5], k=3  Output: [3,2,1,4,5]

APPROACH: Recursion
1. Check if at least k nodes remain — if not, return head unchanged.
2. Reverse exactly k nodes iteratively (prev/curr/frwd).
   - After loop: prev = new head of reversed group, head = tail of reversed group.
3. Recursively process the rest from frwd (k+1th node).
4. Connect tail of current reversed group → result of recursive call.
5. Return prev (new head of reversed group).

TIME COMPLEXITY:  O(N) — every node visited once
SPACE COMPLEXITY: O(N/k) — recursion depth = number of groups
"""


class ListNode:
    def __init__(self, val):
        self.val  = val
        self.next = None


def reverse_k_group(head, k):
    # Check if at least k nodes remain
    ptr = head
    for _ in range(k):
        if not ptr:
            return head  # fewer than k nodes → return as-is
        ptr = ptr.next

    # Reverse k nodes
    prev  = None
    curr  = head
    frwd  = None
    count = k

    while count and curr:
        frwd      = curr.next
        curr.next = prev
        prev      = curr
        curr      = frwd
        count    -= 1

    # head is now the tail of the reversed group
    # Recursively reverse the rest and connect
    if frwd:
        head.next = reverse_k_group(frwd, k)

    return prev  # prev is the new head of this reversed group


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
    print_ll(reverse_k_group(build_ll([1,2,3,4,5]), 2))  # 2 -> 1 -> 4 -> 3 -> 5
    print_ll(reverse_k_group(build_ll([1,2,3,4,5]), 3))  # 3 -> 2 -> 1 -> 4 -> 5
    print_ll(reverse_k_group(build_ll([1,2,3,4,5]), 1))  # 1 -> 2 -> 3 -> 4 -> 5

