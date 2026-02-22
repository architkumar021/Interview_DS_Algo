"""
QUESTION:
Given an integer array nums and an integer k, return the kth largest element in the array.

APPROACH:
To find the kth largest element in the array, we can use a min-heap of size k.
1. Initialize a min-heap (priority queue) of size k.
2. Insert the first k elements of the array into the min-heap.
3. For the remaining elements in the array, if an element is larger than the top element
   of the min-heap, replace the top element with the current element and heapify to
   maintain the min-heap property.
4. After processing all the elements, the top element of the min-heap will be the kth
   largest element in the array.

TIME COMPLEXITY:
The time complexity is O(N log k), where N is the size of the array. Inserting elements
into the min-heap and heapifying take O(log k) time, and we do this for N-k elements.

SPACE COMPLEXITY:
The space complexity is O(k) as we need to store k elements in the min-heap.
"""

import heapq
from typing import List


def find_kth_largest(nums: List[int], k: int) -> int:
    """
    Find the kth largest element using min-heap of size k
    """
    # Create min-heap with first k elements
    pq = nums[:k]
    heapq.heapify(pq)

    # For remaining elements, if larger than top, replace
    for i in range(k, len(nums)):
        if nums[i] > pq[0]:
            heapq.heapreplace(pq, nums[i])

    return pq[0]


def find_kth_largest_alternative(nums: List[int], k: int) -> int:
    """
    Alternative approach using nlargest
    """
    return heapq.nlargest(k, nums)[-1]


# Example usage:
# print(find_kth_largest([3,2,1,5,6,4], 2))  # Output: 5
# print(find_kth_largest([3,2,3,1,2,4,5,5,6], 4))  # Output: 4


"""
OPTIMAL SOLUTION:
"""

import random

class Solution:
    # Function to get the Kth largest element
    def kthLargestElement(self, nums, k):
        # Return -1, if the Kth largest element does not exist
        if k > len(nums):
            return -1

        # Pointers to mark the part of working array
        left, right = 0, len(nums) - 1

        # Until the Kth largest element is found
        while True:
            # Get the pivot index
            pivotIndex = self.randomIndex(left, right)

            # Update the pivotIndex
            pivotIndex = self.partitionAndReturnIndex(nums, pivotIndex, left, right)

            # If Kth largest element is found, return
            if pivotIndex == k - 1:
                return nums[pivotIndex]

            # Else adjust the end pointers in array
            elif pivotIndex > k - 1:
                right = pivotIndex - 1
            else:
                left = pivotIndex + 1

    # Function to get a random index
    def randomIndex(self, left, right):
        # Length of the array
        length = right - left + 1

        # Return a random index from the array
        return random.randint(left, right)

    # Function to perform the partition and return the updated index of pivot
    def partitionAndReturnIndex(self, nums, pivotIndex, left, right):
        pivot = nums[pivotIndex]  # Get the pivot element

        # Swap the pivot with the left element
        nums[left], nums[pivotIndex] = nums[pivotIndex], nums[left]

        ind = left + 1  # Index to mark the start of right portion

        # Traverse on the array
        for i in range(left + 1, right + 1):
            # If the current element is greater than the pivot
            if nums[i] > pivot:
                # Place the current element in the left portion
                nums[ind], nums[i] = nums[i], nums[ind]

                # Move the right portion index
                ind += 1

        # Place the pivot at the correct index
        nums[left], nums[ind - 1] = nums[ind - 1], nums[left]

        return ind - 1  # Return the index of pivot now

# Driver code
def main():
    nums = [-5, 4, 1, 2, -3]
    k = 5

    # Creating an object of the Solution class
    sol = Solution()

    # Function call to get the Kth largest element
    ans = sol.kthLargestElement(nums, k)

    # Output array
    print("The Kth largest element in the array is:", ans)

if __name__ == "__main__":
    main()