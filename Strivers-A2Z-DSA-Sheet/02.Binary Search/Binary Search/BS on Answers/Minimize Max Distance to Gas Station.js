// Minimize Max Distance to Gas Station

// We have a horizontal number line. On that number line,
// we have gas stations at positions stations[0], stations[1], ..., stations[n-1], where n is the size of the stations array.
// Now, we add k more gas stations so that d, the maximum distance between adjacent gas stations, is minimized.
// We have to find the smallest possible value of d. Find the answer exactly to 2 decimal places.
// Note: stations is in a strictly increasing order.

// Example 1:

// Input:
// n = 10
// stations[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// k = 9
// Output: 0.50
// Explanation: Each of the 9 stations can be added mid way between all the existing adjacent stations.

class Solution {
    /**
    * @param number[] stations
    * @param number k

    * @returns float
    */
    findSmallestMaxDist(stations, k) {
        // code here
        let n = stations.length;
        
        function requiredStations(d) {
            let count = 0;
            for (let i = 1; i < n; i++) {
                let distance = stations[i] - stations[i - 1];
                count += Math.floor(distance / d);
            }
            return count;
        }
        
        let low = 0;
        let high = stations[n - 1] - stations[0];
        
        let precision = 1e-6;
        
        while(high - low > precision) {
            let mid = (low + high) / 2;
            if (requiredStations(mid) > k) {
                low = mid;
            } else {
                high = mid;
            }
        }
        return Math.round(high * 100) / 100;
    }
}





function numberOfGasStationsRequired(dist, arr) {
    const n = arr.length; // size of the array
    let cnt = 0;
    for (let i = 1; i < n; i++) {
        const numberInBetween = Math.floor((arr[i] - arr[i - 1]) / dist);
        if ((arr[i] - arr[i - 1]) === dist * numberInBetween) {
            cnt += numberInBetween - 1;
        } else {
            cnt += numberInBetween;
        }
    }
    return cnt;
}

function minimiseMaxDistance(arr, k) {
    const n = arr.length; // size of the array
    let low = 0;
    let high = 0;

    // Find the maximum distance:
    for (let i = 0; i < n - 1; i++) {
        high = Math.max(high, arr[i + 1] - arr[i]);
    }

    // Apply Binary search:
    const diff = 1e-6;
    while (high - low > diff) {
        const mid = (low + high) / 2.0;
        const cnt = numberOfGasStationsRequired(mid, arr);
        if (cnt > k) {
            low = mid;
        } else {
            high = mid;
        }
    }
    return high;
}

const arr = [1, 2, 3, 4, 5];
const k = 4;
const ans = minimiseMaxDistance(arr, k);
console.log("The answer is:", ans);

