"""
QUESTION:
Construct a doubly linked list from an array and return the head.
Each node has three fields: data, prev (pointer to previous), next (pointer to next).

Example 1:
  Input:  arr = [1, 2, 3, 4, 5]
  Output: 1 <--> 2 <--> 3 <--> 4 <--> 5

Example 2:
  Input:  arr = [3, 4, 5]
  Output: 3 <--> 4 <--> 5

APPROACH:
1. Create head node from arr[0], set head.prev = None.
2. Use a curr pointer starting at head.
3. For each remaining element, create a new node:
   - new_node.prev = curr
   - curr.next = new_node
4. Advance curr to the new node.
5. Return head.

Time Complexity:  O(N)
Space Complexity: O(N)
"""


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


def construct_dll(arr):
    if not arr:
        return None
    head = Node(arr[0])
    curr = head
    for i in range(1, len(arr)):
        new_node = Node(arr[i])
        new_node.prev = curr    # link back
        curr.next = new_node    # link forward
        curr = new_node
    return head


# Helper: print DLL forward
def print_dll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data))
        curr = curr.next
    print(" <--> ".join(result))


# Driver code
if __name__ == "__main__":
    head = construct_dll([1, 2, 3, 4, 5])
    print_dll(head)  # 1 <--> 2 <--> 3 <--> 4 <--> 5

    head2 = construct_dll([3, 4, 5])
    print_dll(head2)  # 3 <--> 4 <--> 5

