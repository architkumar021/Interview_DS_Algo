"""
Question:
Given a set of N jobs where each job i has a deadline and profit associated with it.
Each job takes 1 unit of time to complete, and only one job can be scheduled at a time.
We earn the profit associated with a job if and only if the job is completed by its deadline.
Find the number of jobs done and the maximum profit.

Example:
Input:
N = 4
Jobs = [(id=1, deadline=4, profit=20), (id=2, deadline=1, profit=10),
        (id=3, deadline=1, profit=40), (id=4, deadline=1, profit=30)]
Output: (2, 60)
Explanation: Job1 and Job3 can be done with a maximum profit of 60 (20+40).

Approach:
- Sort jobs in descending order of profit — greedily pick the most profitable jobs first.
- Find the max deadline to size the slots array.
- For each job, scan from its deadline down to 1 and find the first free time slot.
- If a free slot is found, mark it as taken, increment count, and add the profit.
- Return (count, total_profit).

Complexity Analysis:
- Time Complexity: O(N log N + N * max_deadline) — sorting + scheduling.
- Space Complexity: O(max_deadline) — slots array.

Code:
"""

def job_scheduling(jobs: list[dict], n: int) -> tuple[int, int]:
    # Sort jobs by profit in descending order
    jobs.sort(key=lambda x: x['profit'], reverse=True)

    # Find max deadline
    max_deadline = max(job['deadline'] for job in jobs)

    # slots[i] = True means time slot i is occupied
    slots = [False] * (max_deadline + 1)

    count = 0
    total_profit = 0

    for job in jobs:
        # Try to place job in the latest available slot <= its deadline
        for slot in range(job['deadline'], 0, -1):
            if not slots[slot]:
                slots[slot] = True  # occupy this slot
                count += 1
                total_profit += job['profit']
                break

    return (count, total_profit)


# Example usage
if __name__ == "__main__":
    jobs = [
        {'id': 1, 'deadline': 4, 'profit': 20},
        {'id': 2, 'deadline': 1, 'profit': 10},
        {'id': 3, 'deadline': 1, 'profit': 40},
        {'id': 4, 'deadline': 1, 'profit': 30},
    ]
    print(job_scheduling(jobs, 4))  # Output: (2, 60)

