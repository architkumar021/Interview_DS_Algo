"""03. Longest Common Substring. Example: "ABCDGH","ACDGHR" → 4 ("CDGH")"""

def longest_common_substr(s1, s2):
    n, m = len(s1), len(s2)
    dp = [[0]*(m+1) for _ in range(n+1)]
    mx = 0
    for i in range(1, n+1):
        for j in range(1, m+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                mx = max(mx, dp[i][j])
            else: dp[i][j] = 0
    return mx

if __name__ == "__main__":
    print(longest_common_substr("ABCDGH", "ACDGHR"))  # 4

