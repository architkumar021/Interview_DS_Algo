/*
=============================================================================
  QUESTION: 1922. Count Good Numbers (LeetCode)
=============================================================================

  A digit string is good if:
  - Digits at EVEN indices (0, 2, 4...) are even: {0, 2, 4, 6, 8} → 5 choices
  - Digits at ODD indices (1, 3, 5...)  are prime: {2, 3, 5, 7}   → 4 choices
  
  Given integer n, return total good digit strings of length n. (mod 10^9+7)

  Example: n=1 → 5 ("0","2","4","6","8")
  Example: n=4 → 400 (5 × 4 × 5 × 4 = 400)
  Example: n=50 → 564908303

=============================================================================
  APPROACH: Recursive Multiplication
=============================================================================

  Key Insight:
  - Position 0 (even) → 5 choices
  - Position 1 (odd)  → 4 choices
  - Position 2 (even) → 5 choices
  - Position 3 (odd)  → 4 choices
  - ...and so on

  So for n=4: 5 × 4 × 5 × 4 = 400

  Recursive approach:
  - countGoodNumbers(n) = countGoodNumbers(n-1) × (choices for position n-1)
  - If (n-1) is even index → multiply by 5
  - If (n-1) is odd index  → multiply by 4
  - Base case: n=1 → return 5 (only position 0 which is even)

  DRY RUN with n=4:
  ──────────────────
  countGoodNumbers(4)
    Position 3 (odd) → multiply by 4
    = countGoodNumbers(3) * 4
      Position 2 (even) → multiply by 5
      = countGoodNumbers(2) * 5
        Position 1 (odd) → multiply by 4
        = countGoodNumbers(1) * 4
          Base case: return 5
        = 5 * 4 = 20
      = 20 * 5 = 100
    = 100 * 4 = 400 ✓

  NOTE: This O(N) recursive approach may TLE for very large n.
  Optimal approach uses modular exponentiation: 5^(ceil(n/2)) × 4^(floor(n/2))

  Time Complexity:  O(N)
  Space Complexity: O(N) — recursion stack

=============================================================================
*/

const MOD = 1e9 + 7;

function countGoodNumbers(n) {
    // Base case: length 1 → only position 0 (even) → 5 choices
    if (n === 1n || n === 1) return 5;

    n = BigInt(n);
    let prev = countGoodNumbers(n - 1n);

    // Position (n-1): if even index → 5 choices, odd index → 4 choices
    if ((n - 1n) % 2n === 0n) {
        return Number(BigInt(prev) * 5n % BigInt(MOD));   // Even index → 5
    } else {
        return Number(BigInt(prev) * 4n % BigInt(MOD));   // Odd index → 4
    }
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(countGoodNumbers(1));   // 5
console.log(countGoodNumbers(4));   // 400
console.log(countGoodNumbers(50));  // 564908303
