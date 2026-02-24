"""
QUESTION:
Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

Example:
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3.
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.

APPROACH:
1. Sort the greed factor array g and the cookie size array s in ascending order.
2. Initialize a counter variable child to track the number of content children.
3. Iterate over the cookie size array s and check if the current cookie size is greater than or equal to the greed factor of the current child.
4. If it is, increment the child counter and move to the next child.
5. Finally, return the total number of content children.

COMPLEXITY ANALYSIS:
- Time Complexity: O(n log n) - Sorting the arrays takes O(n log n) time.
- Space Complexity: O(1) - Only using constant extra space (excluding sorting).
"""

from typing import List


def find_content_children(g: List[int], s: List[int]) -> int:
    """
    Find the maximum number of content children.

    Args:
        g: List of greed factors for each child
        s: List of cookie sizes

    Returns:
        Maximum number of content children
    """
    # Sort both arrays in ascending order
    g.sort()
    s.sort()

    child = 0
    cookie = 0

    # Two pointer approach
    while cookie < len(s) and child < len(g):
        # If cookie satisfies child's greed
        if s[cookie] >= g[child]:
            child += 1
        cookie += 1

    return child


# Alternative implementation using for loop
def find_content_children_v2(g: List[int], s: List[int]) -> int:
    """Alternative implementation using for loop."""
    g.sort()
    s.sort()

    child = 0
    for cookie_size in s:
        if child < len(g) and cookie_size >= g[child]:
            child += 1

    return child


# Example usage:
# print(find_content_children([1, 2, 3], [1, 1]))  # Output: 1
# print(find_content_children([1, 2], [1, 2, 3]))  # Output: 2

