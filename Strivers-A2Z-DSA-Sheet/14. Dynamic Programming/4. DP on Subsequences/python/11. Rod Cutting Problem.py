"""
  QUESTION: Rod Cutting Problem (GFG)
  Rod of length N. price[i] = value of piece of length (i+1). Max profit.
  Same as Unbounded Knapsack — items are lengths 1..N.
  Example: price=[1,5,8,9,10,17,17,20], N=8 → 22
"""

def cut_rod(price, N):
    prev = [0]*(N+1)
    for w in range(N+1): prev[w] = w * price[0]
    for i in range(1, N):
        length = i + 1
        curr = [0]*(N+1)
        for w in range(N+1):
            take = price[i] + curr[w-length] if w >= length else float('-inf')
            curr[w] = max(take, prev[w])
        prev = curr
    return prev[N]

if __name__ == "__main__":
    print(cut_rod([1,5,8,9,10,17,17,20], 8))  # 22

