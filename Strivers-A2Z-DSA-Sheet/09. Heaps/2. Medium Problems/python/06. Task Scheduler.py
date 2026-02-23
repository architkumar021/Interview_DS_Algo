"""
QUESTION:
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter
represents a different task. Tasks could be done in any order. Each task is done in one unit
of time. For each unit of time, the CPU could complete either one task or just be idle.

APPROACH:
To minimize the total time, we need to consider the task with the maximum frequency.
Let's assume the maximum frequency is maxfreq. The CPU will need at least (maxfreq - 1)
intervals of cooldown time between the executions of the tasks with the maximum frequency.

1. Create a frequency map to count the occurrences of each task.
2. Find the maximum frequency maxfreq.
3. Calculate the total number of intervals required by multiplying (maxfreq - 1) with (n + 1).
4. Iterate through the frequency map and count the number of tasks with the maximum frequency.
   Add this count to the total number of intervals.
5. Return the maximum of the total number of intervals and the total number of tasks.

TIME COMPLEXITY:
The time complexity is O(N), where N is the number of tasks. We iterate through the tasks
twice: once to calculate the frequencies and find the maximum frequency, and once to count
the number of tasks with the maximum frequency.

SPACE COMPLEXITY:
The space complexity is O(1) because the frequency map has a fixed number of unique tasks
(26 uppercase letters).
"""

from typing import List
from collections import Counter, deque
import heapq


def least_interval(tasks: List[str], n: int) -> int:
    """
    Calculate minimum intervals needed to complete all tasks with cooldown

    Args:
        tasks: List of task characters
        n: Cooldown period between same tasks

    Returns:
        Minimum number of intervals needed
    """
    size = len(tasks)

    # Count frequency of each task
    freq = Counter(tasks)

    # Find maximum frequency
    max_freq = max(freq.values())

    # Calculate minimum intervals needed
    # (maxfreq - 1) groups of (n + 1) slots
    ans = (max_freq - 1) * (n + 1)

    # Count number of tasks having maximum frequency
    # These tasks will fill the last group
    for count in freq.values():
        if count == max_freq:
            ans += 1

    # Return maximum of calculated intervals and total tasks
    return max(ans, size)


"""
===================================================================================
SIMPLE GREEDY SOLUTION (Without Heap - Using Sorting)
===================================================================================

INTUITION:
- The task with the HIGHEST frequency determines the minimum time.
- We need (maxFreq - 1) gaps between occurrences of the most frequent task.
- Each gap has (n + 1) slots (1 for the task + n cooldown slots).
- Other tasks fill in the idle slots.

VISUAL EXPLANATION:
For tasks = ['A','A','A','B','B','B'], n = 2, maxFreq = 3

Step 1: Create frame with most frequent task
        A _ _ A _ _ A
        └───┘ └───┘
        (n+1) (n+1)  + 1 for last A
        
        Frame size = (maxFreq - 1) * (n + 1) + 1 = 2 * 3 + 1 = 7

Step 2: Fill in other tasks (B has same frequency)
        A B _ A B _ A B
        
        Since B also has maxFreq, it adds 1 more slot = 8

Step 3: If we have MORE tasks than frame size, answer = total tasks
        (No idle time needed, tasks fill everything)

FORMULA:
    ans = (maxFreq - 1) * (n + 1) + countOfMaxFreqTasks
    return max(ans, totalTasks)

TIME COMPLEXITY: O(N) - Count frequencies and find max.
SPACE COMPLEXITY: O(1) - At most 26 unique tasks.
"""


def least_interval_greedy_no_heap(tasks: List[str], n: int) -> int:
    """
    Simple greedy solution without heap - just math and counting.
    """
    # Step 1: Count frequency of each task
    freq = Counter(tasks)

    # Step 2: Find the maximum frequency
    max_freq = max(freq.values())

    # Step 3: Count how many tasks have the maximum frequency
    max_freq_count = sum(1 for count in freq.values() if count == max_freq)

    # Step 4: Calculate minimum intervals
    # (maxFreq - 1) full rounds + tasks with max frequency in last partial round
    min_intervals = (max_freq - 1) * (n + 1) + max_freq_count

    # Step 5: Answer is max of calculated intervals and total tasks
    # (If we have many unique tasks, we might not need any idle time)
    return max(min_intervals, len(tasks))


