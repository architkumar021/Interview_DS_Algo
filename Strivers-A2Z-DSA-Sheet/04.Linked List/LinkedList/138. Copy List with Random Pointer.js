// 138. Copy List with Random Pointer

// A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

// Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

// For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

// Return the head of the copied linked list.

// The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

// val: an integer representing Node.val
// random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
// Your code will only be given the head of the original linked list.

 

// Example 1:


// Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Example 2:


// Input: head = [[1,1],[2,1]]
// Output: [[1,1],[2,1]]
// Example 3:



// Input: head = [[3,null],[3,0],[3,null]]
// Output: [[3,null],[3,0],[3,null]]
 

// Constraints:

// 0 <= n <= 1000
// -104 <= Node.val <= 104
// Node.random is null or is pointing to some node in the linked list.


                            
// Node class to represent
// elements in the linked list
class Node {
    // Data stored in the node
    constructor(data) {
        this.data = data;
        // Pointer to the next node
        this.next = null;
        // Pointer to a random node in the list
        this.random = null;
    }
}

// Function to clone the linked list
function cloneLL(head) {
    let temp = head;
    // Create a map to map original nodes
    // to their corresponding copied nodes
    let mpp = new Map();

    // Step 1: Create copies of each
    // node and store them in the map
    while (temp !== null) {
        // Create a new node with the
        // same data as the original node
        let newNode = new Node(temp.data);
        // Map the original node to its
        // corresponding copied node in the map
        mpp.set(temp, newNode);
        // Move to the next node in the original list
        temp = temp.next;
    }

    temp = head;
    // Step 2: Connect the next and random
    // pointers of the copied nodes using the map
    while (temp !== null) {
        // Access the copied node corresponding
        // to the current original node
        let copyNode = mpp.get(temp);
        // Set the next pointer of the copied node
        // to the copied node mapped to the next
        // node in the original list
        copyNode.next = mpp.get(temp.next);
        // Set the random pointer of the copied node
        // to the copied node mapped to the random
        // node in the original list
        copyNode.random = mpp.get(temp.random);
        // Move to the next node in the original list
        temp = temp.next;
    }

    // Return the head of the
    // deep copied list from the map
    return mpp.get(head);
}

// Function to print the cloned linked list
function printClonedLinkedList(head) {
    while (head !== null) {
        console.log(`Data: ${head.data}` + (head.random !== null ? `,
                        Random: ${head.random.data}` : `, Random: null`));
        // Move to the next node in the list
        head = head.next;
    }
}

// Main function
function main() {
    // Example linked list: 7 -> 14 -> 21 -> 28
    let head = new Node(7);
    head.next = new Node(14);
    head.next.next = new Node(21);
    head.next.next.next = new Node(28);

    // Assigning random pointers
    head.random = head.next.next;
    head.next.random = head;
    head.next.next.random = head.next.next.next;
    head.next.next.next.random = head.next;

    console.log("Original Linked List with Random Pointers:");
    printClonedLinkedList(head);

    // Clone the linked list
    let clonedList = cloneLL(head);

    console.log("\nCloned Linked List with Random Pointers:");
    printClonedLinkedList(clonedList);
}

// Calling the main function to execute the code
main();


// Optimal Approach

                            
 // Node class to represent
// elements in the linked list
class Node {
    // Data stored in the node
    constructor(x, nextNode = null, randomNode = null) {
        this.data = x;
        // Pointer to the next node
        this.next = nextNode;
        // Pointer to a random
        // node in the list
        this.random = randomNode;
    }
}

// Function to insert a copy of each
// node in between the original nodes
function insertCopyInBetween(head) {
    let temp = head;
    while (temp !== null) {
        let nextElement = temp.next;
        // Create a new node with the same data
        let copy = new Node(temp.data);

        // Point the copy's next to
        // the original node's next
        copy.next = nextElement;

        // Point the original
        // node's next to the copy
        temp.next = copy;

        // Move to the next original node
        temp = nextElement;
    }
}

// Function to connect random
// pointers of the copied nodes
function connectRandomPointers(head) {
    let temp = head;
    while (temp !== null) {
        // Access the copied node
        let copyNode = temp.next;

        // If the original node
        // has a random pointer
        if (temp.random) {
            // Point the copied node's random to the
            // corresponding copied random node
            copyNode.random = temp.random.next;
        } else {
            // Set the copied node's random to
            // null if the original random is null
            copyNode.random = null;
        }

        // Move to the next original node
        temp = temp.next.next;
    }
}

// Function to retrieve the
// deep copy of the linked list
function getDeepCopyList(head) {
    let temp = head;
    // Create a dummy node
    let dummyNode = new Node(-1);
    // Initialize a result pointer
    let res = dummyNode;

    while (temp !== null) {
        // Creating a new List by
        // pointing to copied nodes
        res.next = temp.next;
        res = res.next;

        // Disconnect and revert back to the
        // initial state of the original linked list
        temp.next = temp.next.next;
        temp = temp.next;
    }

    // Return the deep copy of the
    // list starting from the dummy node
    return dummyNode.next;
}

// Function to clone the linked list
function cloneLL(head) {
    // If the original list
    // is empty, return null
    if (!head) return null;

    // Step 1: Insert copy of
    // nodes in between
    insertCopyInBetween(head);
    // Step 2: Connect random
    // pointers of copied nodes
    connectRandomPointers(head);
    // Step 3: Retrieve the deep
    // copy of the linked list
    return getDeepCopyList(head);
}

// Function to print the cloned linked list
function printClonedLinkedList(head) {
    while (head !== null) {
        console.log(`Data: ${head.data}${head.random ? `, Random: ${head.random.data}` : ', Random: nullptr'}`);
        // Move to the next node
        head = head.next;
    }
}

// Main function
function main() {
    // Example linked list: 7 -> 14 -> 21 -> 28
    let head = new Node(7);
    head.next = new Node(14);
    head.next.next = new Node(21);
    head.next.next.next = new Node(28);

    // Assigning random pointers
    head.random = head.next.next;
    head.next.random = head;
    head.next.next.random = head.next.next.next;
    head.next.next.next.random = head.next;

    console.log("Original Linked List with Random Pointers:");
    printClonedLinkedList(head);

    // Clone the linked list
    let clonedList = cloneLL(head);

    console.log("\nCloned Linked List with Random Pointers:");
    printClonedLinkedList(clonedList);
}

main();

                            
                        
                        


/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;
    let curr = head;
    while (curr) {
        let copy = new Node(curr.val, curr.next, null);
        copy.next = curr.next;
        curr.next = copy;
        curr = curr.next;
        curr = curr.next;
    }
    
    curr = head;
    while(curr) {
        curr.next.random = curr.random ? curr.random.next : null;
        curr = curr.next.next;
    }
    
    curr = head;
    let result = head.next;
    let resPtr = result;
    while(curr) {
        curr.next = curr.next.next;
        curr = curr.next;
        resPtr.next = resPtr.next ? resPtr.next.next : null;
        resPtr = resPtr.next;
    }
    
    return result;
};