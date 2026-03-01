"""
Question:
There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to distribute.

Example:
Input: ratings = [1,0,2]
Output: 5
Explanation: Allocate 2, 1, 2 candies to the first, second, and third child respectively.

Approach:
- Start by giving 1 candy to each child.
- Left-to-right pass: if ratings[i] > ratings[i-1], give child i one more candy than child i-1.
  This satisfies the left-neighbor constraint.
- Right-to-left pass: if ratings[i] > ratings[i+1], ensure child i has more than child i+1.
  Take max(current, num[i+1] + 1) to preserve the left-pass result.
- Sum all candies and return.

Complexity Analysis:
- Time Complexity: O(N) — two passes through the array.
- Space Complexity: O(N) — array to store candy counts.

Code:
"""

def candy(ratings: list[int]) -> int:
    n = len(ratings)
    if n == 1:
        return 1

    # Start with 1 candy for each child
    num = [1] * n

    # Left-to-right pass: satisfy left-neighbor constraint
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            num[i] = num[i - 1] + 1

    # Right-to-left pass: satisfy right-neighbor constraint
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            num[i] = max(num[i], num[i + 1] + 1)

    return sum(num)


# Example usage
if __name__ == "__main__":
    print(candy([1, 0, 2]))       # Output: 5
    print(candy([1, 2, 2]))       # Output: 4
    print(candy([1, 3, 4, 5, 2])) # Output: 11


# ============================================================
# OPTIMAL SOLUTION — O(N) Time | O(1) Space (Single Pass)
# ============================================================
"""
Approach:
Instead of using an extra array, we observe that the candy distribution
forms a series of "slopes" — ascending runs (up) and descending runs (down).

Key observations:
  - For every ascending run of length `up`, the candies needed are: 1+2+3+...+(up+1) = sum(up)
  - For every descending run of length `down`, the candies needed are: 1+2+3+...+(down+1) = sum(down)
  - The peak between an ascending and descending run is SHARED.
    The peak should take max(up, down) + 1 candies (not double-counted).
    We add max(up, down) instead of counting the peak in both runs.

Algorithm:
  - Start with 1 candy for the first child.
  - Walk through each adjacent pair of children:
    1. If ratings[i] > ratings[i-1]: ascending run — increment 'up', reset 'down' to 0.
       Peak = up + 1 candies; add that to total.
    2. If ratings[i] < ratings[i-1]: descending run — increment 'down', reset 'up' to 0.
       If down slope becomes as long as the peak value, bump the total by 1
       (peak needs one more candy to stay strictly above its right neighbor).
       Add 1 for the current child's position on the descending slope.
    3. If ratings[i] == ratings[i-1]: reset both runs — new independent segment.
       Add 1 for this child.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the ratings array.
- Space Complexity: O(1) — no extra array used.

Code:
"""

def candy_optimal(ratings: list[int]) -> int:
    n = len(ratings)
    if n == 1:
        return 1

    total = 1  # first child always gets 1 candy
    up = 0     # length of current ascending run
    down = 0   # length of current descending run
    peak = 0   # candy count at the top of last ascending run

    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            # Ascending: new peak
            up += 1
            down = 0
            peak = up + 1  # peak takes (up + 1) candies
            total += peak  # add peak candy to total

        elif ratings[i] < ratings[i - 1]:
            # Descending: extend the down slope
            down += 1
            up = 0

            # If down slope is as long as the peak candy value,
            # the peak needs one more candy to remain strictly greater
            if down >= peak:
                total += 1  # bump the shared peak upward

            total += 1  # current child on descending slope gets 1 candy

        else:
            # Equal ratings: reset both runs
            up = 0
            down = 0
            peak = 0
            total += 1  # this child independently gets 1 candy

    return total


# Example usage
if __name__ == "__main__":
    print(candy_optimal([1, 0, 2]))       # Output: 5
    print(candy_optimal([1, 2, 2]))       # Output: 4
    print(candy_optimal([1, 3, 4, 5, 2])) # Output: 11


