"""
  QUESTION: Partition with Given Difference (GFG)
  Count partitions S1-S2 = D. Target = (totalSum+D)/2.
  Example: arr=[5,2,6,4], d=3 → 1
"""
MOD = 10**9 + 7

def count_partitions(arr, d):
    total = sum(arr)
    if (total + d) % 2 != 0 or total + d < 0: return 0
    target = (total + d) // 2
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
    print(count_partitions([5,2,6,4], 3))  # 1

