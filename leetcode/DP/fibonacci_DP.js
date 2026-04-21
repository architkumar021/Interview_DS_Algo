function fib_dp (n, mem = {}) {
    if (n in mem) {
        return mem[n];
    }

    if (n <=2) {
        return 1;
    } else {
        mem[n] = fib_dp(n-1, mem) + fib_dp(n-2, mem);
        return mem[n];
    }
}

module.exports = fib_dp;


console.log(fib_dp(6));
console.log(fib_dp(7));
console.log(fib_dp(8));

// Problem Solved
console.log(fib_dp(50));

// Fibonacci Series 
//n = 1, 2, 3, 4, 5, 6, 7, 8
//    1, 1, 2, 3, 5, 8, 13, 21

//                        fib (6)
//            fib(5)                 fib(4)
//        fib(4) fib(3)             fib(3) fib(2)
 

// Time Complexity = O(2*n) = O(n)
// Space Complexity = O(n)
        