"""
  QUESTION: 1143. Longest Common Subsequence (LeetCode)
  Example: "abcde", "ace" → 3 ("ace")
"""

def lcs(s, r):
    n, m = len(s), len(r)
    prev = [0]*(m+1)
    for i in range(1, n+1):
        curr = [0]*(m+1)
        for j in range(1, m+1):
            if s[i-1] == r[j-1]: curr[j] = prev[j-1] + 1
            else: curr[j] = max(prev[j], curr[j-1])
        prev = curr
    return prev[m]

if __name__ == "__main__":
    print(lcs("abcde", "ace"))  # 3

