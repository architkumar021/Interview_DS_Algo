/*
=============================================================================
  QUESTION: Sort a Stack using Recursion (GFG)
  Like Insertion Sort with recursion. placeAtCorrectPos + sortSt.
  DRY RUN [3,1,2]: pop 2→sort([3,1])→pop 1→sort([3])→pop 3→sort([])→place(3,[])→[3]
    place(1,[3]):3>1→pop 3,place(1,[])→[1],push 3→[1,3]
    place(2,[1,3]):3>2→pop 3,place(2,[1]):1<2→push 2→[1,2],push 3→[1,2,3] ✓
  Time: O(N²), Space: O(N)
=============================================================================
QUESTION:
Given a stack, the task is to sort it such that the top of the stack has the greatest element.

Example 1:
Input:
Stack: 3 2 1
Output: 3 2 1

Example 2:
Input:
Stack: 11 2 32 3 41
Output: 41 32 11 3 2

Approach:
To sort a stack in descending order, we can follow the following steps:
1. Create a helper function called 'placeAtCorrectPos' that takes an element and a stack as parameters.
2. The 'placeAtCorrectPos' function places the given element at the correct position in the stack using recursion.
   - If the stack is empty or the top element of the stack is less than the given element, push the element to the stack and return.
   - Otherwise, pop the top element from the stack and recursively call 'placeAtCorrectPos' with the element and the modified stack.
     After the recursive call, push the popped element back to the stack.
3. Create the main function called 'sortSt' that sorts the stack in descending order using recursion.
   - Base case: If the stack is empty, return.
   - Otherwise, pop the top element from the stack and recursively call 'sortSt' on the modified stack.
     After the recursive call, call the 'placeAtCorrectPos' function with the popped element and the modified stack.
4. The 'sortSt' function will sort the stack in descending order using recursion and the 'placeAtCorrectPos' function.

Time Complexity: O(N^2) (due to multiple recursive calls)
Space Complexity: O(N) (due to the internal stack space used for recursion)

CODE:*/
void placeAtCorrectPos(int ele, stack<int>& st) {
	if (st.empty() || st.top() < ele) {
		st.push(ele);
		return;
	}

	int first = st.top();
	st.pop();
	placeAtCorrectPos(ele, st);
	st.push(first);
}

void sortSt(stack<int>& st) {
	if (st.empty())
		return;

	int first = st.top();
	st.pop();
	sortSt(st);
	placeAtCorrectPos(first, st);
}
