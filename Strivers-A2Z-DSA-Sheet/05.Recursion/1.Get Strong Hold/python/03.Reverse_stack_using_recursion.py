"""
=============================================================================
  QUESTION: Reverse a Stack using Recursion (GFG)
=============================================================================

  Reverse a given stack of N integers using recursion only.

  APPROACH: Two Recursive Functions
  1. insert_at_bottom(ele, stack): Insert element at bottom
     - Empty → push | Else → pop top, insert at bottom, push top back
  2. reverse_stack(stack): Pop top, reverse rest, insert popped at bottom

  DRY RUN [1,2,3] (1=bottom, 3=top):
    reverse([1,2,3]): pop 3 → reverse([1,2]) → insert_at_bottom(3)
      reverse([1,2]): pop 2 → reverse([1]) → insert_at_bottom(2)
        reverse([1]): pop 1 → reverse([]) → insert_at_bottom(1,[]) → [1]
      insert_at_bottom(2,[1]) → pop 1, insert 2, push 1 → [2,1]
    insert_at_bottom(3,[2,1]) → pop 1, pop 2, insert 3, push 2, push 1 → [3,2,1] ✓

  Time: O(N²), Space: O(N)
=============================================================================
"""


def insert_at_bottom(ele, stack):
    if len(stack) == 0:
        stack.append(ele)
        return

    temp = stack.pop()
    insert_at_bottom(ele, stack)
    stack.append(temp)


def reverse_stack(stack):
    if len(stack) == 0:
        return

    first = stack.pop()
    reverse_stack(stack)
    insert_at_bottom(first, stack)


# Driver Code
if __name__ == "__main__":
    stack = [1, 2, 3, 4, 5]
    print("Before:", stack)   # [1, 2, 3, 4, 5]
    reverse_stack(stack)
    print("After:", stack)    # [5, 4, 3, 2, 1]
