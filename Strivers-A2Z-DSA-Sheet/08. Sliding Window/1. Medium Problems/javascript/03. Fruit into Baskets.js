/*QUESTION:
You are visiting a farm that has a single row of fruit trees arranged from left to right.
The trees are represented by an integer array fruits of size N, where fruits[i] is the type of fruit the ith tree produces.
You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
1. You only have two baskets, and each basket can only hold a single type of fruit.
There is no limit on the amount of fruit each basket can hold.
2. Starting from any tree of your choice, you must pick exactly one fruit from every
tree (including the start tree) while moving to the right. The picked fruits must fit in one of the baskets.
3. Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array fruits, return the maximum number of fruits you can pick.

Example 1:
Input: N = 3, fruits = [2, 1, 2]
Output: 3
Explanation: We can pick fruits from all three trees.

APPROACH:
1. Initialize a Map mp to track the frequency of fruit types.
2. Initialize variables ans and start to keep track of the maximum number of fruits and the start index of the subarray.
3. Iterate through the fruit trees using a sliding window approach:
   - Increment the frequency of the current fruit type in the map.
   - Enter a while loop to adjust the start index until the number of fruit types in the map becomes more than 2.
   - During the adjustment, decrement the frequency of the fruit type at the start index and remove it from the map
   if the frequency becomes 0.
   - Update the ans by taking the maximum of the current ans and the length of the current subarray if the number of
   fruit types in the map is at most 2.
4. Return the maximum number of fruits (ans).

CODE:*/

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruits = function(fruits) {
    const mp = new Map();
    let ans = 0, start = 0;
    for (let i = 0; i < fruits.length; i++) {
        mp.set(fruits[i], (mp.get(fruits[i]) || 0) + 1);
        while (mp.size > 2) {
            mp.set(fruits[start], mp.get(fruits[start]) - 1);
            if (mp.get(fruits[start]) === 0)
                mp.delete(fruits[start]);
            start++;
        }
        if (mp.size <= 2)
            ans = Math.max(ans, i - start + 1);
    }
    return ans;
};

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N), where N is the number of fruit trees. We iterate through the fruit trees once using
the sliding window approach.
- Space complexity: O(1) or O(2), as the size of the map can be at most 2 since we only have two baskets.
*/

// ==================== BRUTE FORCE APPROACH ====================

class Solution {
    // Function to calculate maximum fruits collected
    // with at most two distinct types from any start point
    totalFruit(fruits) {

        // Variable to store the maximum fruits collected
        let maxFruits = 0;

        // Loop over each possible starting point
        for (let start = 0; start < fruits.length; start++) {

            // Map to count fruit types in basket
            const basket = new Map();

            // Variable to count number of fruits collected
            let currentCount = 0;

            // Traverse from start to end
            for (let end = start; end < fruits.length; end++) {

                // Add fruit to basket
                basket.set(fruits[end], (basket.get(fruits[end]) || 0) + 1);

                // If more than 2 fruit types, break
                if (basket.size > 2) {
                    break;
                }

                // Increase fruit count
                currentCount++;
            }

            // Update maximum fruits collected
            maxFruits = Math.max(maxFruits, currentCount);
        }

        // Return result
        return maxFruits;
    }
}

// Driver code
const obj = new Solution();
const fruits = [1, 2, 1];
console.log(obj.totalFruit(fruits)); // Output: 3

// Time Complexity: O(N^2)
// Space Complexity: O(1)

// ==================== OPTIMIZED APPROACH ====================

class Solution {
    // Function to find the maximum number of fruits we can collect
    // with at most two types of fruits in the baskets.
    totalFruit(fruits) {

        // Initialize tracking variables
        let maxlen = 0;
        let lastFruit = -1, secondLastFruit = -1;
        let currCount = 0, lastFruitStreak = 0;

        // Traverse the fruits array
        for (let fruit of fruits) {

            // If current fruit matches the last two types
            if (fruit === lastFruit || fruit === secondLastFruit) {
                currCount++;
                //
            } else {
                // Reset to streak size
                currCount = lastFruitStreak + 1;
            }

            // Update streak and fruit types
            if (fruit === lastFruit) {
                lastFruitStreak++;
                // If it's a new fruit, update the second last and last fruit
            } else {
                lastFruitStreak = 1;
                secondLastFruit = lastFruit;
                lastFruit = fruit;
            }

            // Update max length
            maxlen = Math.max(maxlen, currCount);
        }

        return maxlen;
    }
}

// Driver code
const sol = new Solution();
const fruits = [1, 2, 1, 2, 3];
console.log(sol.totalFruit(fruits));

// Time Complexity: O(N)
// Space Complexity: O(1)
