/*
===============================================
  127. Word Ladder (LeetCode Hard)
===============================================

Question:
Given beginWord, endWord, and a wordList:
Find the LENGTH of the shortest transformation sequence
from beginWord to endWord, such that:
  - Only one letter can change at a time.
  - Each intermediate word must exist in wordList.

Return 0 if no such sequence exists.

Example:
  beginWord = "hit", endWord = "cog"
  wordList  = ["hot","dot","dog","lot","log","cog"]

  hit → hot → dot → dog → cog  (length = 5)

=== Why BFS? ===
Each word is a NODE. Two words are connected by an EDGE
if they differ by exactly one letter.

Shortest path in an unweighted graph → BFS.
Each BFS level = one transformation step.

=== Two Approaches ===

Approach 1 (Brute Force adjacency):
  Compare every pair of words → O(n² × m). Slow for large wordLists.

Approach 2 (Optimized — wildcard pattern):
  For each word, replace one letter with '*' to create a pattern.
    "hot" → "*ot", "h*t", "ho*"
  All words sharing a pattern are neighbors (differ by 1 letter).
  Build a pattern → words map. Much faster: O(n × m).

We'll implement the OPTIMIZED approach below.

=== Algorithm (Optimized BFS) ===
1. Put all words from wordList into a Set for O(1) lookup.
2. If endWord is NOT in the set → return 0 (impossible).
3. BFS from beginWord:
   - For each word in the current level, try changing
     every position to every letter 'a' to 'z'.
   - If the new word exists in the wordSet → it's a valid neighbor.
   - Remove it from wordSet (acts as "visited") to avoid revisiting.
   - Push it to the next BFS level.
4. If we reach endWord → return the current level count.
5. If BFS ends without finding endWord → return 0.

=== Why remove from Set instead of using a visited Set? ===
Both work. But removing from wordSet is cleaner —
it combines "exists in dictionary" + "not yet visited" into one check.

Time Complexity:  O(n × m × 26) ≈ O(n × m)
  n = number of words, m = word length, 26 = alphabet size.
  For each word, we try m positions × 26 letters.

Space Complexity: O(n × m) — for the wordSet and queue.
*/

function ladderLength(beginWord, endWord, wordList) {
    // Step 1: Put all words in a Set
    let wordSet = new Set(wordList);

    // Step 2: If endWord not in dictionary → impossible
    if (!wordSet.has(endWord)) return 0;

    // Step 3: BFS
    let queue = [beginWord];
    wordSet.delete(beginWord); // mark as visited
    let level = 1;

    while (queue.length > 0) {
        let next = [];

        for (let word of queue) {
            // If we reached endWord → return level
            if (word === endWord) return level;

            // Try changing each position to 'a'-'z'
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                    let ch = String.fromCharCode(c);
                    if (ch === word[i]) continue; // same letter, skip

                    let newWord = word.substring(0, i) + ch + word.substring(i + 1);

                    if (wordSet.has(newWord)) {
                        wordSet.delete(newWord); // mark visited
                        next.push(newWord);
                    }
                }
            }
        }

        queue = next;
        level++;
    }

    // BFS ended without reaching endWord
    return 0;
}


