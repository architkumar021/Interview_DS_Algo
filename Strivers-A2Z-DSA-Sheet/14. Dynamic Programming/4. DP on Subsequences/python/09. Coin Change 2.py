"""
  QUESTION: 518. Coin Change 2 (LeetCode)
  Count combinations to make amount. Unlimited supply.
  Example: coins=[1,2,5], amount=5 → 4
"""
import sys; sys.setrecursionlimit(10000)

def change_memo(coins, amount):
    n = len(coins)
    dp = [[-1]*(amount+1) for _ in range(n)]
    def solve(i, amt):
        if amt == 0: return 1
        if i == 0: return 1 if amt % coins[0] == 0 else 0
        if dp[i][amt] != -1: return dp[i][amt]
        take = solve(i, amt-coins[i]) if coins[i] <= amt else 0
        dp[i][amt] = take + solve(i-1, amt)
        return dp[i][amt]
    return solve(n-1, amount)

def change(coins, amount):
    n = len(coins)
    prev = [0]*(amount+1)
    for a in range(amount+1): prev[a] = 1 if a % coins[0] == 0 else 0
    for i in range(1, n):
        curr = [0]*(amount+1)
        for a in range(amount+1):
            take = curr[a-coins[i]] if coins[i] <= a else 0
            curr[a] = take + prev[a]
        prev = curr
    return prev[amount]

if __name__ == "__main__":
    print(change_memo([1,2,5], 5))  # 4
    print(change([1,2,5], 5))        # 4

