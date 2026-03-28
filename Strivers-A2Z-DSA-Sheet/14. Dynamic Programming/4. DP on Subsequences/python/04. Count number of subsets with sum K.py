"""
  QUESTION: Count Subsets with Sum K (GFG)
  Example: arr=[2,3,5,6,8,10], sum=10 → 3
"""
MOD = 10**9 + 7

def count_subsets(arr, target):
    n = len(arr)
    prev = [0]*(target+1)
    if arr[0] == 0: prev[0] = 2
    else:
        prev[0] = 1
        if arr[0] <= target: prev[arr[0]] = 1
    for i in range(1, n):
        curr = [0]*(target+1)
        for s in range(target+1):
            take = prev[s-arr[i]] if arr[i] <= s else 0
            curr[s] = (take + prev[s]) % MOD
        prev = curr
    return prev[target]

if __name__ == "__main__":
    print(count_subsets([2,3,5,6,8,10], 10))  # 3

