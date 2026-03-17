/*
Question:
Given a list of accounts, merge accounts belonging to the same person
(accounts sharing a common email).

Approach:
- Use Disjoint Set to union accounts sharing common emails.
- Group all emails by their root account and return merged results.

Time Complexity: O(n * m * α(n))
Space Complexity: O(n * m)
*/

class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
    }

    findUPar(node) {
        if (this.parent[node] === node) return node;
        return this.parent[node] = this.findUPar(this.parent[node]);
    }

    unionSize(u, v) {
        let uP = this.findUPar(u), vP = this.findUPar(v);
        if (this.size[uP] > this.size[vP]) {
            this.parent[vP] = uP;
            this.size[uP] += this.size[vP];
        } else {
            this.parent[uP] = vP;
            this.size[vP] += this.size[uP];
        }
    }
}

function accountsMerge(accounts) {
    let emailToAccountIndex = new Map();
    let n = accounts.length;
    let djs = new DisjointSet(n);

    for (let u = 0; u < n; u++) {
        for (let i = 1; i < accounts[u].length; i++) {
            let email = accounts[u][i];
            if (!emailToAccountIndex.has(email)) {
                emailToAccountIndex.set(email, []);
            }
            emailToAccountIndex.get(email).push(u);
        }
    }

    for (let [email, users] of emailToAccountIndex) {
        for (let i = 1; i < users.length; i++) {
            if (djs.findUPar(users[i - 1]) !== djs.findUPar(users[i])) {
                djs.unionSize(users[i - 1], users[i]);
            }
        }
    }

    let userMail = Array.from({ length: n }, () => new Set());
    for (let i = 0; i < n; i++) {
        for (let m = 1; m < accounts[i].length; m++) {
            userMail[djs.findUPar(i)].add(accounts[i][m]);
        }
    }

    let ans = [];
    for (let i = 0; i < n; i++) {
        if (userMail[i].size === 0) continue;
        let temp = [accounts[i][0]];
        let sorted = [...userMail[i]].sort();
        temp.push(...sorted);
        ans.push(temp);
    }

    return ans;
}

