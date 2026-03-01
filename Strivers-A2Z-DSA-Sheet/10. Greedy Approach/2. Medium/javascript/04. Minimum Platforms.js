/*
Question:
Given arrival and departure times of all trains that reach a railway station, find the minimum number of platforms
required for the railway station so that no train is kept waiting.
Consider that all the trains arrive on the same day and leave on the same day. Arrival and departure time can never
be the same for a train, but we can have the arrival time of one train equal to the departure time of another.
At any given instance of time, the same platform cannot be used for both the departure of a train and the arrival
of another train. In such cases, we need different platforms.

Example:
Input: n = 6
arr[] = {0900, 0940, 0950, 1100, 1500, 1800}
dep[] = {0910, 1200, 1120, 1130, 1900, 2000}
Output: 3
Explanation: Minimum 3 platforms are required to safely arrive and depart all trains.

Approach:
- Sort both arrival and departure arrays independently in ascending order.
- Use two pointers i and j to traverse arrival and departure arrays.
- If arr[i] <= dep[j], a new train arrives before the earliest departing train leaves — need a new platform.
  Increment i and plat; update ans with max platforms seen.
- Otherwise, a train has departed — free a platform. Increment j and decrement plat.
- Continue until all arrivals are processed.

Complexity Analysis:
- Time Complexity: O(N log N) — sorting both arrays.
- Space Complexity: O(1) — constant extra space.

Code:
*/

function findPlatform(arr, dep, n) {
    // Sort arrival and departure arrays
    arr.sort((a, b) => a - b);
    dep.sort((a, b) => a - b);

    let i = 0, j = 0;
    let plat = 0, ans = 0;

    while (i < n) {
        if (arr[i] <= dep[j]) {
            // Train arriving — need a platform
            i++;
            plat++;
            ans = Math.max(ans, plat);
        } else {
            // Train departing — free a platform
            j++;
            plat--;
        }
    }

    return ans;
}

// Example usage
const arr = [900, 940, 950, 1100, 1500, 1800];
const dep = [910, 1200, 1120, 1130, 1900, 2000];
console.log(findPlatform(arr, dep, 6)); // Output: 3

