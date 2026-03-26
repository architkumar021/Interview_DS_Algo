"""
=============================================================================
  QUESTION: 1922. Count Good Numbers (LeetCode)
=============================================================================

  Digits at EVEN indices must be even {0,2,4,6,8} → 5 choices
  Digits at ODD indices must be prime {2,3,5,7}   → 4 choices
  Return total good digit strings of length n (mod 10^9+7).

  Example: n=1 → 5, n=4 → 400 (5×4×5×4)

  DRY RUN n=4: f(4) = f(3)*4 = (f(2)*5)*4 = ((f(1)*4)*5)*4 = (5*4)*5*4 = 400

  Time: O(N), Space: O(N)
=============================================================================
"""

MOD = 10**9 + 7


def count_good_numbers(n):
    if n == 1:
        return 5
    if n % 2 == 0:
        return count_good_numbers(n - 1) % MOD * 4 % MOD
    else:
        return count_good_numbers(n - 1) % MOD * 5 % MOD


if __name__ == "__main__":
    print(count_good_numbers(1))   # 5
    print(count_good_numbers(4))   # 400
    print(count_good_numbers(50))  # 564908303
