"""01. Buy/Sell Stock I. One txn. Track min, max profit. [7,1,5,3,6,4] → 5"""
def max_profit(prices):
    mn, ans = prices[0], 0
    for p in prices[1:]: ans = max(ans, p - mn); mn = min(mn, p)
    return ans
if __name__ == "__main__": print(max_profit([7,1,5,3,6,4]))  # 5

