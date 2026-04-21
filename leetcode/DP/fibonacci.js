function fib (n) {
    let FibSum = 1;

    if (n <=2) {
        return FibSum;
    } else {
        FibSum = fib(n-1) + fib(n-2);
        return FibSum;
    }
}

module.exports = fib;


console.log(fib(6));
console.log(fib(7));
console.log(fib(8));

// Problem is here due to time complexity
//console.log(fib(1000));

// Fibonacci Series 
//n = 1, 2, 3, 4, 5, 6, 7, 8
//    1, 1, 2, 3, 5, 8, 13, 21

//                        fib (6)
//            fib(5)                 fib(4)
//        fib(4) fib(3)             fib(3) fib(2)
 

// Time Complexity = O(2^n)
// Space Complexity = O(n)
        