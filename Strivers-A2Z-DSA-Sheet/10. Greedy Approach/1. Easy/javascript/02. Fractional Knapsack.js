/*
QUESTION:
Given weights and values of N items, we need to put these items in a knapsack of capacity W to get the maximum total value in the knapsack.
Note: Unlike 0/1 knapsack, you are allowed to break the item.

Example:
Input:
N = 3, W = 50
values[] = {60, 100, 120}
weight[] = {10, 20, 30}
Output: 240.00
Explanation: Total maximum value of items we can have is 240.00 from the given capacity of the sack.

APPROACH:
1. Calculate value/weight ratio for each item.
2. Sort items by their value/weight ratio in descending order.
3. Greedily pick items with highest ratio first.
4. If an item fits completely, take it entirely.
5. If an item doesn't fit, take a fraction of it to fill remaining capacity.

COMPLEXITY ANALYSIS:
- Time Complexity: O(n log n) - Sorting the items takes O(n log n) time.
- Space Complexity: O(1) - Only using constant extra space (excluding input).
*/

/**
 * @param {number} W - Capacity of knapsack
 * @param {Array<{value: number, weight: number}>} items - Array of items with value and weight
 * @return {number} - Maximum value that can be obtained
 */
function fractionalKnapsack(W, items) {
    // Sort items by value/weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;
    let remainingCapacity = W;

    for (let i = 0; i < items.length && remainingCapacity > 0; i++) {
        if (items[i].weight <= remainingCapacity) {
            // Take the entire item
            totalValue += items[i].value;
            remainingCapacity -= items[i].weight;
        } else {
            // Take a fraction of the item
            const fraction = remainingCapacity / items[i].weight;
            totalValue += items[i].value * fraction;
            remainingCapacity = 0;
        }
    }

    return totalValue;
}

// Alternative with separate arrays
function fractionalKnapsackArrays(W, values, weights) {
    const n = values.length;

    // Create items array with value, weight, and ratio
    const items = [];
    for (let i = 0; i < n; i++) {
        items.push({
            value: values[i],
            weight: weights[i],
            ratio: values[i] / weights[i]
        });
    }

    // Sort by ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let remainingCapacity = W;

    for (let i = 0; i < n && remainingCapacity > 0; i++) {
        if (items[i].weight <= remainingCapacity) {
            totalValue += items[i].value;
            remainingCapacity -= items[i].weight;
        } else {
            totalValue += items[i].ratio * remainingCapacity;
            remainingCapacity = 0;
        }
    }

    return totalValue;
}

// Example usage:
// const items = [
//     { value: 60, weight: 10 },
//     { value: 100, weight: 20 },
//     { value: 120, weight: 30 }
// ];
// console.log(fractionalKnapsack(50, items)); // Output: 240.00
// console.log(fractionalKnapsackArrays(50, [60, 100, 120], [10, 20, 30])); // Output: 240.00

