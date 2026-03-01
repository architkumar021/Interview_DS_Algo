"""
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
- Store meetings as tuples of (end[i], start[i]).
- Sort the list in non-decreasing order based on end time.
- Initialize answer as 1 and prev as the end time of the first meeting.
- Iterate from the second meeting onward:
  - If the start time of the current meeting is greater than prev, increment answer and update prev.
- Return the answer.

Complexity Analysis:
- Time Complexity: O(N log N) — sorting meetings by end time.
- Space Complexity: O(N) — storing meetings in a list.

Code:
"""

def max_meetings(start: list[int], end: list[int], n: int) -> int:
    # Combine as (endTime, startTime) and sort by end time
    meet = sorted(zip(end, start))

    ans = 1
    prev = meet[0][0]  # end time of first meeting

    for i in range(1, n):
        end_time, start_time = meet[i]
        # If current meeting starts after previous meeting ends
        if start_time > prev:
            ans += 1
            prev = end_time  # update previous end time

    return ans


# Example usage
if __name__ == "__main__":
    start = [1, 3, 0, 5, 8, 5]
    end   = [2, 4, 6, 7, 9, 9]
    print(max_meetings(start, end, 6))  # Output: 4

