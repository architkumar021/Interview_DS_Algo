"""
  QUESTION: 0/1 Knapsack (GFG)
  N items, wt[], val[], capacity W. Each item at most once. Max value.
  Example: wt=[4,5,1], val=[1,2,3], W=4 → 3
"""
import sys; sys.setrecursionlimit(10000)

def knapsack_memo(wt, val, W):
    n = len(wt)
    dp = [[-1]*(W+1) for _ in range(n)]
    def solve(i, w):
        if i == 0: return val[0] if w >= wt[0] else 0
        if dp[i][w] != -1: return dp[i][w]
        take = val[i] + solve(i-1, w-wt[i]) if w >= wt[i] else float('-inf')
        dp[i][w] = max(take, solve(i-1, w))
        return dp[i][w]
    return solve(n-1, W)

def knapsack(wt, val, W):
    n = len(wt)
    prev = [0]*(W+1)
    for w in range(wt[0], W+1): prev[w] = val[0]
    for i in range(1, n):
        curr = [0]*(W+1)
        for w in range(W+1):
            take = val[i] + prev[w-wt[i]] if w >= wt[i] else float('-inf')
            curr[w] = max(take, prev[w])
        prev = curr
    return prev[W]

if __name__ == "__main__":
    print(knapsack_memo([4,5,1], [1,2,3], 4))  # 3
    print(knapsack([4,5,1], [1,2,3], 4))        # 3

