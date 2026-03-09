"""
QUESTION:
Given a linked list, check if it contains a loop. If yes, return the count
of nodes in the loop. If no loop, return 0.

Example:  25->14->19->33->10->21->39->90->58->45 with C=4  Output: 7

APPROACH: Floyd's Detection + Count
Step 1 — Detect loop using slow/fast pointers.
Step 2 — Once they meet, count nodes by keeping one pointer fixed
  and moving the other one full loop until they meet again.

TIME COMPLEXITY:  O(N)
SPACE COMPLEXITY: O(1)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def count_nodes_in_loop(head):
    slow = head
    fast = head

    # Step 1: detect meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            # Step 2: count nodes in the loop
            count = 1
            slow = slow.next
            while slow is not fast:
                slow = slow.next
                count += 1
            return count

    return 0  # no loop


# Helpers
def build_ll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = Node(arr[i]); curr = curr.next
    return head


# Driver
if __name__ == "__main__":
    # Build: 1->2->3->4->5, cycle: 5 -> 3 (loop of length 3)
    head = build_ll([1, 2, 3, 4, 5])
    n3 = head.next.next
    head.next.next.next.next.next = n3  # 5 -> 3
    print(count_nodes_in_loop(head))  # 3