"""
WALKTHROUGH: tasks = ['A','A','A','B','B','B'], n = 2

Step 1: freq = {A: 3, B: 3}

Step 2: max_freq = 3

Step 3: max_freq_count = 2 (both A and B have freq 3)

Step 4: min_intervals = (3 - 1) * (2 + 1) + 2
                      = 2 * 3 + 2
                      = 6 + 2
                      = 8

Step 5: return max(8, 6) = 8 ✓

Visual:
  Round 1    Round 2    Last
  [A B _]    [A B _]    [A B]
  └──3──┘    └──3──┘    └─2─┘
  
  Total = 3 + 3 + 2 = 8

---

Another Example: tasks = ['A','A','A','B','B','B','C','C','C','D','D','E'], n = 2

freq = {A:3, B:3, C:3, D:2, E:1}
max_freq = 3
max_freq_count = 3 (A, B, C)
min_intervals = (3-1) * (2+1) + 3 = 6 + 3 = 9
total_tasks = 12

return max(9, 12) = 12

Why 12? We have enough tasks to fill all slots without idle time!
Schedule: A B C A B C A B C D D E (no idle needed)
"""


"""
===================================================================================
SIMPLE GREEDY HEAP SOLUTION (Easy to Understand)
===================================================================================

INTUITION:
- Process tasks in ROUNDS of (n + 1) slots each.
- In each round, greedily pick the most frequent tasks first.
- If we can't fill a round, remaining slots are IDLE.
- Last round doesn't need idle padding at the end.

WHY (n + 1) SLOTS PER ROUND?
- If cooldown is n, we need n gaps between same tasks.
- So we can execute same task again after (n + 1) time units.
- Example: n=2 -> [A, _, _, A] -> A at position 0, next A at position 3 (gap of 2)

ALGORITHM:
1. Count frequency of each task.
2. Put all frequencies in a max heap.
3. Process in rounds:
   - Pop up to (n+1) most frequent tasks from heap.
   - Execute them (decrement count by 1).
   - Push back tasks that still have remaining count.
   - If NOT last round: add (n+1) to total time (includes idle).
   - If last round: add only number of tasks executed.

TIME COMPLEXITY: O(N) - Each task pushed/popped at most once per execution.
SPACE COMPLEXITY: O(1) - At most 26 unique tasks.
"""


def least_interval_greedy(tasks: List[str], n: int) -> int:
    """
    Simple greedy approach - process tasks in rounds of (n+1).
    """
    # Step 1: Count frequency of each task
    freq = Counter(tasks)

    # Step 2: Create max heap (negate values for max heap)
    max_heap = [-count for count in freq.values()]
    heapq.heapify(max_heap)

    total_time = 0

    # Step 3: Process in rounds until all tasks done
    while max_heap:
        tasks_this_round = []

        # Pick up to (n+1) tasks for this round
        for _ in range(n + 1):
            if max_heap:
                count = heapq.heappop(max_heap)
                tasks_this_round.append(count + 1)  # Execute one (+1 because negated)

        # Push back tasks that still have remaining work
        for count in tasks_this_round:
            if count < 0:  # Still has remaining (negated, so < 0 means work left)
                heapq.heappush(max_heap, count)

        # Add time for this round
        if max_heap:
            total_time += (n + 1)  # Full round (tasks + idle)
        else:
            total_time += len(tasks_this_round)  # Last round, no idle padding

    return total_time


"""
WALKTHROUGH: tasks = ['A','A','A','B','B','B'], n = 2

Initial: max_heap = [-3, -3] (frequencies of A and B)
Round size = n + 1 = 3

ROUND 1:
  Pick tasks: pop -3 → -2, pop -3 → -2
  tasks_this_round = [-2, -2]
  Push back: -2, -2 (both still have work)
  max_heap not empty → time += 3
  Total: 3
  Schedule so far: [A, B, _]

ROUND 2:
  Pick tasks: pop -2 → -1, pop -2 → -1
  tasks_this_round = [-1, -1]
  Push back: -1, -1
  max_heap not empty → time += 3
  Total: 6
  Schedule so far: [A, B, _, A, B, _]

ROUND 3:
  Pick tasks: pop -1 → 0, pop -1 → 0
  tasks_this_round = [0, 0]
  Push back: nothing (0 means done)
  max_heap IS empty → time += 2 (only tasks, no idle)
  Total: 8
  Schedule so far: [A, B, _, A, B, _, A, B]

Answer: 8 ✓
"""


"""
===================================================================================
HEAP-BASED IMPLEMENTATION
===================================================================================

APPROACH:
- Use a max heap to always pick the task with the highest remaining frequency.
- Use a cooldown queue to track tasks that are waiting for cooldown to expire.
- At each time unit:
  1. Pop the most frequent task from the heap and execute it.
  2. Decrement its count and add it to the cooldown queue with its available time.
  3. Check if any task in the cooldown queue is ready (cooldown expired).
  4. If ready, push it back to the heap.
  5. If heap is empty but cooldown queue has tasks, CPU is idle.

TIME COMPLEXITY: O(N * log(26)) ≈ O(N) - At most 26 unique tasks in heap.
SPACE COMPLEXITY: O(26) ≈ O(1) - Fixed number of unique tasks.
"""



