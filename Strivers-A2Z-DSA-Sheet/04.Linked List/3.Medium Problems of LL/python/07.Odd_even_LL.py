"""
QUESTION:
Given the head of a singly linked list, group all nodes with odd indices together
followed by nodes with even indices, and return the reordered list.
(Indices are 1-based: first node = odd, second = even, ...)

Example 1:  Input: [1,2,3,4,5]      Output: [1,3,5,2,4]
Example 2:  Input: [2,1,3,5,6,4,7]  Output: [2,3,6,7,1,5,4]

APPROACH:
- Maintain two separate chains: odd-indexed and even-indexed nodes.
- odd pointer weaves through nodes 1,3,5,... | even through 2,4,6,...
- Save even_head before modifying links.
- At the end, join: odd.next = even_head.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def odd_even_list(head):
    if not head or not head.next:
        return head

    odd = head
    even = head.next
    even_head = even  # save start of even list

    while odd.next and even:
        odd.next = even.next           # odd chain skips even node
        if odd.next:
            even.next = odd.next.next  # even chain skips odd node
            odd = odd.next             # advance odd pointer
        even = even.next               # advance even pointer

    odd.next = even_head  # join odd tail to even head
    return head


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
    print_ll(odd_even_list(build_ll([1, 2, 3, 4, 5])))       # 1 -> 3 -> 5 -> 2 -> 4
    print_ll(odd_even_list(build_ll([2, 1, 3, 5, 6, 4, 7]))) # 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4

