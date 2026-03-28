"""
  QUESTION: 322. Coin Change (LeetCode)
  Min coins to make amount. Unlimited supply. Return -1 if impossible.
  Example: coins=[1,2,5], amount=11 → 3 (5+5+1)
  Key: When PICK → stay at same index (unlimited use).
"""
import sys; sys.setrecursionlimit(10000)

def coin_change_memo(coins, amount):
    n = len(coins)
    dp = [[-1]*(amount+1) for _ in range(n)]
    def solve(i, amt):
        if amt == 0: return 0
        if i == 0: return amt // coins[0] if amt % coins[0] == 0 else float('inf')
        if dp[i][amt] != -1: return dp[i][amt]
        take = 1 + solve(i, amt-coins[i]) if coins[i] <= amt else float('inf')
        dp[i][amt] = min(take, solve(i-1, amt))
        return dp[i][amt]
    ans = solve(n-1, amount)
    return -1 if ans >= float('inf') else ans

def coin_change(coins, amount):
    n = len(coins)
    prev = [float('inf')]*(amount+1)
    for a in range(amount+1):
        prev[a] = a // coins[0] if a % coins[0] == 0 else float('inf')
    for i in range(1, n):
        curr = [float('inf')]*(amount+1)
        curr[0] = 0
        for a in range(1, amount+1):
            take = 1 + curr[a-coins[i]] if coins[i] <= a else float('inf')
            curr[a] = min(take, prev[a])
        prev = curr
    return -1 if prev[amount] >= float('inf') else prev[amount]

if __name__ == "__main__":
    print(coin_change_memo([1,2,5], 11))  # 3
    print(coin_change([1,2,5], 11))        # 3
    print(coin_change([2], 3))              # -1

