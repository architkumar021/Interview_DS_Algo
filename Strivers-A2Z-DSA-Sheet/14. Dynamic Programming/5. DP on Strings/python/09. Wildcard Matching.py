"""09. Wildcard Matching. ?=any single, *=any sequence. Example: "adceb","*a*b" → True"""
import sys; sys.setrecursionlimit(10000)

def is_match(s, p):
    n, m = len(s), len(p)
    dp = [[-1]*(m+1) for _ in range(n+1)]
    def all_stars(j): return all(p[k] == '*' for k in range(j+1))
    def solve(i, j):
        if i < 0 and j < 0: return True
        if j < 0: return False
        if i < 0: return all_stars(j)
        if dp[i][j] != -1: return dp[i][j]
        if s[i] == p[j] or p[j] == '?': dp[i][j] = solve(i-1, j-1)
        elif p[j] == '*': dp[i][j] = solve(i-1, j) or solve(i, j-1)
        else: dp[i][j] = False
        return dp[i][j]
    return solve(n-1, m-1)

if __name__ == "__main__":
    print(is_match("adceb", "*a*b"))  # True
    print(is_match("cb", "?a"))        # False

