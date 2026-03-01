/*
Question:
Given a set of N jobs where each job i has a deadline and profit associated with it.
Each job takes 1 unit of time to complete, and only one job can be scheduled at a time.
We earn the profit associated with a job if and only if the job is completed by its deadline.
Find the number of jobs done and the maximum profit.

Example:
Input:
N = 4
Jobs = [{id:1, deadline:4, profit:20}, {id:2, deadline:1, profit:10},
        {id:3, deadline:1, profit:40}, {id:4, deadline:1, profit:30}]
Output: [2, 60]
Explanation: Job1 and Job3 can be done with a maximum profit of 60 (20+40).

Approach:
- Sort jobs in descending order of profit — greedily pick the most profitable jobs first.
- For each job, try to schedule it as late as possible within its deadline (to leave earlier slots free).
- Maintain a slots array of size (maxDeadline + 1) initialized to false (all slots free).
- For each job, scan from its deadline down to 1 and find the first free slot.
- If found, mark slot as taken, increment count and add profit.

Complexity Analysis:
- Time Complexity: O(N log N + N * maxDeadline) — sorting + scheduling.
- Space Complexity: O(maxDeadline) — slots array.

Code:
*/

function jobScheduling(jobs, n) {
    // Sort jobs by profit in descending order
    jobs.sort((a, b) => b.profit - a.profit);

    // Find max deadline to size the slots array
    let maxDeadline = 0;
    for (const job of jobs) {
        maxDeadline = Math.max(maxDeadline, job.deadline);
    }

    // slots[i] = true means time slot i is occupied
    const slots = new Array(maxDeadline + 1).fill(false);

    let count = 0;
    let totalProfit = 0;

    for (const job of jobs) {
        // Try to place job in the latest available slot <= its deadline
        for (let slot = job.deadline; slot >= 1; slot--) {
            if (!slots[slot]) {
                slots[slot] = true; // occupy this slot
                count++;
                totalProfit += job.profit;
                break;
            }
        }
    }

    return [count, totalProfit];
}

// Example usage
const jobs = [
    { id: 1, deadline: 4, profit: 20 },
    { id: 2, deadline: 1, profit: 10 },
    { id: 3, deadline: 1, profit: 40 },
    { id: 4, deadline: 1, profit: 30 },
];
console.log(jobScheduling(jobs, 4)); // Output: [2, 60]