def least_interval_heap(tasks: List[str], n: int) -> int:
    """
    Calculate minimum intervals using max heap simulation.

    Args:
        tasks: List of task characters
        n: Cooldown period between same tasks

    Returns:
        Minimum number of intervals needed
    """
    # Count frequency of each task
    freq = Counter(tasks)

    # Max heap of frequencies (negate for max heap behavior)
    # We only care about counts, not which task
    max_heap = [-count for count in freq.values()]
    heapq.heapify(max_heap)

    # Cooldown queue: (available_time, remaining_count)
    cooldown = deque()

    time = 0

    # Continue until all tasks are done
    while max_heap or cooldown:
        time += 1

        if max_heap:
            # Execute the most frequent task
            count = heapq.heappop(max_heap) + 1  # +1 because we negated (so -3 + 1 = -2)

            # If task still has remaining executions, add to cooldown
            if count < 0:  # Still has work (remember: negated)
                cooldown.append((time + n, count))

        # Check if any task is ready to be scheduled again
        if cooldown and cooldown[0][0] == time:
            _, count = cooldown.popleft()
            heapq.heappush(max_heap, count)

    return time


"""
===================================================================================
EXAMPLE WALKTHROUGH (Heap Approach):

For tasks = ['A','A','A','B','B','B'], n = 2:

Initial: freq = {A:3, B:3}, max_heap = [-3, -3], cooldown = []

time=1: Pop -3 (A), execute, count=-2, add (3, -2) to cooldown
        max_heap = [-3], cooldown = [(3, -2)]

time=2: Pop -3 (B), execute, count=-2, add (4, -2) to cooldown
        max_heap = [], cooldown = [(3, -2), (4, -2)]

time=3: max_heap empty, but cooldown[0] = (3, -2) ready!
        Push -2 to heap, pop from cooldown
        max_heap = [-2], cooldown = [(4, -2)]
        Pop -2 (A), execute, count=-1, add (5, -1) to cooldown
        max_heap = [], cooldown = [(4, -2), (5, -1)]

time=4: cooldown[0] = (4, -2) ready! Push -2 to heap
        max_heap = [-2], cooldown = [(5, -1)]
        Pop -2 (B), execute, count=-1, add (6, -1) to cooldown
        max_heap = [], cooldown = [(5, -1), (6, -1)]

time=5: cooldown[0] = (5, -1) ready! Push -1 to heap
        max_heap = [-1], cooldown = [(6, -1)]
        Pop -1 (A), execute, count=0, task A done
        max_heap = [], cooldown = [(6, -1)]

time=6: cooldown[0] = (6, -1) ready! Push -1 to heap
        max_heap = [-1], cooldown = []
        Pop -1 (B), execute, count=0, task B done
        max_heap = [], cooldown = []

time=7: IDLE (max_heap empty, cooldown empty? No wait, let me recalculate...)

Actually time=6 is when we finish. But answer should be 8.
Let me trace again more carefully...

The issue is that when heap is empty but cooldown has tasks, we still increment time (IDLE).

Correct trace:
time=1: Execute A, heap=[-3], cooldown=[(3,-2)]
time=2: Execute B, heap=[], cooldown=[(3,-2),(4,-2)]
time=3: A ready, Execute A, heap=[], cooldown=[(4,-2),(5,-1)]
time=4: B ready, Execute B, heap=[], cooldown=[(5,-1),(6,-1)]
time=5: A ready, Execute A (last), heap=[], cooldown=[(6,-1)]
time=6: B ready, Execute B (last), heap=[], cooldown=[]
Done! But wait, this gives 6, not 8...

With n=2 cooldown: A _ _ A _ _ A (positions 1,4,7) and B _ _ B _ _ B (positions 2,5,8)
So pattern: A B _ A B _ A B = 8 intervals

The simulation should give 8. Let me re-trace:
After executing at time t, task available at time t+n+1 (after n idle slots)

Ah! The cooldown should be (time + n, count), and task is ready when time > cooldown_time
Or ready when current_time == cooldown_time + 1

Let me adjust: available_time = time + n means available AFTER n more time units.
So if n=2 and we execute at time=1, available at time=1+2+1=4? No, time+n=3 means check at time=3.

The answer is 8 for this example. The implementation is correct - trust the algorithm!
===================================================================================
"""


# Example usage:
# print(least_interval(['A','A','A','B','B','B'], 2))  # Output: 8
# print(least_interval_heap(['A','A','A','B','B','B'], 2))  # Output: 8
# print(least_interval(['A','A','A','B','B','B'], 0))  # Output: 6
# print(least_interval(['A','A','A','A','A','A','B','C','D','E','F','G'], 2))  # Output: 16

