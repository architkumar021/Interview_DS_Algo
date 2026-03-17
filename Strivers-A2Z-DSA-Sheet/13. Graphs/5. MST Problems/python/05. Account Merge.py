"""
Question:
Given a list of accounts, merge accounts belonging to the same person
(accounts sharing a common email).

Approach:
- Use Disjoint Set to union accounts sharing common emails.
- Group all emails by their root account and return merged results.

Time Complexity: O(n * m * α(n))
Space Complexity: O(n * m)
"""


class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find_u_par(self, node):
        if self.parent[node] == node:
            return node
        self.parent[node] = self.find_u_par(self.parent[node])
        return self.parent[node]

    def union_size(self, u, v):
        uP, vP = self.find_u_par(u), self.find_u_par(v)
        if self.size[uP] > self.size[vP]:
            self.parent[vP] = uP
            self.size[uP] += self.size[vP]
        else:
            self.parent[uP] = vP
            self.size[vP] += self.size[uP]


def accounts_merge(accounts):
    email_to_account_index = {}
    n = len(accounts)
    djs = DisjointSet(n)

    for u in range(n):
        for i in range(1, len(accounts[u])):
            email = accounts[u][i]
            if email not in email_to_account_index:
                email_to_account_index[email] = []
            email_to_account_index[email].append(u)

    for email, users in email_to_account_index.items():
        for i in range(1, len(users)):
            if djs.find_u_par(users[i - 1]) != djs.find_u_par(users[i]):
                djs.union_size(users[i - 1], users[i])

    user_mail = [set() for _ in range(n)]
    for i in range(n):
        for m in range(1, len(accounts[i])):
            user_mail[djs.find_u_par(i)].add(accounts[i][m])

    ans = []
    for i in range(n):
        if not user_mail[i]:
            continue
        temp = [accounts[i][0]]
        temp.extend(sorted(user_mail[i]))
        ans.append(temp)

    return ans

