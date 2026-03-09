"""
QUESTION:
Two non-empty linked lists represent two non-negative integers.
Digits are stored in REVERSE order (head = least significant digit).
Add the two numbers and return the sum as a linked list.

Example:
  Input:  l1 = [2,4,3] (342),  l2 = [5,6,4] (465)
  Output: [7,0,8]  (807)

APPROACH: Simultaneous traversal with carry
- Walk both lists together; at each step:
    total = l1.val + l2.val + carry
    new digit = total % 10
    carry = total // 10
- If one list is shorter, treat its remaining digits as 0.
- After both lists exhausted, append remaining carry if any.
- Use a dummy head node to simplify result list construction.

TIME COMPLEXITY:  O(max(N, M))
SPACE COMPLEXITY: O(max(N, M))  — result list length
"""


class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def add_two_numbers(l1, l2):
    dummy = ListNode(0)  # dummy head for easy construction
    ans   = dummy
    carry = 0

    while l1 or l2 or carry:
        total = carry

        if l1: total += l1.val; l1 = l1.next
        if l2: total += l2.val; l2 = l2.next

        ans.next = ListNode(total % 10)   # current digit
        carry    = total // 10            # carry for next position
        ans      = ans.next

    return dummy.next  # skip dummy head


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
    print_ll(add_two_numbers(build_ll([2,4,3]), build_ll([5,6,4])))          # 7 -> 0 -> 8
    print_ll(add_two_numbers(build_ll([9,9,9,9,9,9,9]), build_ll([9,9,9,9]))) # 8->9->9->9->0->0->0->1
    print_ll(add_two_numbers(build_ll([0]), build_ll([0])))                   # 0

