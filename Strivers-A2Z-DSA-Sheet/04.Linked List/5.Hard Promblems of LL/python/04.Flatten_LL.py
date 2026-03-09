"""
QUESTION:
Given a linked list where every node has two pointers:
  - next   → points to the next node at the same level
  - bottom → points to a sub-linked-list (sorted) below it
All sub-linked-lists are sorted. Flatten the entire structure into a single
sorted list using the bottom pointer.

Example:
  Input:
    5 -> 10 -> 19 -> 28
    |     |     |     |
    7    20    22    35
    |          |     |
    8         50    40
    |               |
   30              45

  Output (via bottom): 5->7->8->10->19->20->22->28->30->35->40->45->50

APPROACH: Recursion + Merge (right to left)
1. Recursively flatten the rest of the list (root.next).
2. Merge the current column (root) with the flattened right result.
3. Merge is done bottom-pointer-based (like merge of two sorted lists).
4. Disconnect root.next = None after merging to keep clean structure.

WHY right-to-left? When we flatten from right, each merge produces
a single sorted bottom-chain that we can directly merge with the left.

TIME COMPLEXITY:  O(N * M) where N = nodes in main chain, M = avg bottom depth
SPACE COMPLEXITY: O(N) — recursion stack depth = length of main chain
"""


class Node:
    def __init__(self, data):
        self.data   = data
        self.next   = None
        self.bottom = None


def merge_sorted(head1, head2):
    """Merge two sorted bottom-linked lists."""
    if not head1: return head2
    if not head2: return head1

    if head1.data <= head2.data:
        head1.bottom = merge_sorted(head1.bottom, head2)
        return head1
    else:
        head2.bottom = merge_sorted(head1, head2.bottom)
        return head2


def flatten(root):
    if not root:
        return root

    # Recursively flatten the right part first
    right      = flatten(root.next)
    root.next  = None  # disconnect horizontal link

    # Merge current column with flattened right
    return merge_sorted(root, right)


# Helpers
def build_flat_ll(structure):
    """structure = [[col1vals], [col2vals], ...], next-linked across cols."""
    col_heads = []
    for col in structure:
        col_head = Node(col[0])
        curr = col_head
        for i in range(1, len(col)):
            curr.bottom = Node(col[i]); curr = curr.bottom
        col_heads.append(col_head)
    for i in range(len(col_heads) - 1):
        col_heads[i].next = col_heads[i + 1]
    return col_heads[0]

def print_flat_ll(head):
    result = []
    curr = head
    while curr:
        result.append(str(curr.data)); curr = curr.bottom
    print(" -> ".join(result))


# Driver
if __name__ == "__main__":
    head = build_flat_ll([
        [5, 7, 8, 30],
        [10, 20],
        [19, 22, 50],
        [28, 35, 40, 45]
    ])
    print_flat_ll(flatten(head))
    # 5 -> 7 -> 8 -> 10 -> 19 -> 20 -> 22 -> 28 -> 30 -> 35 -> 40 -> 45 -> 50

