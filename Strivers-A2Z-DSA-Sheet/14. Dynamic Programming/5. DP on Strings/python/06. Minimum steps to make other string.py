"""06. Min deletions = (n+m) - 2*LCS. Example: "sea","eat" → 2"""

def min_distance(word1, word2):
    n, m = len(word1), len(word2)
    prev = [0]*(m+1)
    for i in range(1, n+1):
        curr = [0]*(m+1)
        for j in range(1, m+1):
            if word1[i-1] == word2[j-1]: curr[j] = prev[j-1] + 1
            else: curr[j] = max(prev[j], curr[j-1])
        prev = curr
    return (n + m) - 2 * prev[m]

if __name__ == "__main__":
    print(min_distance("sea", "eat"))  # 2

