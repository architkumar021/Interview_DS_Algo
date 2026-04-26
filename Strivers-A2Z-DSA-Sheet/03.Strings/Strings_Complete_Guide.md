# 🔤 Strings — Complete Introduction Guide

> A comprehensive quick-reference guide covering everything about Strings: terminology, operations, key algorithms, patterns, tricks, and when to use what.

---

## 📚 Table of Contents

1. [What is a String?](#1-what-is-a-string)
2. [String Terminology](#2-string-terminology)
3. [String Representation in Memory](#3-string-representation-in-memory)
4. [Basic String Operations](#4-basic-string-operations)
5. [String Comparison & Matching](#5-string-comparison--matching)
   - [Character-by-Character](#51-character-by-character)
   - [Hashing](#52-hashing)
   - [KMP Algorithm](#53-kmp-algorithm)
   - [Rabin-Karp Algorithm](#54-rabin-karp-algorithm)
6. [Common String Techniques](#6-common-string-techniques)
   - [Two Pointers](#61-two-pointers)
   - [Sliding Window](#62-sliding-window)
   - [Frequency Counting](#63-frequency-counting)
   - [Stack-Based](#64-stack-based)
   - [Expand Around Center](#65-expand-around-center)
7. [Palindromes](#7-palindromes)
8. [Anagrams](#8-anagrams)
9. [String Rotation](#9-string-rotation)
10. [String Compression & Encoding](#10-string-compression--encoding)
11. [Subsequences vs Substrings](#11-subsequences-vs-substrings)
12. [Key Patterns & Tricks for Interviews](#12-key-patterns--tricks-for-interviews)
13. [Common Mistakes](#13-common-mistakes)
14. [Complexity Cheat Sheet](#14-complexity-cheat-sheet)
15. [Interview Cheat Sheet](#15-interview-cheat-sheet)
16. [Problem Map — All Covered Problems](#16-problem-map--all-covered-problems)

---

## 1. What is a String?

A **String** is a sequence of characters. It is one of the most commonly used data types in programming and interviews.

```
"hello" → ['h', 'e', 'l', 'l', 'o']
```

Formally: A string `S` of length `n` is an ordered sequence `S[0], S[1], ..., S[n-1]` where each `S[i]` is a character from an alphabet (typically ASCII or Unicode).

> 🔑 **Strings are essentially arrays of characters** with specialized operations. Most string problems are variations of array problems with character-specific tricks.

---

## 2. String Terminology

| Term | Meaning | Example (`s = "abcde"`) |
|------|---------|-------------------------|
| **Character** | A single element of a string | `'a'`, `'b'` |
| **Length** | Number of characters | `len("abcde") = 5` |
| **Substring** | Contiguous sequence of characters | `"bcd"`, `"ab"` |
| **Subsequence** | Characters in order, not necessarily contiguous | `"ace"`, `"bd"` |
| **Prefix** | Substring starting from index 0 | `"a"`, `"ab"`, `"abc"` |
| **Suffix** | Substring ending at last index | `"e"`, `"de"`, `"cde"` |
| **Palindrome** | Reads the same forward and backward | `"aba"`, `"racecar"` |
| **Anagram** | Rearrangement of characters | `"listen"` ↔ `"silent"` |
| **Lexicographic Order** | Dictionary order | `"abc" < "abd" < "b"` |
| **Empty String** | String with length 0 | `""` |
| **Rotation** | Cyclic shift of characters | `"cdeab"` is rotation of `"abcde"` |

### Key Properties

```
Number of substrings of length n string = n*(n+1)/2 + 1 (including empty string)
Number of subsequences = 2^n (each character included or excluded)
Number of permutations = n! (for distinct characters)
```

---

## 3. String Representation in Memory

| Language | Mutability | Representation |
|----------|------------|----------------|
| **C/C++** | Mutable (char array) | Null-terminated `char[]`, or `std::string` |
| **Java** | Immutable | `String` (immutable), `StringBuilder` (mutable) |
| **Python** | Immutable | `str` (immutable), use `list` for mutable |
| **JavaScript** | Immutable | `string` (immutable), use array for mutable |

> 🔑 **Immutability matters!** In Python/Java/JS, string concatenation in a loop creates a new string each time → O(N²). Use `StringBuilder` (Java), `list + join` (Python), or `array + join` (JS) for O(N).

```python
# BAD — O(N²) in Python
s = ""
for c in chars:
    s += c  # Creates new string each time!

# GOOD — O(N) in Python
parts = []
for c in chars:
    parts.append(c)
s = ''.join(parts)
```

```javascript
// BAD — O(N²) potentially in JavaScript
let s = "";
for (let c of chars) {
    s += c;
}

// GOOD — O(N) in JavaScript
let parts = [];
for (let c of chars) {
    parts.push(c);
}
let s = parts.join('');
```

---

## 4. Basic String Operations

### Accessing Characters
```javascript
let s = "hello";
s[0];           // 'h'
s[s.length-1];  // 'o'
s.charAt(2);    // 'l'
s.charCodeAt(0); // 104 (ASCII value)
```

```python
s = "hello"
s[0]       # 'h'
s[-1]      # 'o'
ord('a')   # 97
chr(97)    # 'a'
```

### Common Operations Complexity

| Operation | C++ `string` | Python `str` | JS `string` |
|-----------|-------------|-------------|-------------|
| Access `s[i]` | O(1) | O(1) | O(1) |
| Length | O(1) | O(1) | O(1) |
| Concatenation | O(N) | O(N) | O(N) |
| Substring | O(K) | O(K) | O(K) |
| Find/Search | O(N*M) | O(N*M) | O(N*M) |
| Compare | O(N) | O(N) | O(N) |
| Sort | O(N log N) | O(N log N) | O(N log N) |
| Reverse | O(N) | O(N) | O(N) |

---

## 5. String Comparison & Matching

### 5.1 Character-by-Character

The simplest pattern matching: check every position in the text.

```javascript
function bruteForceSearch(text, pattern) {
    let n = text.length, m = pattern.length;
    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}
```

**Time:** O(N × M) worst case | **Space:** O(1)

---

### 5.2 Hashing

Use character frequency arrays or hash maps to compare strings without sorting.

```javascript
// Check if two strings have same character frequencies
function sameFrequency(s, t) {
    if (s.length !== t.length) return false;
    let freq = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - 97]++;
        freq[t.charCodeAt(i) - 97]--;
    }
    return freq.every(v => v === 0);
}
```

**Time:** O(N) | **Space:** O(1) (fixed 26 array for lowercase)

---

### 5.3 KMP Algorithm

**Knuth-Morris-Pratt** — efficient pattern matching using a **failure function (LPS array)** to avoid re-scanning matched characters.

```
LPS[i] = length of longest proper prefix of pattern[0..i] 
         which is also a suffix of pattern[0..i]

Pattern: "ABCABD"
LPS:     [0, 0, 0, 1, 2, 0]

When mismatch at pattern[j], jump to pattern[LPS[j-1]] instead of restarting.
```

```javascript
function buildLPS(pattern) {
    let m = pattern.length;
    let lps = new Array(m).fill(0);
    let len = 0, i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpSearch(text, pattern) {
    let n = text.length, m = pattern.length;
    let lps = buildLPS(pattern);
    let i = 0, j = 0;

    while (i < n) {
        if (text[i] === pattern[j]) {
            i++; j++;
        }
        if (j === m) {
            return i - j;  // pattern found at index i-j
        } else if (i < n && text[i] !== pattern[j]) {
            if (j !== 0) j = lps[j - 1];
            else i++;
        }
    }
    return -1;
}
```

```python
def build_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    lps = build_lps(pattern)
    i = j = 0

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
        if j == m:
            return i - j
        elif i < n and text[i] != pattern[j]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return -1
```

**Time:** O(N + M) | **Space:** O(M) for LPS array

> 🔑 **When to use KMP:** When you need O(N) pattern matching instead of O(N×M) brute force. Useful in rotation checks, repeated pattern detection, etc.

---

### 5.4 Rabin-Karp Algorithm

Uses **rolling hash** to compare substrings in O(1) average time.

```
Hash("abc") = a×p² + b×p¹ + c×p⁰  (where p = prime base)

Rolling hash: when window slides right by 1,
  new_hash = (old_hash - s[left] × p^(m-1)) × p + s[right]
```

**Time:** O(N + M) average, O(N × M) worst case | **Space:** O(1)

> 🔑 **When to use Rabin-Karp:** Multiple pattern search, plagiarism detection, or when you need to compare many substrings quickly.

---

## 6. Common String Techniques

### 6.1 Two Pointers

Used for: palindrome check, reversing, comparing from both ends.

```javascript
// Palindrome check
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Reverse vowels
function reverseVowels(s) {
    let arr = s.split('');
    let vowels = new Set('aeiouAEIOU');
    let l = 0, r = arr.length - 1;
    while (l < r) {
        while (l < r && !vowels.has(arr[l])) l++;
        while (l < r && !vowels.has(arr[r])) r--;
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++; r--;
    }
    return arr.join('');
}
```

```python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
```

**Time:** O(N) | **Space:** O(1)

---

### 6.2 Sliding Window

Used for: substrings with specific properties (k distinct chars, max frequency, etc.)

```
Fixed-size window:    |--k--|
                      slide →

Variable-size window: |---?---|
                      expand right, shrink left based on condition
```

```javascript
// Count substrings with exactly K distinct characters
// exactlyK = atMostK(k) - atMostK(k-1)
function atMostK(s, k) {
    let freq = {}, distinct = 0, left = 0, count = 0;
    for (let right = 0; right < s.length; right++) {
        if (!freq[s[right]]) { freq[s[right]] = 0; distinct++; }
        freq[s[right]]++;

        while (distinct > k) {
            freq[s[left]]--;
            if (freq[s[left]] === 0) { delete freq[s[left]]; distinct--; }
            left++;
        }
        count += right - left + 1;  // All substrings ending at 'right'
    }
    return count;
}
```

```python
def at_most_k(s, k):
    freq = {}
    left = count = 0
    for right in range(len(s)):
        freq[s[right]] = freq.get(s[right], 0) + 1
        while len(freq) > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                del freq[s[left]]
            left += 1
        count += right - left + 1
    return count
```

> 🔑 **"Exactly K" = "At most K" - "At most K-1"** — This trick converts a hard exact-count problem into two easy at-most problems.

**Time:** O(N) | **Space:** O(K)

---

### 6.3 Frequency Counting

Used for: anagrams, character frequency problems, "beauty" of strings.

```javascript
// Frequency array for lowercase letters
let freq = new Array(26).fill(0);
for (let c of s) {
    freq[c.charCodeAt(0) - 97]++;
}

// Using Map (for any characters)
let map = new Map();
for (let c of s) {
    map.set(c, (map.get(c) || 0) + 1);
}
```

```python
# Counter (Python)
from collections import Counter
freq = Counter(s)

# Manual array
freq = [0] * 26
for c in s:
    freq[ord(c) - ord('a')] += 1
```

> 🔑 **26-size array vs HashMap:** For lowercase-only strings, a fixed array of size 26 is faster (O(1) access, no hashing overhead). Use HashMap when the character set is large or unknown.

---

### 6.4 Stack-Based

Used for: parentheses matching, decode strings, remove duplicates, nested structures.

```javascript
// Remove outer parentheses
function removeOuterParentheses(s) {
    let res = "", opened = 0;
    for (let c of s) {
        if (c === '(') {
            if (opened > 0) res += c;
            opened++;
        } else {
            opened--;
            if (opened > 0) res += c;
        }
    }
    return res;
}

// Decode String: "3[a2[c]]" → "accaccacc"
function decodeString(s) {
    let stack = [];
    let currStr = "", currNum = 0;
    for (let c of s) {
        if (c >= '0' && c <= '9') {
            currNum = currNum * 10 + parseInt(c);
        } else if (c === '[') {
            stack.push([currStr, currNum]);
            currStr = "";
            currNum = 0;
        } else if (c === ']') {
            let [prevStr, num] = stack.pop();
            currStr = prevStr + currStr.repeat(num);
        } else {
            currStr += c;
        }
    }
    return currStr;
}
```

**Time:** O(N) | **Space:** O(N)

---

### 6.5 Expand Around Center

Used for: finding palindromic substrings.

```javascript
// Longest palindromic substring
function longestPalindrome(s) {
    let start = 0, maxLen = 0;

    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > maxLen) {
                maxLen = r - l + 1;
                start = l;
            }
            l--; r++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expand(i, i);       // Odd length palindromes
        expand(i, i + 1);   // Even length palindromes
    }

    return s.substring(start, start + maxLen);
}
```

```python
def longest_palindrome(s):
    start = max_len = 0

    def expand(l, r):
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > max_len:
                max_len = r - l + 1
                start = l
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)       # Odd
        expand(i, i + 1)   # Even

    return s[start:start + max_len]
```

**Time:** O(N²) | **Space:** O(1)

> 🔑 **Why expand from center?** There are 2N-1 possible centers (N for odd-length, N-1 for even-length). Expanding from each center is O(N) worst case. Total: O(N²) — much better than O(N³) brute force.

---

## 7. Palindromes

### Key Properties
- A single character is always a palindrome
- An empty string is a palindrome
- `s` is palindrome ⟺ `s == reverse(s)`
- `s` is palindrome ⟺ `s[0] == s[n-1]` AND `s[1..n-2]` is palindrome

### Detection Methods

| Method | Time | Space | When to Use |
|--------|------|-------|-------------|
| Two pointers | O(N) | O(1) | Check if string is palindrome |
| Expand around center | O(N²) | O(1) | Find all palindromic substrings |
| DP table | O(N²) | O(N²) | Precompute all palindromic substrings |
| Manacher's Algorithm | O(N) | O(N) | Find longest palindrome in linear time |

### Common Palindrome Problems
- Check if palindrome → Two pointers
- Longest palindromic substring → Expand around center
- Count palindromic substrings → Expand around center or DP
- Minimum insertions to make palindrome → DP (LCS variant)
- Palindrome partitioning → Backtracking + DP

---

## 8. Anagrams

Two strings are anagrams if they have the **same character frequencies**.

### Detection Methods

| Method | Time | Space |
|--------|------|-------|
| Sort both, compare | O(N log N) | O(N) |
| Frequency array | O(N) | O(1) |
| Prime number product | O(N) | O(1) |

```javascript
// Optimal: Frequency count
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    let freq = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - 97]++;
        freq[t.charCodeAt(i) - 97]--;
    }
    return freq.every(v => v === 0);
}
```

> 🔑 **Anagram pattern in sliding window:** To find all anagram occurrences of `p` in `s`, slide a window of size `|p|` across `s` and compare frequency arrays.

---

## 9. String Rotation

String `B` is a rotation of string `A` if `B` can be obtained by moving some prefix of `A` to the end.

```
A = "abcde"
Rotations: "abcde", "bcdea", "cdeab", "deabc", "eabcd"
```

### Key Insight

> 🔑 **`B` is a rotation of `A` ⟺ `B` is a substring of `A + A`** (assuming `|A| == |B|`)

```javascript
function isRotation(a, b) {
    return a.length === b.length && (a + a).includes(b);
}
```

**Time:** O(N) | **Space:** O(N)

---

## 10. String Compression & Encoding

### Run-Length Encoding
```
"aaabbc" → "a3b2c1" or "3a2b1c"
```

```javascript
function compress(chars) {
    let write = 0, read = 0;
    while (read < chars.length) {
        let c = chars[read], count = 0;
        while (read < chars.length && chars[read] === c) {
            read++;
            count++;
        }
        chars[write++] = c;
        if (count > 1) {
            for (let d of String(count)) {
                chars[write++] = d;
            }
        }
    }
    return write;
}
```

### Number to String Conversions
- **Roman to Integer:** Map values, subtract when smaller precedes larger
- **Integer to Roman:** Greedy from largest to smallest
- **String to Integer (atoi):** Handle whitespace → sign → digits → overflow

---

## 11. Subsequences vs Substrings

| Property | Substring | Subsequence |
|----------|-----------|-------------|
| **Contiguous?** | ✅ Yes | ❌ No |
| **Order preserved?** | ✅ Yes | ✅ Yes |
| **Count for string of length n** | n(n+1)/2 | 2^n - 1 |
| **Finding LCS** | Suffix array / DP | DP O(N×M) |
| **Example from "abcde"** | "bcd" | "ace" |

### Longest Common Subsequence (LCS)

```javascript
function lcs(s1, s2) {
    let m = s1.length, n = s2.length;
    let dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}
```

**Time:** O(N × M) | **Space:** O(N × M) (optimizable to O(min(N, M)))

---

## 12. Key Patterns & Tricks for Interviews

### Pattern 1 — Frequency Array for Lowercase
When the string contains only lowercase English letters, use `int[26]` instead of a HashMap.
```javascript
let freq = new Array(26).fill(0);
freq[s.charCodeAt(i) - 97]++;
```

### Pattern 2 — "Exactly K" = "At Most K" - "At Most K-1"
Solves counting problems with exact constraints using sliding window.
**Examples:** Substrings with exactly K distinct characters

### Pattern 3 — Concatenation Trick for Rotation
`B is rotation of A ⟺ B is substring of A+A`
**Examples:** Rotate String

### Pattern 4 — Reverse Words: Right-to-Left Traversal
Instead of splitting, traverse from the end, picking words.
**Examples:** Reverse Words in a String

### Pattern 5 — Expand Around Center for Palindromes
2N-1 centers, expand outward. Handles both odd and even length.
**Examples:** Longest Palindromic Substring, Count Palindromic Substrings

### Pattern 6 — Stack for Nested/Matching Problems
Whenever you see parentheses, brackets, or nested encoding → think Stack.
**Examples:** Valid Parentheses, Decode String, Remove Outer Parentheses

### Pattern 7 — Sort + Compare First/Last for Prefix
After sorting, the most different strings are at positions 0 and n-1.
**Examples:** Longest Common Prefix

### Pattern 8 — Two-Map Bijection for Isomorphism
Use two maps (s→t and t→s) to ensure one-to-one mapping.
**Examples:** Isomorphic Strings, Word Pattern

### Pattern 9 — Right-to-Left Scan for Last Property
When the answer depends on the rightmost occurrence of something.
**Examples:** Largest Odd Number in String

### Pattern 10 — Priority Queue / Bucket Sort for Frequency Ordering
Sort characters by frequency using max-heap or bucket sort.
**Examples:** Sort Characters by Frequency, Reorganize String

---

## 13. Common Mistakes

### ❌ String concatenation in a loop (Immutable languages)
```python
# WRONG — O(N²) in Python
s = ""
for c in chars:
    s += c

# CORRECT — O(N)
s = ''.join(chars)
```

### ❌ Off-by-one errors in substring operations
```javascript
// s.substring(start, end) — end is EXCLUSIVE
"abcde".substring(1, 3)  // "bc" (not "bcd")

// s.substr(start, length) — second param is LENGTH
"abcde".substr(1, 3)     // "bcd"
```

### ❌ Forgetting edge cases
- Empty string `""`
- Single character `"a"`
- All same characters `"aaaa"`
- Strings of different lengths (anagram check)
- Leading/trailing spaces (reverse words)

### ❌ Wrong overflow handling in atoi
```javascript
// Always check BEFORE multiplying
if (ans > Math.floor(INT_MAX / 10) || 
    (ans === Math.floor(INT_MAX / 10) && digit > 7)) {
    return sign === 1 ? INT_MAX : INT_MIN;
}
```

### ❌ Confusing substring vs subsequence
- **Substring:** contiguous → sliding window, two pointers
- **Subsequence:** non-contiguous → DP, recursion

### ❌ Not handling Unicode/special characters
When problem says "lowercase English letters" → use `int[26]`.
When it says "any character" → use HashMap or `int[128]` (ASCII) or `int[256]`.

---

## 14. Complexity Cheat Sheet

| Algorithm / Technique | Time | Space | Use Case |
|----------------------|------|-------|----------|
| Brute Force Search | O(N × M) | O(1) | Pattern matching |
| KMP | O(N + M) | O(M) | Efficient pattern matching |
| Rabin-Karp | O(N + M) avg | O(1) | Multiple pattern search |
| Two Pointers | O(N) | O(1) | Palindrome, reverse |
| Sliding Window (fixed) | O(N) | O(K) | Fixed-size window problems |
| Sliding Window (variable) | O(N) | O(K) | Substring with K distinct |
| Frequency Array | O(N) | O(1) | Anagram, character counting |
| Sort + Compare | O(N log N) | O(N) | Anagram (brute force) |
| Expand Around Center | O(N²) | O(1) | Palindromic substrings |
| Manacher's | O(N) | O(N) | Longest palindrome |
| LCS (DP) | O(N × M) | O(N × M) | Longest common subsequence |
| Trie Operations | O(L) | O(Σ × L × N) | Prefix search, autocomplete |
| String Hashing | O(N) | O(N) | Fast comparison, rolling hash |

---

## 15. Interview Cheat Sheet

### Quick Decision Framework

```
📋 Read the Problem
    ↓
Is it a string problem?
    ↓
Step 1: What type of string problem?
  - Matching / Searching → KMP, Rabin-Karp, or brute force
  - Comparison → Frequency array, sorting, hashing
  - Transformation → Two pointers, stack, simulation
  - Substring counting → Sliding window
  - Palindrome → Expand around center, DP, two pointers
  - Subsequence → DP
    ↓
Step 2: What constraints?
  - Only lowercase letters → int[26] array
  - Any ASCII → int[128] or HashMap
  - String is immutable → use array/StringBuilder
  - N ≤ 10^5 → O(N log N) or O(N) needed
  - N ≤ 10^3 → O(N²) acceptable
    ↓
Step 3: Choose technique
  - Need exact count with K constraint → "atMost(K) - atMost(K-1)"
  - Need palindrome → expand around center
  - Parentheses / nesting → stack or counter
  - Rotation → concatenation trick (s+s)
  - Anagram → frequency array
  - Prefix → sort + compare first/last
    ↓
Step 4: Watch for edge cases
  - Empty string
  - Single character
  - All same characters
  - Leading/trailing spaces
  - Integer overflow (atoi)
```

### Template: Sliding Window (Variable Size)

```javascript
function slidingWindow(s, k) {
    let freq = {}, distinct = 0, left = 0, result = 0;

    for (let right = 0; right < s.length; right++) {
        // Expand: add s[right] to window
        if (!freq[s[right]]) distinct++;
        freq[s[right]] = (freq[s[right]] || 0) + 1;

        // Shrink: while window is invalid
        while (distinct > k) {
            freq[s[left]]--;
            if (freq[s[left]] === 0) { delete freq[s[left]]; distinct--; }
            left++;
        }

        // Update result
        result += right - left + 1;  // or Math.max, etc.
    }
    return result;
}
```

### Template: Expand Around Center

```javascript
function countPalindromes(s) {
    let count = 0;
    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            count++;
            l--; r++;
        }
    }
    for (let i = 0; i < s.length; i++) {
        expand(i, i);       // Odd
        expand(i, i + 1);   // Even
    }
    return count;
}
```

### Template: Frequency Comparison

```javascript
function matchFrequency(s, t) {
    let freq = new Array(26).fill(0);
    for (let c of s) freq[c.charCodeAt(0) - 97]++;
    for (let c of t) freq[c.charCodeAt(0) - 97]--;
    return freq.every(v => v === 0);
}
```

---

## 16. Problem Map — All Covered Problems

### 📁 1. Easy
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Remove Outer Parentheses | Counter/Stack for depth tracking |
| 02 | Reverse Words in a String | Right-to-left traversal / Split-reverse |
| 03 | Largest Odd Number in String | Right-to-left scan for odd digit |
| 04 | Longest Common Prefix | Sort + compare first & last / Vertical scan |
| 05 | Isomorphic Strings | Two-map bijection / Position arrays |
| 06 | Check for Rotated String | Concatenation trick (s+s) / Try all rotations |
| 07 | Valid Anagram | Frequency array / Sort and compare |

### 📁 2. Medium
| # | Problem | Key Concept |
|---|---------|-------------|
| 01 | Sort Characters by Frequency | Max-heap / Bucket sort on frequency |
| 02 | Max Nesting Depth of Parentheses | Counter/Stack for depth tracking |
| 03 | Roman to Integer | Value map + right-to-left subtraction rule |
| 04 | Implement atoi | State machine: whitespace → sign → digits → overflow |
| 05 | Count Substrings with K Unique Chars | Sliding window: atMost(K) - atMost(K-1) |
| 06 | Longest Palindromic Substring | Expand around center (odd + even) |
| 07 | Sum of Beauty of All Substrings | Nested loops + incremental frequency |

---

> 💡 **Tip:** When stuck on a string problem in an interview, always start by asking:
> 1. Is the character set **limited** (lowercase only, digits only)?
> 2. Is this about **substrings** (contiguous) or **subsequences** (non-contiguous)?
> 3. Does order matter? → Two pointers, sliding window
> 4. Does frequency matter? → Frequency array, HashMap
> 5. Is there **nesting** or **matching**? → Stack
>
> The answers to these 5 questions will immediately narrow down your approach.

