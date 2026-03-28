"""05. Palindrome Partitioning II. Min cuts for all palindromes."""
import sys; sys.setrecursionlimit(10000)
def min_cut(s):
    n = len(s); dp = [-1]*n
    def is_palin(i, j):
        while i < j:
            if s[i] != s[j]: return False
            i += 1; j -= 1
        return True
    def solve(i):
        if i == n: return 0
        if dp[i] != -1: return dp[i]
        ans = float('inf')
        for j in range(i, n):
            if is_palin(i, j): ans = min(ans, 1 + solve(j+1))
        dp[i] = ans; return ans
    return solve(0) - 1
if __name__ == "__main__": print(min_cut("aab"))  # 1

