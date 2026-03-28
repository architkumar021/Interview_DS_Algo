/*
=============================================================================
  QUESTION: 300. Longest Increasing Subsequence (LeetCode)
=============================================================================

  Given array nums[], return length of LONGEST STRICTLY INCREASING
  subsequence. Subsequence = elements in order, not necessarily contiguous.

  Example: [10, 9, 2, 5, 3, 7, 101, 18] → 4
  LIS: [2, 3, 7, 101] or [2, 5, 7, 101] or [2, 3, 7, 18]

  Example: [0, 1, 0, 3, 2, 3] → 4 (LIS: [0, 1, 2, 3])

=============================================================================
  APPROACH 1: DP — O(N²) Time, O(N) Space
=============================================================================

  dp[i] = length of LIS ENDING at index i.
  For each i, check all j < i: if nums[j] < nums[i], we can extend LIS
  ending at j by including nums[i].

  dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
  Base: dp[i] = 1 (element itself is LIS of length 1)
  Answer: max(dp[i]) for all i

  Dry Run: [10, 9, 2, 5, 3, 7, 101, 18]

  i=0 (10): dp = [1, -, -, -, -, -, -, -]
  i=1 (9):  no j where nums[j]<9 → dp = [1, 1, -, -, -, -, -, -]
  i=2 (2):  no j where nums[j]<2 → dp = [1, 1, 1, -, -, -, -, -]
  i=3 (5):  j=2 (2<5) → dp[3]=dp[2]+1=2 → dp = [1, 1, 1, 2, -, -, -, -]
  i=4 (3):  j=2 (2<3) → dp[4]=dp[2]+1=2 → dp = [1, 1, 1, 2, 2, -, -, -]
  i=5 (7):  j=2(2<7)→2, j=3(5<7)→3, j=4(3<7)→3 → dp[5]=3
            dp = [1, 1, 1, 2, 2, 3, -, -]
  i=6 (101): best=dp[5]+1=4 → dp = [1, 1, 1, 2, 2, 3, 4, -]
  i=7 (18):  j=5(7<18)→dp[5]+1=4 → dp = [1, 1, 1, 2, 2, 3, 4, 4]
  
  Answer: max(dp) = 4 ✓

=============================================================================
*/

function lengthOfLIS(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(1);  // each element is LIS of length 1

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            // Can we extend LIS ending at prev by appending nums[i]?
            if (nums[prev] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[prev] + 1);
            }
        }
    }
    return Math.max(...dp);
}

/*
=============================================================================
  APPROACH 2: Binary Search — O(N log N) Time, O(N) Space
=============================================================================

  Maintain a "tails" array where tails[i] = smallest tail element
  for all increasing subsequences of length i+1.

  For each num:
    - If num > last element of tails → extend (push)
    - Else → binary search for first element >= num, replace it

  The length of tails = length of LIS.

  Dry Run: [10, 9, 2, 5, 3, 7, 101, 18]
    num=10:  tails = [10]
    num=9:   9<10 → replace at pos 0 → tails = [9]
    num=2:   2<9  → replace at pos 0 → tails = [2]
    num=5:   5>2  → extend → tails = [2, 5]
    num=3:   3>2, 3<5 → replace at pos 1 → tails = [2, 3]
    num=7:   7>3  → extend → tails = [2, 3, 7]
    num=101: 101>7 → extend → tails = [2, 3, 7, 101]
    num=18:  18<101 → replace at pos 3 → tails = [2, 3, 7, 18]

  Length = 4 ✓

  Note: tails is NOT the actual LIS! It just tracks smallest endings.

=============================================================================
*/

function lengthOfLISBinarySearch(nums) {
    let tails = [];

    for (let num of nums) {
        let lo = 0, hi = tails.length;
        // Binary search: find first index where tails[idx] >= num
        while (lo < hi) {
            let mid = (lo + hi) >> 1;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = num;
    }
    return tails.length;
}

// ==========================================================================
// DRIVER CODE
// ==========================================================================
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));              // 4
console.log(lengthOfLISBinarySearch([10, 9, 2, 5, 3, 7, 101, 18]));   // 4
console.log(lengthOfLISBinarySearch([0, 1, 0, 3, 2, 3]));             // 4
