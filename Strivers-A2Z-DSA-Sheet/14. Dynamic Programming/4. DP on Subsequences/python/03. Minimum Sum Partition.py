"""
  QUESTION: Minimum Sum Partition (GFG)
  Divide array into S1, S2. Minimize |S1 - S2|.
  Example: [1,6,11,5] → 1
"""

def min_difference(arr):
    n, total = len(arr), sum(arr)
    prev = [False]*(total+1)
    prev[0] = True
    if arr[0] <= total: prev[arr[0]] = True
    for i in range(1, n):
        curr = [False]*(total+1)
        curr[0] = True
        for s in range(1, total+1):
            take = prev[s-arr[i]] if arr[i] <= s else False
            curr[s] = take or prev[s]
        prev = curr
    ans = float('inf')
    for s in range(total+1):
        if prev[s]: ans = min(ans, abs(s - (total - s)))
    return ans

if __name__ == "__main__":
    print(min_difference([1,6,11,5]))  # 1