/*
═══════════════════════════════════════════════
  DRY RUN — Example 1
═══════════════════════════════════════════════

Input:
  beginWord = "hit"
  endWord   = "cog"
  wordList  = ["hot","dot","dog","lot","log","cog"]

Step 1: wordSet = {"hot","dot","dog","lot","log","cog"}
Step 2: "cog" in wordSet → proceed

── BFS Level 1 ──
  queue = ["hit"], level = 1

  Process "hit":
    "hit" ≠ "cog" → try all 1-letter changes:

    Position 0 (h): try a-z
      "ait","bit","cit","dit",...  → none in wordSet
    Position 1 (i): try a-z
      "hat","hbt",...,"hot",... → "hot" ✅ in wordSet!
        wordSet.delete("hot"), push "hot"
      "hut","hvt",... → none
    Position 2 (t): try a-z
      "hia","hib",... → none in wordSet

  next = ["hot"]
  wordSet = {"dot","dog","lot","log","cog"}
  level = 2

── BFS Level 2 ──
  queue = ["hot"], level = 2

  Process "hot":
    "hot" ≠ "cog"

    Position 0 (h): try a-z
      "aot","bot","cot","dot",... → "dot" ✅ → push
      "eot","fot",..."lot"... → "lot" ✅ → push
    Position 1 (o): try a-z
      "hat","hbt",... → none (already visited or not in set)
    Position 2 (t): try a-z
      "hoa","hob",..."hog",... → none in wordSet

  next = ["dot", "lot"]
  wordSet = {"dog","log","cog"}
  level = 3

── BFS Level 3 ──
  queue = ["dot", "lot"], level = 3

  Process "dot":
    Position 0: "aot"..."cot" → none left
    Position 1: "dat","dbt",... → none
    Position 2: "doa","dob",..."dog" → "dog" ✅ → push

  Process "lot":
    Position 0: "aot","bot",... → none
    Position 1: "lat","lbt",... → none
    Position 2: "loa","lob",..."log" → "log" ✅ → push

  next = ["dog", "log"]
  wordSet = {"cog"}
  level = 4

── BFS Level 4 ──
  queue = ["dog", "log"], level = 4

  Process "dog":
    Position 0: "aog","bog","cog" → "cog" ✅ → push

  Process "log":
    Position 0: "aog","bog","cog" → already removed from set

  next = ["cog"]
  wordSet = {}
  level = 5

── BFS Level 5 ──
  queue = ["cog"], level = 5

  Process "cog":
    "cog" === endWord → return 5 ✅

  Transformation: hit → hot → dot → dog → cog (5 words)


═══════════════════════════════════════════════
  DRY RUN — Example 2 (No path exists)
═══════════════════════════════════════════════

Input:
  beginWord = "hit"
  endWord   = "cog"
  wordList  = ["hot","dot","dog","lot","log"]  ← "cog" NOT in list

  Step 2: "cog" NOT in wordSet → return 0 immediately ✅


═══════════════════════════════════════════════
  DRY RUN — Example 3 (Direct 1-step)
═══════════════════════════════════════════════

Input:
  beginWord = "a"
  endWord   = "c"
  wordList  = ["a","b","c"]

  wordSet = {"a","b","c"}, delete "a" → {"b","c"}

  BFS Level 1: queue = ["a"]
    "a" ≠ "c"
    Position 0: try a-z → "b" ✅, "c" ✅ → push both
  
  BFS Level 2: queue = ["b", "c"]
    "b" ≠ "c" → skip
    "c" === "c" → return 2 ✅

  Transformation: "a" → "c" (2 words)


═══════════════════════════════════════════════
  DRY RUN — Example 4 (Longer word)
═══════════════════════════════════════════════

Input:
  beginWord = "lost"
  endWord   = "cost"
  wordList  = ["most","cost","lost","post","host"]

  wordSet = {"most","cost","lost","post","host"}, delete "lost"
          → {"most","cost","post","host"}

  BFS Level 1: queue = ["lost"]
    Position 0 (l): "aost","bost","cost",... → "cost" ✅, "most" ✅, "host" ✅, "post" ✅

  BFS Level 2: queue = ["cost","most","host","post"]
    "cost" === endWord → return 2 ✅

  Transformation: "lost" → "cost" (2 words, just 1 letter change)


=== Edge Cases ===
- endWord not in wordList → return 0
- beginWord === endWord → return 1 (already there)
- No valid 1-letter neighbors → BFS ends early → return 0
- Very long wordList → optimized approach handles it efficiently
- Single character words → each letter connects to all others in list
*/


