// =============================================================================
//                     LINKED LIST — COMPLETE INTRODUCTION
// =============================================================================

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHAT IS A LINKED LIST?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  A Linked List is a LINEAR data structure where elements (called NODES) are
  stored at NON-CONTIGUOUS memory locations and connected via POINTERS.

  Unlike arrays where elements sit in adjacent memory cells, each node in a
  linked list stores:
    1. DATA    — the actual value
    2. POINTER — address/reference of the next node in the sequence

  Visual representation:

    Head
     │
     ▼
  ┌──────┬──────┐    ┌──────┬──────┐    ┌──────┬──────┐    ┌──────┬──────┐
  │  10  │  ●───┼───►│  20  │  ●───┼───►│  30  │  ●───┼───►│  40  │ null │
  └──────┴──────┘    └──────┴──────┘    └──────┴──────┘    └──────┴──────┘
   Node 1              Node 2              Node 3              Node 4 (tail)

  Each box = one Node { data, next }
  ●   = pointer (memory reference to next node)
  null = end of the list (tail node's next is null)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHY LINKED LIST? — ARRAY vs LINKED LIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ARRAYS:
  ┌────┬────┬────┬────┬────┐
  │ 10 │ 20 │ 30 │ 40 │ 50 │   ← contiguous memory, fixed size
  └────┴────┴────┴────┴────┘
   [0]  [1]  [2]  [3]  [4]

  ✅ Random access O(1) via index
  ✅ Cache-friendly (contiguous memory)
  ❌ Fixed size — must declare size upfront (static arrays)
  ❌ Insertion/Deletion at middle = O(N) shifting required
  ❌ Wasteful if size unknown — may over/under-allocate

  LINKED LIST:
  [10]→[20]→[30]→[40]→[50]→null   ← scattered memory, dynamic size

  ✅ Dynamic size — grows/shrinks at runtime
  ✅ Insertion/Deletion at head = O(1) — just pointer update
  ✅ No memory wastage — allocate only when needed
  ❌ No random access — must traverse O(N) to reach index i
  ❌ Extra memory overhead for the pointer in each node
  ❌ Not cache-friendly (non-contiguous memory)

  ┌────────────────────┬───────────────────┬───────────────────┐
  │     Operation      │      Array        │   Linked List     │
  ├────────────────────┼───────────────────┼───────────────────┤
  │ Access by index    │     O(1)  ✅      │     O(N)  ❌      │
  │ Search             │     O(N)          │     O(N)          │
  │ Insert at head     │     O(N)  ❌      │     O(1)  ✅      │
  │ Insert at tail     │     O(1)* ✅      │     O(N) / O(1)** │
  │ Insert at middle   │     O(N)  ❌      │     O(N)          │
  │ Delete at head     │     O(N)  ❌      │     O(1)  ✅      │
  │ Delete at middle   │     O(N)  ❌      │     O(N)          │
  │ Memory layout      │  Contiguous ✅    │  Scattered ❌     │
  └────────────────────┴───────────────────┴───────────────────┘
  * amortised for dynamic array   ** O(1) if tail pointer is maintained

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MEMORY REPRESENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  When you create a linked list, each Node is an object allocated on the HEAP.
  The variable `head` holds the memory address of the FIRST node.

  Example — new Node(10) might live at address 0x100:

    head  →  0x100

    0x100 : { data: 10, next: 0x200 }
    0x200 : { data: 20, next: 0x350 }
    0x350 : { data: 30, next: null  }

  The nodes are NOT adjacent in memory. The `next` pointer acts as a
  "bridge" connecting each node to the next, wherever it lives in RAM.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TYPES OF LINKED LISTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. SINGLY LINKED LIST
     Each node has: data + next pointer only.
     Traversal: forward only (head → tail).

       [1] → [2] → [3] → [4] → null

  2. DOUBLY LINKED LIST
     Each node has: prev pointer + data + next pointer.
     Traversal: both forward AND backward.

       null ← [1] ⇄ [2] ⇄ [3] ⇄ [4] → null

  3. CIRCULAR SINGLY LINKED LIST
     Last node's next points back to head (no null tail).

       [1] → [2] → [3] → [4]
        ▲________________________│

  4. CIRCULAR DOUBLY LINKED LIST
     Both ends connected: head.prev = tail, tail.next = head.

       ┌─────────────────────────────┐
       └→ [1] ⇄ [2] ⇄ [3] ⇄ [4] ←┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  KEY TERMINOLOGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Head      — Reference to the FIRST node. Entry point of the list.
              If head === null → the list is empty.
  Tail      — The LAST node. Its next === null (in singly LL).
  Node      — Basic unit: { data, next } for singly LL.
              { prev, data, next } for DLL.
  next      — Pointer/reference to the SUCCESSOR node.
  prev      — Pointer/reference to the PREDECESSOR node (DLL only).
  Traversal — Walking through nodes via next pointer from head → null.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CORE OPERATIONS & COMPLEXITIES (Singly Linked List)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──────────────────────────────┬──────────┬──────────┐
  │          Operation           │  Time    │  Space   │
  ├──────────────────────────────┼──────────┼──────────┤
  │ Construct from array         │  O(N)    │  O(N)    │
  │ Traverse / Print             │  O(N)    │  O(1)    │
  │ Search for a value           │  O(N)    │  O(1)    │
  │ Insert at head               │  O(1)    │  O(1)    │
  │ Insert at tail               │  O(N)    │  O(1)    │
  │ Insert at position k         │  O(k)    │  O(1)    │
  │ Delete head                  │  O(1)    │  O(1)    │
  │ Delete tail                  │  O(N)    │  O(1)    │
  │ Delete at position k         │  O(k)    │  O(1)    │
  │ Get length (count nodes)     │  O(N)    │  O(1)    │
  └──────────────────────────────┴──────────┴──────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHEN TO USE LINKED LIST?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Use Linked List when:
     - Frequent insertions/deletions at head or middle of the list.
     - Size of data is unknown or changes dynamically at runtime.
     - You don't need random access by index.
     - Implementing stacks, queues, or adjacency lists for graphs.

  ❌ Avoid Linked List when:
     - You need fast random access by index (use array instead).
     - Memory is very constrained (each node carries pointer overhead).
     - Cache performance is critical (arrays have better locality).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  REAL-WORLD APPLICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  - Browser history navigation (back/forward)     → Doubly Linked List
  - Music / video playlist (next/previous track)  → Doubly Linked List
  - Undo / Redo in text editors                   → Doubly Linked List
  - Implementing Stack and Queue                  → Singly Linked List
  - Hash table chaining (collision resolution)    → Singly Linked List
  - OS process scheduling (round-robin)           → Circular Linked List
  - Image viewer (cycle through images)           → Circular Linked List

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NODE STRUCTURE — The Building Block
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  A Node is the fundamental unit of a linked list.
  For a Singly Linked List, each node stores:
    - data : the value held by this node
    - next : reference to the next node, or null if it is the last node

  In JavaScript, a Node is a class/object:

    ┌──────────┬──────────┐
    │   data   │   next   │
    │  (value) │ (ref/ptr)│
    └──────────┴──────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

// =============================================================================
//  QUESTION:
//  Construct a linked list from an array and return the head of the linked list.
// =============================================================================

/*
QUESTION:
Construct a linked list from an array and return the head of the linked list.

Example 1:
  Input:  arr = [1, 2, 3, 4, 5]
  Output: 1 -> 2 -> 3 -> 4 -> 5

Example 2:
  Input:  arr = [2, 4]
  Output: 2 -> 4

APPROACH:
1. Create the head node from the first element of the array.
2. Use a `curr` pointer starting at head.
3. For each remaining element, create a new node and attach it via curr.next.
4. Advance curr to the new node.
5. Return head.

Time Complexity:  O(N)
Space Complexity: O(N)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function constructLL(arr) {
    if (arr.length === 0) return null;
    const head = new Node(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new Node(arr[i]);
        curr = curr.next;
    }
    return head;
}

// Helper: print linked list
function printLL(head) {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(curr.data);
        curr = curr.next;
    }
    console.log(result.join(' -> '));
}

// Driver code
const head = constructLL([1, 2, 3, 4, 5]);
printLL(head); // 1 -> 2 -> 3 -> 4 -> 5

