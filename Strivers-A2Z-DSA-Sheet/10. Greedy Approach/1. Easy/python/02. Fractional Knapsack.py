"""
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
- Space Complexity: O(n) - Creating items list with ratios.
"""

from typing import List, Tuple


class Item:
    """Class to represent an item with value and weight."""
    def __init__(self, value: int, weight: int):
        self.value = value
        self.weight = weight


def fractional_knapsack(W: int, items: List[Item]) -> float:
    """
    Calculate maximum value using fractional knapsack.

    Args:
        W: Capacity of knapsack
        items: List of Item objects with value and weight

    Returns:
        Maximum value that can be obtained
    """
    # Sort items by value/weight ratio in descending order
    items.sort(key=lambda x: x.value / x.weight, reverse=True)

    total_value = 0.0
    remaining_capacity = W

    for item in items:
        if remaining_capacity <= 0:
            break

        if item.weight <= remaining_capacity:
            # Take the entire item
            total_value += item.value
            remaining_capacity -= item.weight
        else:
            # Take a fraction of the item
            fraction = remaining_capacity / item.weight
            total_value += item.value * fraction
            remaining_capacity = 0

    return total_value


def fractional_knapsack_arrays(W: int, values: List[int], weights: List[int]) -> float:
    """
    Alternative implementation using separate arrays.

    Args:
        W: Capacity of knapsack
        values: List of values
        weights: List of weights

    Returns:
        Maximum value that can be obtained
    """
    n = len(values)

    # Create list of (ratio, value, weight) tuples
    items = [(values[i] / weights[i], values[i], weights[i]) for i in range(n)]

    # Sort by ratio in descending order
    items.sort(key=lambda x: x[0], reverse=True)

    total_value = 0.0
    remaining_capacity = W

    for ratio, value, weight in items:
        if remaining_capacity <= 0:
            break

        if weight <= remaining_capacity:
            total_value += value
            remaining_capacity -= weight
        else:
            total_value += ratio * remaining_capacity
            remaining_capacity = 0

    return total_value


# Example usage:
# items = [Item(60, 10), Item(100, 20), Item(120, 30)]
# print(fractional_knapsack(50, items))  # Output: 240.0
# print(fractional_knapsack_arrays(50, [60, 100, 120], [10, 20, 30]))  # Output: 240.0

