"""
=============================================================================
  QUESTION: Sort a Stack using Recursion (GFG)
=============================================================================

  Sort stack so top has greatest element. No extra data structures.

  APPROACH: Like Insertion Sort using recursion
  1. place_at_correct_pos(ele, stack): Insert at correct sorted position
     - Empty or top < ele → push | Else → pop top, place ele, push top back
  2. sort_stack(stack): Pop top, sort rest, place popped at correct position

  DRY RUN [3,1,2]:
    sort([3,1,2]): pop 2 → sort([3,1]) → place(2)
      sort([3,1]): pop 1 → sort([3]) → place(1)
        sort([3]): pop 3 → sort([]) → place(3,[]) → [3]
      place(1,[3]): 3>1 → pop 3, place(1,[]) → [1], push 3 → [1,3]
    place(2,[1,3]): 3>2 → pop 3, place(2,[1]): 1<2 → push 2 → [1,2], push 3 → [1,2,3] ✓

  Time: O(N²), Space: O(N)
=============================================================================
"""


def place_at_correct_pos(ele, stack):
    if len(stack) == 0 or stack[-1] < ele:
        stack.append(ele)
        return

    first = stack.pop()
    place_at_correct_pos(ele, stack)
    stack.append(first)


def sort_stack(stack):
    if len(stack) == 0:
        return

    first = stack.pop()
    sort_stack(stack)
    place_at_correct_pos(first, stack)


# Driver Code
if __name__ == "__main__":
    stack = [11, 2, 32, 3, 41]
    print("Before:", stack)   # [11, 2, 32, 3, 41]
    sort_stack(stack)
    print("After:", stack)    # [41, 32, 11, 3, 2]
