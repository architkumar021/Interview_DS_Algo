"""
QUESTION:
A linked list where each node has val, next pointer, and a random pointer
(which can point to any node or None). Construct a DEEP COPY of the list.

Example:
  Input:  [[7,None],[13,0],[11,4],[10,2],[1,0]]
  Output: [[7,None],[13,0],[11,4],[10,2],[1,0]]  (entirely new nodes)

APPROACH: Interleaving (O(1) extra space, 3 passes)
Pass 1 — Insert clones between originals:
  1 -> 1' -> 2 -> 2' -> 3 -> 3' -> ...
  (clone of each node inserted right after it)

Pass 2 — Set random pointers on clones:
  orig.next.random = orig.random.next
  (clone's random = clone of original's random)

Pass 3 — Separate the two lists:
  Restore original list, extract clone list.

WHY interleaving? No extra HashMap needed — position of clone
relative to original gives O(1) random pointer resolution.

TIME COMPLEXITY:  O(N) — three passes
SPACE COMPLEXITY: O(1) extra (output deep-copy itself is O(N))
"""


class Node:
    def __init__(self, val, next_node=None, random=None):
        self.val    = val
        self.next   = next_node
        self.random = random


def copy_random_list(head):
    if not head:
        return None

    # Pass 1: interleave clones
    orig = head
    while orig:
        clone        = Node(orig.val)
        clone.next   = orig.next    # clone points to orig's next
        orig.next    = clone        # orig points to clone
        orig         = clone.next   # advance to original next node

    # Pass 2: set random pointers on clones
    orig = head
    while orig:
        if orig.random:
            orig.next.random = orig.random.next  # clone's random = clone of orig's random
        orig = orig.next.next  # skip clone, move to next original

    # Pass 3: separate original and cloned lists
    orig       = head
    clone_head = head.next
    clone      = clone_head

    while orig:
        orig.next  = clone.next           # restore original's next
        orig       = orig.next            # advance original
        if orig:
            clone.next = orig.next        # clone points to next clone
        clone      = clone.next           # advance clone

    return clone_head


# Helpers — build list from [[val, random_idx], ...]
def build_random_list(arr):
    if not arr:
        return None
    nodes = [Node(val) for val, _ in arr]
    for i, (_, rand_idx) in enumerate(arr):
        nodes[i].next   = nodes[i + 1] if i + 1 < len(nodes) else None
        nodes[i].random = nodes[rand_idx] if rand_idx is not None else None
    return nodes[0]

def print_random_list(head):
    result = []
    curr = head
    while curr:
        rand_val = curr.random.val if curr.random else 'None'
        result.append(f"[{curr.val}, {rand_val}]")
        curr = curr.next
    print(" -> ".join(result))


# Driver
if __name__ == "__main__":
    original  = build_random_list([[7,None],[13,0],[11,4],[10,2],[1,0]])
    deep_copy = copy_random_list(original)
    print("Original:  ", end=""); print_random_list(original)
    print("Deep Copy: ", end=""); print_random_list(deep_copy)
    print("Are different objects?", original is not deep_copy)  # True

