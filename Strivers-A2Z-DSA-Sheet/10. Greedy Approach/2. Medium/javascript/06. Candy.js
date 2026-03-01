/*
Question:
There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to distribute.

Example:
Input: ratings = [1,0,2]
Output: 5
Explanation: Allocate 2, 1, 2 candies to the first, second, and third child respectively.

Approach:
- Start by giving 1 candy to every child.
- Left-to-right pass: if ratings[i] > ratings[i-1], give child i one more candy than child i-1.
  This ensures the right-neighbor constraint is satisfied.
- Right-to-left pass: if ratings[i] > ratings[i+1], ensure child i has more than child i+1.
  Take max(current, num[i+1] + 1) to preserve the result from the left pass.
- Sum all candies and return.

Complexity Analysis:
- Time Complexity: O(N) — two passes through the array.
- Space Complexity: O(N) — array to store candy counts.

Code:
*/

function candy(ratings) {
    const n = ratings.length;
    if (n === 1) return 1;

    // Start with 1 candy for each child
    const num = new Array(n).fill(1);

    // Left-to-right: satisfy left-neighbor constraint
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            num[i] = num[i - 1] + 1;
        }
    }

    // Right-to-left: satisfy right-neighbor constraint
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            num[i] = Math.max(num[i], num[i + 1] + 1);
        }
    }

    // Sum up all candies
    return num.reduce((sum, val) => sum + val, 0);
}

// Example usage
console.log(candy([1, 0, 2]));       // Output: 5
console.log(candy([1, 2, 2]));       // Output: 4
console.log(candy([1, 3, 4, 5, 2])); // Output: 11


// ============================================================
// OPTIMAL SOLUTION — O(N) Time | O(1) Space (Single Pass)
// ============================================================
/*
Approach:
Instead of using an extra array, we observe that the candy distribution
forms a series of "slopes" — ascending runs (up) and descending runs (down).

Key observations:
  - For every ascending run of length `up`, the candies needed are: 1+2+3+...+(up+1) = sum(up)
  - For every descending run of length `down`, the candies needed are: 1+2+3+...+(down+1) = sum(down)
  - The peak between an ascending and descending run is SHARED.
    The peak should take max(up, down) + 1 candies (not double-counted).
    We add max(up, down) instead of counting the peak in both runs.

Algorithm:
  - Start with 1 candy for the first child.
  - Walk through each adjacent pair of children:
    1. If ratings[i] > ratings[i-1]: ascending run — increment 'up', reset 'down' to 0.
       Peak = up + 1 candies; add that to total.
    2. If ratings[i] < ratings[i-1]: descending run — increment 'down', reset 'up' to 0.
       If down slope becomes as long as the peak value, bump the total by 1
       (peak needs one more candy to stay above the descending side).
       Add 1 for the current child's position on the descending slope.
    3. If ratings[i] === ratings[i-1]: reset both runs — new independent segment.
       Add 1 for this child.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the ratings array.
- Space Complexity: O(1) — no extra array used.

Code:
*/

function candyOptimal(ratings) {
    const n = ratings.length;
    if (n === 1) return 1;

    let total = 1; // first child always gets 1 candy
    let up = 0;    // length of current ascending run
    let down = 0;  // length of current descending run
    let peak = 0;  // candy count at the top of last ascending run

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            // Ascending: new peak
            up++;
            down = 0;
            peak = up + 1;  // peak takes (up + 1) candies
            total += peak;  // add peak candy to total

        } else if (ratings[i] < ratings[i - 1]) {
            // Descending: extend the down slope
            down++;
            up = 0;

            // If down slope is as long as the peak candy, the peak needs one more candy
            // to remain strictly greater than its right neighbor
            if (down >= peak) {
                total += 1; // bump the shared peak upward
            }

            total += 1; // current child on descending slope (relative position 1 from bottom)

        } else {
            // Equal ratings: reset both runs
            up = 0;
            down = 0;
            peak = 0;
            total += 1; // this child independently gets 1 candy
        }
    }

    return total;
}

// Example usage
console.log(candyOptimal([1, 0, 2]));       // Output: 5
console.log(candyOptimal([1, 2, 2]));       // Output: 4
console.log(candyOptimal([1, 3, 4, 5, 2])); // Output: 11


class Solution {
    // Function to calculate the minimum number of candies
    candy(ratings) {
        // Get number of children
        let n = ratings.length;

        // Initially give 1 candy to each child
        let candies = n;

        // Start from second child
        let i = 1;

        while (i < n) {

            // Skip equal ratings
            if (ratings[i] === ratings[i - 1]) {
                i++;
                continue;
            }

            // Initialize increasing slope counter
            let peak = 0;

            // Traverse strictly increasing ratings
            while (i < n && ratings[i] > ratings[i - 1]) {
                peak++;
                candies += peak;
                i++;
            }

            // Initialize decreasing slope counter
            let valley = 0;

            // Traverse strictly decreasing ratings
            while (i < n && ratings[i] < ratings[i - 1]) {
                valley++;
                candies += valley;
                i++;
            }

            // Remove overlapping candy at the peak
            candies -= Math.min(peak, valley);
        }

        // Return total candies required
        return candies;
    }
}


// Driver code
const ratings = [1, 3, 6, 8, 9, 5, 3];
const sol = new Solution();
console.log("Minimum candies required:", sol.candy(ratings));
