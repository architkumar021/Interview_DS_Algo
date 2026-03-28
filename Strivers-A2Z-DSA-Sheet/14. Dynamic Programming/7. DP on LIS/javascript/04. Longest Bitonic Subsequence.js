/*
=============================================================================
  QUESTION: Longest Bitonic Subsequence (GFG)
=============================================================================

  Bitonic = first strictly increases, then strictly decreases.
  Find length of longest such subsequence.

  Example: [1, 2, 5, 3, 2] → 5 (entire array: 1→2→5→3→2)
  Example: [1, 11, 2, 10, 4, 5, 2, 1] → 6 (1→2→10→4→2→1)

=============================================================================
  KEY INSIGHT
=============================================================================

  At each index i, the bitonic subsequence PEAKS at i.
  - left[i] = LIS ending at i (increasing from left)
  - right[i] = LIS starting at i (decreasing to right = LIS from right)
  - Bitonic length at i = left[i] + right[i] - 1 (don't count peak twice)
  
  Answer = max(left[i] + right[i] - 1) for all i

  Dry Run: [1, 2, 5, 3, 2]
    left  = [1, 2, 3, 2, 1]  (LIS from left)
    right = [1, 1, 3, 2, 1]  (LIS from right = LDS from left)
    
    i=0: 1+1-1=1, i=1: 2+1-1=2, i=2: 3+3-1=5, i=3: 2+2-1=3, i=4: 1+1-1=1
    Answer: 5 ✓ (peaks at index 2, value 5)

=============================================================================
  APPROACH: Two-Pass LIS — O(N²) Time, O(N) Space
=============================================================================
*/

function longestBitonic(nums) {
    let n = nums.length;
    let left = new Array(n).fill(1);   // LIS ending at i
    let right = new Array(n).fill(1);  // LIS starting at i (reverse)

    // Left pass: LIS from left to right
    for (let i = 0; i < n; i++)
        for (let j = 0; j < i; j++)
            if (nums[j] < nums[i]) left[i] = Math.max(left[i], left[j] + 1);

    // Right pass: LIS from right to left (= longest decreasing from i)
    for (let i = n - 1; i >= 0; i--)
        for (let j = i + 1; j < n; j++)
            if (nums[j] < nums[i]) right[i] = Math.max(right[i], right[j] + 1);

    // Combine: peak at each i
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans = Math.max(ans, left[i] + right[i] - 1);
    }
    return ans;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(longestBitonic([1, 2, 5, 3, 2]));           // 5
console.log(longestBitonic([1, 11, 2, 10, 4, 5, 2, 1])); // 6
