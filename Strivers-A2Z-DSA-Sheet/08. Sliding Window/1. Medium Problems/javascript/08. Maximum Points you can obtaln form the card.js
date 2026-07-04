/*
QUESTION:
You are given an array of cards, each with an associated number of points.
You can take exactly k cards, either from the beginning or from the end of the row.
Your goal is to maximize the sum of the points of the cards you have taken. Return the maximum score you can obtain.

APPROACH:
To maximize the score, we need to minimize the sum of the discarded cards.
We can find the minimum sum of a subarray of size (n - k) using a sliding window approach.

1. Create a helper function, minimumSumOfSizeK, which finds the minimum sum of a subarray of size k.
   - Initialize ans to Infinity, currsum to 0, and start to 0.
   - Iterate over the array from left to right:
     - Add the current element to currsum.
     - If the size of the current window (i - start + 1) exceeds k,
       remove the element at the start of the window from currsum and move the start to the next position.
     - If the size of the current window is k, update ans with the minimum of ans and currsum.
   - Return ans.

2. In the main function, maxScore:
   - Calculate the total sum of all the cards, totalSum.
   - Calculate the size of the discarded cards, windowSize, which is (n - k).
   - Find the minimum sum of a subarray of size windowSize using the minimumSumOfSizeK function and store it in discardedSum.
   - Return the maximum score, which is (totalSum - discardedSum).

COMPLEXITY ANALYSIS:
- Time complexity: O(n), where n is the size of the cardPoints array.
  We iterate over the array once to calculate the total sum and find the minimum sum of a subarray.
- Space complexity: O(1), as the extra space used is constant throughout the algorithm.
*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var minimumSumOfSizeK = function(arr, k) {
    let ans = Infinity, currsum = 0, start = 0;

    for (let i = 0; i < arr.length; i++) {
        currsum += arr[i];

        while ((i - start + 1) > k) {
            currsum -= arr[start];
            start++;
        }

        if ((i - start + 1) === k)
            ans = Math.min(ans, currsum);
    }

    return ans;
};

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    let totalSum = 0;

    for (const point of cardPoints) {
        totalSum += point;
    }

    const windowSize = cardPoints.length - k;
    const discardedSum = minimumSumOfSizeK(cardPoints, windowSize);

    return totalSum - discardedSum;
};


/*
===================================================================================
BRUTE FORCE APPROACH
===================================================================================

APPROACH EXPLANATION:
- We need to pick exactly k cards from either the beginning or the end of the array.
- The key observation is that we can pick i cards from the left (where 0 <= i <= k)
  and (k - i) cards from the right.
- We try all (k + 1) possible combinations.
- For each combination:
  - We sum the first i elements from the left using a loop.
  - We sum the last (k - i) elements from the right using another loop.
- We track the maximum sum across all combinations.
- This approach explicitly tries every valid way to pick k cards from both ends.

TIME COMPLEXITY: O(k^2) - Outer loop runs (k+1) times, inner loops together run O(k).
SPACE COMPLEXITY: O(1) - Only constant extra space used.
*/

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
function maxScoreBrute(cardPoints, k) {
    const n = cardPoints.length;
    let maxSum = 0;

    // Try all combinations: i cards from left, (k-i) cards from right
    for (let i = 0; i <= k; i++) {
        let currentSum = 0;

        // Sum of first i cards (from left)
        for (let j = 0; j < i; j++) {
            currentSum += cardPoints[j];
        }

        // Sum of last (k-i) cards (from right)
        for (let j = n - (k - i); j < n; j++) {
            currentSum += cardPoints[j];
        }

        // Update maximum sum
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/*
===================================================================================
OPTIMAL APPROACH (Two Pointer / Sliding Window)
===================================================================================

APPROACH EXPLANATION:
- Instead of recalculating sums for each combination, we use a sliding window technique.
- Key Insight: We will always pick exactly k cards - some from left, some from right.
- The idea is to start by taking all k cards from the left, then gradually shift
  by removing one card from the left and adding one from the right.

- Algorithm:
  1. First, calculate the sum of the first k cards (all from left). This is our
     initial left sum (lsum). Right sum (rsum) is 0.
  2. Initialize maxSum with lsum (case: all k cards from left).
  3. Now iterate k times to try all other combinations:
     - Use leftIndex starting at (k-1) and moving towards 0.
     - Use rightIndex starting at (n-1) and moving towards (n-k).
     - In each iteration:
       a. Remove cardPoints[leftIndex] from lsum (removing from left).
       b. Add cardPoints[rightIndex] to rsum (adding from right).
       c. Update maxSum = max(maxSum, lsum + rsum).
       d. Decrement both leftIndex and rightIndex.
  4. This efficiently covers all combinations without nested loops.

- Why this works:
  - Iteration 0: k cards from left, 0 from right
  - Iteration 1: (k-1) cards from left, 1 from right
  - Iteration 2: (k-2) cards from left, 2 from right
  - ...
  - Iteration k: 0 cards from left, k from right

TIME COMPLEXITY: O(k) - One loop to calculate initial sum, one loop to slide.
SPACE COMPLEXITY: O(1) - Only constant extra space used.
*/

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
function maxScoreOptimal(cardPoints, k) {
    const n = cardPoints.length;

    // Step 1: Calculate sum of first k cards (all from left)
    let lsum = 0;
    for (let i = 0; i < k; i++) {
        lsum += cardPoints[i];
    }

    // Initialize: all k cards from left, 0 from right
    let rsum = 0;
    let maxSum = lsum;

    // Step 2: Slide - remove one from left, add one from right
    // rightIndex points to the rightmost card we'll add
    let rightIndex = n - 1;

    // Iterate k times: each time remove one from left and add one from right
    for (let i = k - 1; i >= 0; i--) {
        // Remove the card at index i from left sum
        lsum -= cardPoints[i];

        // Add the card from right side
        rsum += cardPoints[rightIndex];

        // Move right pointer to next card from right
        rightIndex--;

        // Update maximum sum
        maxSum = Math.max(maxSum, lsum + rsum);
    }

    return maxSum;
}

/*
===================================================================================
EXAMPLE WALKTHROUGH:

For cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3:
n = 7

Step 1: Take all k=3 cards from left
lsum = 1 + 2 + 3 = 6
rsum = 0
maxSum = 6

Step 2: Slide (remove from left, add from right)

Iteration 1 (i = 2, rightIndex = 6):
- Remove cardPoints[2] = 3 from lsum → lsum = 6 - 3 = 3
- Add cardPoints[6] = 1 to rsum → rsum = 0 + 1 = 1
- rightIndex = 5
- Current selection: [1, 2] from left + [1] from right = 3 + 1 = 4
- maxSum = max(6, 4) = 6

Iteration 2 (i = 1, rightIndex = 5):
- Remove cardPoints[1] = 2 from lsum → lsum = 3 - 2 = 1
- Add cardPoints[5] = 6 to rsum → rsum = 1 + 6 = 7
- rightIndex = 4
- Current selection: [1] from left + [6, 1] from right = 1 + 7 = 8
- maxSum = max(6, 8) = 8

Iteration 3 (i = 0, rightIndex = 4):
- Remove cardPoints[0] = 1 from lsum → lsum = 1 - 1 = 0
- Add cardPoints[4] = 5 to rsum → rsum = 7 + 5 = 12
- rightIndex = 3
- Current selection: [] from left + [5, 6, 1] from right = 0 + 12 = 12
- maxSum = max(8, 12) = 12

Answer: 12 (picking cards 5, 6, 1 from the right end)
===================================================================================
*/
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    let left = 0, right = 0, max = 0;
    let n = cardPoints.length;

    function findSum(l, r) {
        let sum = 0;
        for(let i = l; i <= r; i++) {
            sum += cardPoints[i];
        }
        return sum;
    }

    const totalSum = findSum(0, n - 1);

    let sum = 0;
    while(right < n) {
        sum += cardPoints[right];

        if((right - left + 1) > (n - k)) {
            sum -= cardPoints[left];
            left++
        }

        if((right - left + 1) === (n - k)) {
            let windowSum = findSum(left, right);
            max = Math.max(max, totalSum - windowSum);
        }

        right++;
    }

    return max;
};


class Solution {
    // Function to return the maximum score
    // we can get by picking k cards from either end
    maxScore(cardPoints, k) {
        // Get the total number of cards
        const n = cardPoints.length;

        // Initialize total with sum of first k cards from the start (left end)
        let total = 0;
        for (let i = 0; i < k; i++) {
            total += cardPoints[i];
        }

        // Store the initial total as the current maximum score
        let maxPoints = total;

        // We'll now shift the window: remove elements from left end and add from right end
        for (let i = 0; i < k; i++) {
            // Subtract the element being removed from the left window
            total -= cardPoints[k - 1 - i];

            // Add the element being included from the right end
            total += cardPoints[n - 1 - i];

            // Update the maximum score if current total is greater
            maxPoints = Math.max(maxPoints, total);
        }

        // Return the maximum score possible by picking k cards from either end
        return maxPoints;
    }
}

// Driver code
const sol = new Solution();
const cards = [1, 2, 3, 4, 5, 6, 1];
const k = 3;
console.log(sol.maxScore(cards, k));