// ─── Driver Code ───
function runTests() {
    console.log("Test 1:", ladderLength("hit", "cog",
        ["hot","dot","dog","lot","log","cog"]));
    // Expected: 5

    console.log("Test 2:", ladderLength("hit", "cog",
        ["hot","dot","dog","lot","log"]));
    // Expected: 0 (cog not in list)

    console.log("Test 3:", ladderLength("a", "c",
        ["a","b","c"]));
    // Expected: 2

    console.log("Test 4:", ladderLength("lost", "cost",
        ["most","cost","lost","post","host"]));
    // Expected: 2

    console.log("Test 5:", ladderLength("hot", "dog",
        ["hot","dog","dot"]));
    // Expected: 3 (hot → dot → dog)

    console.log("Test 6:", ladderLength("abc", "xyz",
        ["abc","xyz"]));
    // Expected: 0 (differ by 3 letters, no intermediate)

    console.log("Test 7:", ladderLength("hit", "hit",
        ["hit"]));
    // Expected: 1 (already at endWord)
}

runTests();


/*
═══════════════════════════════════════════════════════════════
  126. Word Ladder II (LeetCode Hard)
═══════════════════════════════════════════════════════════════

Question:
Given beginWord, endWord, and a wordList:
Return ALL the shortest transformation sequences from
beginWord to endWord. Each sequence must satisfy:
  - Only one letter changes at a time.
  - Every intermediate word must exist in wordList.

If no such sequence exists, return an empty list.

Example:
  beginWord = "hit", endWord = "cog"
  wordList  = ["hot","dot","dog","lot","log","cog"]

  Output: [["hit","hot","dot","dog","cog"],
           ["hit","hot","lot","log","cog"]]

=== Why is this MUCH harder than Word Ladder I? ===
Word Ladder I → just find the LENGTH of shortest path.
Word Ladder II → find ALL PATHS of that shortest length.

=== Why the naive "store full paths in queue" approach TLEs ===
The brute force idea is: queue stores entire paths like ["hit","hot","dot"].
Problem: On large inputs, the number of paths at each level can EXPLODE.
Each path is an array that gets COPIED every time we extend it.
  - 100 paths of length 10 → 100 copies of size 10 = 1000 operations per level
  - This grows exponentially → TLE on big test cases.

=== Optimized Approach: BFS (parent map) + DFS (backtrack) ===

Phase 1 — BFS: Build a DAG of shortest-path parents.
  - BFS level by level (just like Word Ladder I — store WORDS, not paths).
  - For each word discovered, record WHO led to it in a `parents` Map.
    parents["dog"] = ["dot"]  means "dot" → "dog" in the shortest path.
  - A word can have MULTIPLE parents at the SAME level.
    parents["cog"] = ["dog", "log"]  (both reach "cog" at level 4).
  - Delete words from wordSet only AFTER each level (same trick as before).
  - Stop BFS as soon as endWord is found at any level.

Phase 2 — DFS: Backtrack from endWord using the parents map.
  - Start from endWord, follow parents map backwards to beginWord.
  - Each complete path (reversed) is one answer.
  - This is MUCH faster because we only reconstruct the actual
    shortest paths, not all possible BFS branches.

=== Why this is faster ===
  Old approach: Queue holds paths → O(paths × pathLength) copies per level.
  New approach: Queue holds words → O(words) per level.
               Path reconstruction happens only ONCE at the end via DFS.

Time Complexity:  O(n × m × 26) for BFS + O(p × L) for DFS reconstruction.
  n = words, m = word length, p = number of shortest paths, L = path length.

Space Complexity: O(n) for BFS queue + O(n) for parents map.
*/

