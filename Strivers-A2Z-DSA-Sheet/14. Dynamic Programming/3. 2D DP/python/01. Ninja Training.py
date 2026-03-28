"""
=============================================================================
  QUESTION: Ninja Training (GFG)
=============================================================================

  n days, 3 activities. Can't repeat same on consecutive days. Max points.
  Example: points=[[1,2,5],[3,1,1],[3,3,3]] → 11

=============================================================================
  APPROACH 1: Memoization — O(N×3) Time, O(N×3) Space
=============================================================================
"""
import sys
sys.setrecursionlimit(10000)


def ninja_training_memo(points):
    n = len(points)
    dp = [[-1] * 4 for _ in range(n)]

    def solve(day, prev):
        if day < 0: return 0
        if dp[day][prev] != -1: return dp[day][prev]
        ans = 0
        for i in range(3):
            if i != prev:
                ans = max(ans, points[day][i] + solve(day - 1, i))
        dp[day][prev] = ans
        return ans
    return solve(n - 1, 3)


"""
=============================================================================
  APPROACH 2: Space Optimized — O(N×3) Time, O(1) Space
=============================================================================
"""

def ninja_training(points):
    n = len(points)
    prev = points[0][:]
    for i in range(1, n):
        curr = [0, 0, 0]
        for j in range(3):
            for k in range(3):
                if j != k:
                    curr[j] = max(curr[j], points[i][j] + prev[k])
        prev = curr
    return max(prev)


if __name__ == "__main__":
    print(ninja_training_memo([[1,2,5],[3,1,1],[3,3,3]]))  # 11
    print(ninja_training([[1,2,5],[3,1,1],[3,3,3]]))        # 11

