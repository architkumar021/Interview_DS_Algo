// 160. Intersection of Two Linked Lists

// Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

// For example, the following two linked lists begin to intersect at node c1:


// The test cases are generated such that there are no cycles anywhere in the entire linked structure.

// Note that the linked lists must retain their original structure after the function returns.

// Custom Judge:

// The inputs to the judge are given as follows (your program is not given these inputs):

// intersectVal - The value of the node where the intersection occurs. This is 0 if there is no intersected node.
// listA - The first linked list.
// listB - The second linked list.
// skipA - The number of nodes to skip ahead in listA (starting from the head) to get to the intersected node.
// skipB - The number of nodes to skip ahead in listB (starting from the head) to get to the intersected node.
// The judge will then create the linked structure based on these inputs and pass the two heads, headA and headB to your program. If you correctly return the intersected node, then your solution will be accepted.

 

// Example 1:


// Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
// Output: Intersected at '8'
// Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
// From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
// - Note that the intersected node's value is not 1 because the nodes with value 1 in A and B (2nd node in A and 3rd node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3rd node in A and 4th node in B) point to the same location in memory.
// Example 2:


// Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// Output: Intersected at '2'
// Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect).
// From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.
// Example 3:


// Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// Output: No intersection
// Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
// Explanation: The two lists do not intersect, so return null.
 

// Constraints:

// The number of nodes of listA is in the m.
// The number of nodes of listB is in the n.
// 1 <= m, n <= 3 * 104
// 1 <= Node.val <= 105
// 0 <= skipA <= m
// 0 <= skipB <= n
// intersectVal is 0 if listA and listB do not intersect.
// intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.
 

// Follow up: Could you write a solution that runs in O(m + n) time and use only O(1) memory?


// Brute Force

// 🔧 1. Brute Force (Naive)
// Compare every node in list A with every node in list B.

// 🔻 Time: O(m × n)
// 🔻 Space: O(1)

var getIntersectionNode = function(headA, headB) {
    let currA = headA;

    while (currA) {
        let currB = headB;
        while (currB) {
            if (currA === currB) {
                return currA;
            }
            currB = currB.next;
        }
        currA = currA.next;
    }

    return null;
};

// 🔧 2. Using Hash Set
// Store nodes from one list in a Set, then check for presence while traversing the other.

// ✅ Time: O(m + n)
// ⚠️ Space: O(m)

var getIntersectionNode = function(headA, headB) {
    const nodesSet = new Set();

    let currentA = headA;
    while (currentA) {
        nodesSet.add(currentA);
        currentA = currentA.next;
    }

    let currentB = headB;
    while (currentB) {
        if (nodesSet.has(currentB)) {
            return currentB;
        }
        currentB = currentB.next;
    }

    return null;
};

// 🔧 3. Two-Pointer Technique (Most Optimal)
// Move two pointers through each list. When one reaches the end, redirect it to the start of the other list.

// When they intersect, both pointers will meet at the same node.

// If not, both become null at the same time.

// ✅ Time: O(m + n)
// ✅ Space: O(1)

var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;

    let a = headA;
    let b = headB;

    while (a !== b) {
        // When reaching end of one list, go to the start of the other
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }

    // If intersect, both point to the node; else both will be null
    return a;
};


// 🔧 4. Length Difference Method
// Calculate lengths of both lists.

// Advance the pointer of the longer list by the difference.

// Then move both pointers until they meet.

// ✅ Time: O(m + n)
// ✅ Space: O(1)

var getIntersectionNode = function(headA, headB) {
    const getLength = (head) => {
        let len = 0;
        while (head) {
            len++;
            head = head.next;
        }
        return len;
    };

    let lenA = getLength(headA);
    let lenB = getLength(headB);

    let diff = Math.abs(lenA - lenB);

    let longList = lenA > lenB ? headA : headB;
    let shortList = lenA > lenB ? headB : headA;

    while (diff > 0) {
        longList = longList.next;
        diff--;
    }

    while (longList && shortList) {
        if (longList === shortList) {
            return longList;
        }
        longList = longList.next;
        shortList = shortList.next;
    }

    return null;
};