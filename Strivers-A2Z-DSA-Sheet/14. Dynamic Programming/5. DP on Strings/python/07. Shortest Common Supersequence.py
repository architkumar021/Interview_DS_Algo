"""07. SCS. LCS table + backtrack. Example: "abac","cab" → "cabac" """

def shortest_common_supersequence(s1, s2):
    n, m = len(s1), len(s2)
    dp = [[0]*(m+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for j in range(1, m+1):
            if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    i, j, scs = n, m, ""
    while i > 0 and j > 0:
        if s1[i-1] == s2[j-1]: scs = s1[i-1] + scs; i -= 1; j -= 1
        elif dp[i-1][j] > dp[i][j-1]: scs = s1[i-1] + scs; i -= 1
        else: scs = s2[j-1] + scs; j -= 1
    while i > 0: scs = s1[i-1] + scs; i -= 1
    while j > 0: scs = s2[j-1] + scs; j -= 1
    return scs

if __name__ == "__main__":
    print(shortest_common_supersequence("abac", "cab"))  # "cabac"

