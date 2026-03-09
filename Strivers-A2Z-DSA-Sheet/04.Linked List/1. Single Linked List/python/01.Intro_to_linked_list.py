"""
QUESTION:
Construct a linked list from an array and return the head of the linked list.

Example 1:
  Input:  arr = [1, 2, 3, 4, 5]
  Output: 1 -> 2 -> 3 -> 4 -> 5

Example 2:
  Input:  arr = [2, 4]
  Output: 2 -> 4

APPROACH:
1. Create the head node from the first element of the array.
2. Use a `curr` pointer starting at head.
3. For each remaining element, create a new node and attach it via curr.next.
4. Advance curr to the new node.
5. Return head.

Time Complexity:  O(N)
Space Complexity: O(N)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def construct_ll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = Node(arr[i])
        curr = curr.next
    return head


# Helper: print linked list
def print_ll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data))
        curr = curr.next
    print(" -> ".join(result))


# Driver code
if __name__ == "__main__":
    head = construct_ll([1, 2, 3, 4, 5])
    print_ll(head)  # 1 -> 2 -> 3 -> 4 -> 5

    head2 = construct_ll([2, 4])
    print_ll(head2)  # 2 -> 4

