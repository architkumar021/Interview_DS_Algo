"""02. Count Square Submatrices. Sum all dp[i][j] values."""
def count_squares(matrix):
    m, n = len(matrix), len(matrix[0])
    dp = [[0]*(n+1) for _ in range(m+1)]
    ans = 0
    for i in range(1, m+1):
        for j in range(1, n+1):
            if matrix[i-1][j-1] == 1:
                dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1
                ans += dp[i][j]
    return ans
if __name__ == "__main__":
    print(count_squares([[0,1,1,1],[1,1,1,1],[0,1,1,1]]))  # 15

