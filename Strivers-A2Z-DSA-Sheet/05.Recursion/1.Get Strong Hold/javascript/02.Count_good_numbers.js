/*
=============================================================================
  QUESTION: 1922. Count Good Numbers (LeetCode)
=============================================================================

  A digit string of length n is "good" if:
  - Even indices (0, 2, 4...) have an even digit → 5 choices (0,2,4,6,8)
  - Odd indices  (1, 3, 5...) have a prime digit → 4 choices (2,3,5,7)

  Return total count of good strings of length n (mod 10^9 + 7).

  Examples:
    n = 1  → 5
    n = 4  → 5 × 4 × 5 × 4 = 400
    n = 50 → 564908303

=============================================================================
  APPROACH 1: Simple Recursion — O(N) Time, O(N) Space
=============================================================================

  Idea:
  - Build answer position by position from right to left.
  - At each position, multiply by 5 (even index) or 4 (odd index).
  - Base case: n = 0 → return 1 (empty product).

  Dry Run (n = 4):
    solve(4) → position 3 is odd  → 4 × solve(3)
    solve(3) → position 2 is even → 5 × solve(2)
    solve(2) → position 1 is odd  → 4 × solve(1)
    solve(1) → position 0 is even → 5 × solve(0)
    solve(0) → return 1
    Result: 4 × 5 × 4 × 5 × 1 = 400 ✓

  ⚠️ TLE for large n (e.g., n = 10^15). See Optimal below.

=============================================================================
*/

const MOD = 1000000007n;

// ── Approach 1: Simple Recursion ──
function countGoodNumbersRecursive(n) {
    n = BigInt(n);

    function solve(len) {
        if (len === 0n) return 1n;

        // Current position = len - 1
        let choices = (len - 1n) % 2n === 0n ? 5n : 4n;
        return choices * solve(len - 1n) % MOD;
    }

    return Number(solve(n));
}

/*
=============================================================================
  APPROACH 2: Optimal — Modular Exponentiation — O(log N) Time, O(log N) Space
=============================================================================

  Key Insight:
  - Even positions count = ceil(n / 2)  → each has 5 choices
  - Odd positions count  = floor(n / 2) → each has 4 choices
  - Answer = 5^ceil(n/2) × 4^floor(n/2)  (mod 10^9 + 7)

  We use fast power (binary exponentiation) to compute this in O(log N).

  Dry Run (n = 4):
    Even positions = ceil(4/2) = 2 → 5^2 = 25
    Odd positions  = floor(4/2) = 2 → 4^2 = 16
    Answer = 25 × 16 = 400 ✓

  Time Complexity:  O(log N)
  Space Complexity: O(log N) — recursion stack of power function

=============================================================================
*/

// Fast power: base^exp % MOD using recursion
function power(base, exp) {
    if (exp === 0n) return 1n;

    let half = power(base, exp / 2n);
    let result = half * half % MOD;

    if (exp % 2n === 1n) {
        result = result * base % MOD;
    }
    return result;
}

function countGoodNumbers(n) {
    n = BigInt(n);

    let evenCount = (n + 1n) / 2n;   // ceil(n / 2)
    let oddCount  = n / 2n;           // floor(n / 2)

    return Number(power(5n, evenCount) * power(4n, oddCount) % MOD);
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(countGoodNumbersRecursive(1));   // 5
console.log(countGoodNumbersRecursive(4));   // 400

console.log(countGoodNumbers(1));    // 5
console.log(countGoodNumbers(4));    // 400
console.log(countGoodNumbers(50));   // 564908303
