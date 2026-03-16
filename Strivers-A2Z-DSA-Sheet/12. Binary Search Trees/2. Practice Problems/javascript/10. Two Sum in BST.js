/*
Question:
Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST
such that their sum is equal to k, or false otherwise.

Explanation:
- We are using two stacks, one for the left traversal and one for the right traversal of the BST.
- The next() function returns the next smallest element in the BST.
- The before() function returns the next largest element in the BST.
- We use the two pointer approach to find the pair of elements whose sum is equal to k.

Time Complexity: O(n)
Space Complexity: O(h)
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class TwoSumBST {
    constructor() {
        this.stl = [];
        this.str = [];
    }

    pushLeft(root) {
        while (root) {
            this.stl.push(root);
            root = root.left;
        }
    }

    pushRight(root) {
        while (root) {
            this.str.push(root);
            root = root.right;
        }
    }

    next() {
        if (this.stl.length === 0) return 1e9;
        const ans = this.stl.pop();
        if (ans.right) {
            this.pushLeft(ans.right);
        }
        return ans.val;
    }

    before() {
        if (this.str.length === 0) return 1e9;
        const ans = this.str.pop();
        if (ans.left) {
            this.pushRight(ans.left);
        }
        return ans.val;
    }

    findTarget(root, k) {
        this.pushLeft(root);
        this.pushRight(root);

        let l = this.next();
        let r = this.before();
        while (l < r) {
            if (l === 1e9 || r === 1e9) return false;
            if (l + r === k) return true;
            else if (l + r < k) l = this.next();
            else r = this.before();
        }

        return false;
    }
}

function findTarget(root, k) {
    const solver = new TwoSumBST();
    return solver.findTarget(root, k);
}
