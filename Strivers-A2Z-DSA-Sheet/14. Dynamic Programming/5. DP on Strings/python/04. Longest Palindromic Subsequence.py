"""04. LPS. Trick: LPS(s) = LCS(s, reverse(s)). Example: "bbbab" → 4"""

def longest_palindrome_subseq(s):
    r = s[::-1]; n = len(s)
    prev = [0]*(n+1)
    for i in range(1, n+1):
        curr = [0]*(n+1)
        for j in range(1, n+1):
            if s[i-1] == r[j-1]: curr[j] = prev[j-1] + 1
            else: curr[j] = max(prev[j], curr[j-1])
        prev = curr
    return prev[n]

if __name__ == "__main__":
    print(longest_palindrome_subseq("bbbab"))  # 4