function findLadders(beginWord, endWord, wordList) {
    let wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    // ── Phase 1: BFS — build parent map ──
    // parents[word] = [list of words that lead to this word at shortest distance]
    let parents = new Map();
    let queue = [beginWord];
    wordSet.delete(beginWord);
    let found = false;

    while (queue.length > 0 && !found) {
        let next = [];
        let usedThisLevel = new Set();

        for (let word of queue) {
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    let ch = String.fromCharCode(c);
                    if (ch === word[i]) continue;

                    let newWord = word.substring(0, i) + ch + word.substring(i + 1);

                    // Word must be in wordSet OR already discovered at THIS level
                    // (usedThisLevel allows multiple parents at same level)
                    if (wordSet.has(newWord) || usedThisLevel.has(newWord)) {
                        // Add current word as a parent of newWord
                        if (!parents.has(newWord)) parents.set(newWord, []);
                        parents.get(newWord).push(word);

                        // Only push to next queue if first time seeing at this level
                        if (!usedThisLevel.has(newWord)) {
                            usedThisLevel.add(newWord);
                            next.push(newWord);
                        }

                        if (newWord === endWord) found = true;
                    }
                }
            }
        }

        // Delete all words used at this level from wordSet
        // (so deeper levels don't revisit them)
        for (let w of usedThisLevel) {
            wordSet.delete(w);
        }

        queue = next;
    }

    if (!found) return [];

    // ── Phase 2: DFS — backtrack from endWord to beginWord using parents map ──
    let result = [];

    function backtrack(word, path) {
        if (word === beginWord) {
            result.push([...path]);
            return;
        }
        for (let parent of (parents.get(word) || [])) {
            path.unshift(parent);
            backtrack(parent, path);
            path.shift(); // undo for next parent
        }
    }

    backtrack(endWord, [endWord]);
    return result;
}


