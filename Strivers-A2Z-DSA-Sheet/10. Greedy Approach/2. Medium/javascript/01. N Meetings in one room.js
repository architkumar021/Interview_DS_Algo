/*
Question:
There is one meeting room in a firm. There are N meetings in the form of (start[i], end[i]) where start[i] is the start time
of meeting i and end[i] is the finish time of meeting i.
What is the maximum number of meetings that can be accommodated in the meeting room when only one meeting can be held
in the meeting room at a particular time?
Note: Start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

Example:
Input:
N = 6
start[] = {1,3,0,5,8,5}
end[] = {2,4,6,7,9,9}
Output: 4
Explanation: Maximum four meetings can be held with the given start and end timings.
The meetings are - (1, 2), (3, 4), (5, 7), and (8, 9)

Approach:
- We store the meetings as pairs of [end[i], start[i]] in an array.
- We sort the array in non-decreasing order based on the end time of meetings.
- We initialize the answer as 1 and the previous meeting end time as the end time of the first meeting in the sorted array.
- We iterate over the meetings starting from the second meeting.
  - If the start time of the current meeting is greater than the previous meeting end time, we increment the answer
    and update the previous meeting end time.
- Finally, we return the answer.

Complexity Analysis:
- Time Complexity: O(N log N) — sorting the meetings based on end time.
- Space Complexity: O(N) — storing meetings in an array.

Code:
*/

function maxMeetings(start, end, n) {
    // Create array of [endTime, startTime] pairs
    const meet = [];
    for (let i = 0; i < n; i++) {
        meet.push([end[i], start[i]]);
    }

    // Sort by end time
    meet.sort((a, b) => a[0] - b[0]);

    let ans = 1;
    let prev = meet[0][0]; // end time of first meeting

    for (let i = 1; i < n; i++) {
        // If current meeting starts after previous meeting ends
        if (meet[i][1] > prev) {
            ans++;
            prev = meet[i][0]; // update prev end time
        }
    }

    return ans;
}

// Example usage
const start = [1, 3, 0, 5, 8, 5];
const end   = [2, 4, 6, 7, 9, 9];
console.log(maxMeetings(start, end, 6)); // Output: 4

