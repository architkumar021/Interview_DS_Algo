"""05. Min insertions to make palindrome = n - LPS(s). Example: "mbadm" → 2"""

def min_insertions(s):
    r = s[::-1]; n = len(s)
    prev = [0]*(n+1)
    for i in range(1, n+1):
        curr = [0]*(n+1)
        for j in range(1, n+1):
            if s[i-1] == r[j-1]: curr[j] = prev[j-1] + 1
            else: curr[j] = max(prev[j], curr[j-1])
        prev = curr
    return n - prev[n]

if __name__ == "__main__":
    print(min_insertions("mbadm"))  # 2

