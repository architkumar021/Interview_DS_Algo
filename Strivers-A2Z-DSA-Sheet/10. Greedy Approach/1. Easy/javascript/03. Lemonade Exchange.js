/*
QUESTION:
At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills).
Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.
Note that you do not have any change in hand at first.
Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.

Example:
Input: bills = [5, 5, 5, 10, 20]
Output: true
Explanation:
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.

APPROACH:
- Maintain two counters: `fiveCount` for $5 bills and `tenCount` for $10 bills.
- For $5 bill: Just collect it (no change needed).
- For $10 bill: Give back $5 as change.
- For $20 bill: Prefer giving back $10 + $5 (greedy - save $5 bills as they're more flexible).
  If no $10, give back three $5 bills.
- If at any point we can't give change, return false.

COMPLEXITY ANALYSIS:
- Time Complexity: O(N) - Single pass through the bills array.
- Space Complexity: O(1) - Only using constant extra space.
*/

/**
 * @param {number[]} bills
 * @return {boolean}
 */
function lemonadeChange(bills) {
    let fiveCount = 0;
    let tenCount = 0;

    for (const bill of bills) {
        if (bill === 5) {
            // No change needed, just collect
            fiveCount++;
        } else if (bill === 10) {
            // Need to give $5 change
            if (fiveCount === 0) {
                return false;
            }
            fiveCount--;
            tenCount++;
        } else {
            // bill === 20, need to give $15 change
            // Prefer $10 + $5 (greedy: save $5 bills)
            if (tenCount > 0 && fiveCount > 0) {
                tenCount--;
                fiveCount--;
            } else if (fiveCount >= 3) {
                // Give three $5 bills
                fiveCount -= 3;
            } else {
                return false;
            }
        }
    }

    return true;
}

// Example usage:
// console.log(lemonadeChange([5, 5, 5, 10, 20])); // Output: true
// console.log(lemonadeChange([5, 5, 10, 10, 20])); // Output: false

