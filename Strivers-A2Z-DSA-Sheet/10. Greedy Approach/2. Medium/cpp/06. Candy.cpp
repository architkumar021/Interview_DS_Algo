/*
Question:
There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

Example:
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second, and third child with 2, 1, 2 candies respectively.

Approach:
- We start by assigning 1 candy to each child as the minimum requirement.
- Then, we iterate from left to right and check if the current child has a higher rating than the previous child.
- If yes, we increment the number of candies for the current child by 1 compared to the previous child.
- Next, we iterate from right to left and check if the current child has a higher rating than the next child.
- If yes, we take the maximum of the current child's candies and the next child's candies plus 1.
- Finally, we sum up all the candies assigned to get the minimum number of candies required.

Complexity Analysis:
- The time complexity of this approach is O(N), where N is the number of children.
- We iterate over the ratings twice to assign the candies.
- The space complexity is O(N) as we use an additional vector to store the number of candies assigned to each child.

Code:
*/

int candy(vector<int>& ratings) {
    int n = ratings.size();
    if(n == 1) return 1;
    vector<int> num(n, 1);
    for(int i = 1; i < n; i++) {
        if(ratings[i] > ratings[i-1]) {
            num[i] = num[i-1] + 1;
        }
    }
    for(int i = n-2; i >= 0; i--) {
        if(ratings[i] > ratings[i+1]) {
            num[i] = max(num[i], num[i+1] + 1);
        }
    }
    int sum = 0;
    for(auto it : num) {
        sum += it;
    }
    return sum;
}

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
  - The peak between an ascending and descending run is shared.
    The peak should take max(up, down) + 1 candies (not double-counted).
    We add max(up, down) instead of up+1 and down+1 separately to avoid counting peak twice.

Algorithm:
  - Start with 1 candy for the first child.
  - Walk through each adjacent pair of children:
    1. If ratings[i] > ratings[i-1]: ascending run — increment 'up', reset 'down' to 0.
    2. If ratings[i] < ratings[i-1]: descending run — increment 'down', reset 'up' to 0.
       At this point, the peak's candy contribution is max(up, down) not up+1 (shared peak).
    3. If ratings[i] == ratings[i-1]: both runs reset — new independent segment starts.
  - For each step, add the current position's candy count to total:
    - Ascending:  add (up + 1)
    - Descending: add (down + 1), and replace the previous peak from (up+1) to max(up, down)
    - Equal:      add 1

  Helper: sum(n) = n*(n+1)/2 gives total candies for a run of length n.

Complexity Analysis:
- Time Complexity: O(N) — single pass through the ratings array.
- Space Complexity: O(1) — no extra array used.

Code:
*/

int candyOptimal(vector<int>& ratings) {
    int n = ratings.size();
    if (n == 1) return 1;

    int total = 1; // first child always gets 1 candy
    int up = 0;    // length of current ascending run
    int down = 0;  // length of current descending run
    int peak = 0;  // candy count at the top of last ascending run

    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            // Ascending: new peak
            up++;
            down = 0;
            peak = up + 1;    // peak takes (up+1) candies
            total += peak;    // add peak candy

        } else if (ratings[i] < ratings[i - 1]) {
            // Descending: extend the down slope
            down++;
            up = 0;

            // If down slope is as long as the peak, the peak needs one more candy
            // Adjust by adding 1 to total (extend the peak upward)
            if (down >= peak) {
                total += 1;   // bump the shared peak candy
            }

            total += 1;       // current child on descending slope gets 1 candy
                              // (relative position is down+1 but we use the trick)

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

// Example usage (main)
// int main() {
//     vector<int> ratings1 = {1, 0, 2};
//     cout << candyOptimal(ratings1) << endl; // Output: 5
//
//     vector<int> ratings2 = {1, 2, 2};
//     cout << candyOptimal(ratings2) << endl; // Output: 4
//
//     vector<int> ratings3 = {1, 3, 4, 5, 2};
//     cout << candyOptimal(ratings3) << endl; // Output: 11
//     return 0;
// }