/*
═══════════════════════════════════════════════
  DRY RUN — Word Ladder II Example 1
═══════════════════════════════════════════════

Input:
  beginWord = "hit", endWord = "cog"
  wordList  = ["hot","dot","dog","lot","log","cog"]

  wordSet = {"hot","dot","dog","lot","log","cog"}
  Delete "hit" (not in set anyway)

══ Phase 1: BFS — Build Parent Map ══

── Level 1: queue = ["hit"] ──
  "hit" → try all 1-letter changes:
    "hot" ✅ in wordSet → parents["hot"] = ["hit"], usedThisLevel.add("hot")

  next = ["hot"]
  Delete "hot" from wordSet → {"dot","dog","lot","log","cog"}

── Level 2: queue = ["hot"] ──
  "hot" → changes:
    "dot" ✅ → parents["dot"] = ["hot"], usedThisLevel.add("dot")
    "lot" ✅ → parents["lot"] = ["hot"], usedThisLevel.add("lot")

  next = ["dot","lot"]
  Delete "dot","lot" → wordSet = {"dog","log","cog"}

── Level 3: queue = ["dot","lot"] ──
  "dot" → "dog" ✅ → parents["dog"] = ["dot"]
  "lot" → "log" ✅ → parents["log"] = ["lot"]

  next = ["dog","log"]
  Delete "dog","log" → wordSet = {"cog"}

── Level 4: queue = ["dog","log"] ──
  "dog" → "cog" ✅ → parents["cog"] = ["dog"]
  "log" → "cog" ✅ → "cog" already in usedThisLevel
    → parents["cog"].push("log") → parents["cog"] = ["dog","log"]
    → NOT pushed again to next (already in usedThisLevel)

  found = true! Stop BFS.

  Parent Map:
    "hot" ← ["hit"]
    "dot" ← ["hot"]
    "lot" ← ["hot"]
    "dog" ← ["dot"]
    "log" ← ["lot"]
    "cog" ← ["dog", "log"]     ← TWO parents! This is the key.

══ Phase 2: DFS — Backtrack from "cog" ══

  backtrack("cog", ["cog"])
    parents["cog"] = ["dog", "log"]

    ── Parent "dog" ──
    backtrack("dog", ["dog","cog"])
      parents["dog"] = ["dot"]

      backtrack("dot", ["dot","dog","cog"])
        parents["dot"] = ["hot"]

        backtrack("hot", ["hot","dot","dog","cog"])
          parents["hot"] = ["hit"]

          backtrack("hit", ["hit","hot","dot","dog","cog"])
            "hit" === beginWord → result.push(["hit","hot","dot","dog","cog"]) ✅

    ── Parent "log" ──
    backtrack("log", ["log","cog"])
      parents["log"] = ["lot"]

      backtrack("lot", ["lot","log","cog"])
        parents["lot"] = ["hot"]

        backtrack("hot", ["hot","lot","log","cog"])
          parents["hot"] = ["hit"]

          backtrack("hit", ["hit","hot","lot","log","cog"])
            "hit" === beginWord → result.push(["hit","hot","lot","log","cog"]) ✅

  result = [
    ["hit","hot","dot","dog","cog"],
    ["hit","hot","lot","log","cog"]
  ] ✅


═══════════════════════════════════════════════
  DRY RUN — Example 2 (No path)
═══════════════════════════════════════════════

Input: beginWord = "hit", endWord = "cog"
       wordList = ["hot","dot","dog","lot","log"]

  "cog" NOT in wordSet → return [] immediately ✅


═══════════════════════════════════════════════
  DRY RUN — Example 3 (Multiple parents at same level)
═══════════════════════════════════════════════

Input: beginWord = "red", endWord = "tax"
       wordList = ["ted","tex","red","tax","tad","den","rex","pee"]

  Phase 1: BFS

  Level 1: "red" → "ted" ✅, "rex" ✅
    parents: "ted"←["red"], "rex"←["red"]

  Level 2: "ted" → "tex" ✅, "tad" ✅
           "rex" → "tex" → already in usedThisLevel
             → parents["tex"].push("rex")
    parents: "tex"←["ted","rex"], "tad"←["ted"]

  Level 3: "tex" → "tax" ✅ → found!
           "tad" → "tax" → already in usedThisLevel
             → parents["tax"].push("tad")
    parents: "tax"←["tex","tad"]

  Phase 2: DFS backtrack from "tax"

  backtrack("tax"):
    parent "tex" → parent "ted" → parent "red" = begin ✅ → ["red","ted","tex","tax"]
    parent "tex" → parent "rex" → parent "red" = begin ✅ → ["red","rex","tex","tax"]
    parent "tad" → parent "ted" → parent "red" = begin ✅ → ["red","ted","tad","tax"]

  result = 3 paths of length 4 ✅


=== Why old approach TLEs but this doesn't ===

  Old: Queue stores FULL PATHS.
       At each level, every path is COPIED and extended.
       With 500 words of length 5, at level 10:
         → queue could hold millions of path copies
         → each copy is an array of 10 strings
         → O(paths × pathLength) memory per level → BLOWS UP

  New: Queue stores SINGLE WORDS.
       Parent map stores just word → [parent words].
       BFS is identical to Word Ladder I in speed.
       Only the final DFS backtrack creates actual paths.
       → O(n × m × 26) for BFS → same as Word Ladder I
       → DFS only walks the actual shortest paths → fast

  |                    | Old (store paths) | New (parent map + DFS) |
  |--------------------|-------------------|------------------------|
  | Queue entry size   | O(L) per path     | O(1) per word          |
  | Queue entries      | O(branching^L)    | O(n)                   |
  | Memory per level   | EXPONENTIAL       | O(n)                   |
  | Path construction  | During BFS (slow) | After BFS via DFS      |


=== Key Differences: Word Ladder I vs II ===

  | Feature              | Word Ladder I           | Word Ladder II          |
  |----------------------|-------------------------|-------------------------|
  | Return               | Length (number)          | All shortest paths      |
  | Queue stores         | Words                   | Words (same!)           |
  | Extra data structure | None                    | parents Map             |
  | Delete from wordSet  | Immediately             | After entire level      |
  | Path reconstruction  | Not needed              | DFS backtrack at end    |
  | Complexity (BFS)     | O(n × m × 26)           | O(n × m × 26) (same!)  |


=== Edge Cases ===
- endWord not in wordList → return []
- beginWord === endWord → return [[beginWord]]
- Multiple paths of same length → return ALL of them
- Single step transformation → return [[beginWord, endWord]]
- No valid transformation → return []
- Large wordList (500+ words) → parent map approach handles efficiently
*/


