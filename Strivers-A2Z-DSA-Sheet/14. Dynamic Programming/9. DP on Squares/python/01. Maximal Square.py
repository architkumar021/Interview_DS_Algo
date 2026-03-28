"""01. Maximal Square. dp[i][j] = min(top, diag, left) + 1. Return area."""
def maximal_square(matrix):
    m, n = len(matrix), len(matrix[0])
    dp = [[0]*(n+1) for _ in range(m+1)]
    mx = 0
    for i in range(1, m+1):
        for j in range(1, n+1):
            if matrix[i-1][j-1] == '1':
                dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1
                mx = max(mx, dp[i][j])
    return mx * mx
if __name__ == "__main__":
    print(maximal_square([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]))  # 4

