"""
  QUESTION: Unbounded Knapsack (GFG)
  Same as 0/1 but unlimited picks. Max value within weight W.
  Example: wt=[2,1], val=[1,1], W=3 → 3
  Key: When PICK → stay at i. When SKIP → move to i-1.
"""

def unbounded_knapsack(wt, val, W):
    n = len(wt)
    prev = [0]*(W+1)
    for w in range(W+1): prev[w] = (w // wt[0]) * val[0] if w >= wt[0] else 0
    for i in range(1, n):
        curr = [0]*(W+1)
        for w in range(W+1):
            take = val[i] + curr[w-wt[i]] if w >= wt[i] else float('-inf')
            curr[w] = max(take, prev[w])
        prev = curr
    return prev[W]

if __name__ == "__main__":
    print(unbounded_knapsack([2,1], [1,1], 3))  # 3