// ─── Driver Code for Word Ladder II ───
function runTestsII() {
    console.log("\n=== Word Ladder II Tests ===");

    // Test 1: Two shortest paths
    console.log("Test II-1:", JSON.stringify(findLadders("hit", "cog",
        ["hot","dot","dog","lot","log","cog"])));
    // Expected: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]

    // Test 2: No path (endWord not in list)
    console.log("Test II-2:", JSON.stringify(findLadders("hit", "cog",
        ["hot","dot","dog","lot","log"])));
    // Expected: []

    // Test 3: Multiple paths (3 paths)
    console.log("Test II-3:", JSON.stringify(findLadders("red", "tax",
        ["ted","tex","red","tax","tad","den","rex","pee"])));
    // Expected: 3 paths of length 4

    // Test 4: Direct 1-step
    console.log("Test II-4:", JSON.stringify(findLadders("hot", "dot",
        ["hot","dot","dog"])));
    // Expected: [["hot","dot"]]

    // Test 5: No transformation possible
    console.log("Test II-5:", JSON.stringify(findLadders("abc", "xyz",
        ["abc","xyz"])));
    // Expected: []

    // Test 6: Large input (previously TLE with naive approach)
    let bigWordList = ["aaaaa","caaaa","cbaaa","daaaa","dbaaa","eaaaa","ebaaa","faaaa","fbaaa","gaaaa","gbaaa","haaaa","hbaaa","iaaaa","ibaaa","jaaaa","jbaaa","kaaaa","kbaaa","laaaa","lbaaa","maaaa","mbaaa","naaaa","nbaaa","oaaaa","obaaa","paaaa","pbaaa","bbaaa","bbcaa","bbcba","bbdaa","bbdba","bbeaa","bbeba","bbfaa","bbfba","bbgaa","bbgba","bbhaa","bbhba","bbiaa","bbiba","bbjaa","bbjba","bbkaa","bbkba","bblaa","bblba","bbmaa","bbmba","bbnaa","bbnba","bboaa","bboba","bbpaa","bbpba","bbbba","abbba","acbba","dbbba","dcbba","ebbba","ecbba","fbbba","fcbba","gbbba","gcbba","hbbba","hcbba","ibbba","icbba","jbbba","jcbba","kbbba","kcbba","lbbba","lcbba","mbbba","mcbba","nbbba","ncbba","obbba","ocbba","pbbba","pcbba","ccbba","ccaba","ccaca","ccdba","ccdca","cceba","cceca","ccfba","ccfca","ccgba","ccgca","cchba","cchca","cciba","ccica","ccjba","ccjca","cckba","cckca","cclba","cclca","ccmba","ccmca","ccnba","ccnca","ccoba","ccoca","ccpba","ccpca","cccca","accca","adcca","bccca","bdcca","eccca","edcca","fccca","fdcca","gccca","gdcca","hccca","hdcca","iccca","idcca","jccca","jdcca","kccca","kdcca","lccca","ldcca","mccca","mdcca","nccca","ndcca","occca","odcca","pccca","pdcca","ddcca","ddaca","ddada","ddbca","ddbda","ddeca","ddeda","ddfca","ddfda","ddgca","ddgda","ddhca","ddhda","ddica","ddida","ddjca","ddjda","ddkca","ddkda","ddlca","ddlda","ddmca","ddmda","ddnca","ddnda","ddoca","ddoda","ddpca","ddpda","dddda","addda","aedda","bddda","bedda","cddda","cedda","fddda","fedda","gddda","gedda","hddda","hedda","iddda","iedda","jddda","jedda","kddda","kedda","lddda","ledda","mddda","medda","nddda","nedda","oddda","oedda","pddda","pedda","eedda","eeada","eeaea","eebda","eebea","eecda","eecea","eefda","eefea","eegda","eegea","eehda","eehea","eeida","eeiea","eejda","eejea","eekda","eekea","eelda","eelea","eemda","eemea","eenda","eenea","eeoda","eeoea","eepda","eepea","eeeea","ggggg","agggg","ahggg","bgggg","bhggg","cgggg","chggg","dgggg","dhggg","egggg","ehggg","fgggg","fhggg","igggg","ihggg","jgggg","jhggg","kgggg","khggg","lgggg","lhggg","mgggg","mhggg","ngggg","nhggg","ogggg","ohggg","pgggg","phggg","hhggg","hhagg","hhahg","hhbgg","hhbhg","hhcgg","hhchg","hhdgg","hhdhg","hhegg","hhehg","hhfgg","hhfhg","hhigg","hhihg","hhjgg","hhjhg","hhkgg","hhkhg","hhlgg","hhlhg","hhmgg","hhmhg","hhngg","hhnhg","hhogg","hhohg","hhpgg","hhphg","hhhhg","ahhhg","aihhg","bhhhg","bihhg","chhhg","cihhg","dhhhg","dihhg","ehhhg","eihhg","fhhhg","fihhg","ghhhg","gihhg","jhhhg","jihhg","khhhg","kihhg","lhhhg","lihhg","mhhhg","mihhg","nhhhg","nihhg","ohhhg","oihhg","phhhg","pihhg","iihhg","iiahg","iiaig","iibhg","iibig","iichg","iicig","iidhg","iidig","iiehg","iieig","iifhg","iifig","iighg","iigig","iijhg","iijig","iikhg","iikig","iilhg","iilig","iimhg","iimig","iinhg","iinig","iiohg","iioig","iiphg","iipig","iiiig","aiiig","ajiig","biiig","bjiig","ciiig","cjiig","diiig","djiig","eiiig","ejiig","fiiig","fjiig","giiig","gjiig","hiiig","hjiig","kiiig","kjiig","liiig","ljiig","miiig","mjiig","niiig","njiig","oiiig","ojiig","piiig","pjiig","jjiig","jjaig","jjajg","jjbig","jjbjg","jjcig","jjcjg","jjdig","jjdjg","jjeig","jjejg","jjfig","jjfjg","jjgig","jjgjg","jjhig","jjhjg","jjkig","jjkjg","jjlig","jjljg","jjmig","jjmjg","jjnig","jjnjg","jjoig","jjojg","jjpig","jjpjg","jjjjg","ajjjg","akjjg","bjjjg","bkjjg","cjjjg","ckjjg","djjjg","dkjjg","ejjjg","ekjjg","fjjjg","fkjjg","gjjjg","gkjjg","hjjjg","hkjjg","ijjjg","ikjjg","ljjjg","lkjjg","mjjjg","mkjjg","njjjg","nkjjg","ojjjg","okjjg","pjjjg","pkjjg","kkjjg","kkajg","kkakg","kkbjg","kkbkg","kkcjg","kkckg","kkdjg","kkdkg","kkejg","kkekg","kkfjg","kkfkg","kkgjg","kkgkg","kkhjg","kkhkg","kkijg","kkikg","kkljg","kklkg","kkmjg","kkmkg","kknjg","kknkg","kkojg","kkokg","kkpjg","kkpkg","kkkkg","ggggx","gggxx","ggxxx","gxxxx","xxxxx","xxxxy","xxxyy","xxyyy","xyyyy","yyyyy","yyyyw","yyyww","yywww","ywwww","wwwww","wwvww","wvvww","vvvww","vvvwz","avvwz","aavwz","aaawz","aaaaz"];
    let start = Date.now();
    let bigResult = findLadders("aaaaa", "ggggg", bigWordList);
    let elapsed = Date.now() - start;
    console.log("Test II-6 (large): paths found =", bigResult.length, "| time =", elapsed + "ms");
    if (bigResult.length > 0) {
        console.log("  First path length:", bigResult[0].length);
        console.log("  First path:", JSON.stringify(bigResult[0]));
    }
    // Should complete in < 1 second (not TLE)
}

runTestsII();
