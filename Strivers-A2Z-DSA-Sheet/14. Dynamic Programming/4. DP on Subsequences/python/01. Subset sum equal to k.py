"""
  QUESTION: Subset Sum Equal to K (GFG)
  Given array and target, check if any subset sums to target.
  Example: arr=[3,34,4,12,5,2], sum=9 → True (4+3+2)
  Memoization → Space Optimized
"""
import sys; sys.setrecursionlimit(10000)
def subset_sum_memo(arr, target):
    n = len(arr)
    dp = [[-1]*(target+1) for _ in range(n)]
    def solve(i, s):
        if s == 0: return True
        if i == 0: return arr[0] == s
        if dp[i][s] != -1: return dp[i][s]
        take = solve(i-1, s-arr[i]) if arr[i] <= s else False
        dp[i][s] = take or solve(i-1, s)
        return dp[i][s]
    return solve(n-1, target)
def subset_sum(arr, target):
    n = len(arr)
    prev = [False]*(target+1)
    prev[0] = True
    if arr[0] <= target: prev[arr[0]] = True
    for i in range(1, n):
        curr = [False]*(target+1)
        curr[0] = True
        for s in range(1, target+1):
            take = prev[s-arr[i]] if arr[i] <= s else False
            curr[s] = ta"""
  QUESTION: Subset Sum Equal to K (GFG)
  Given rg  ]
  Given array and target, check if anyub  Example: arr=[3,34,4,12,5,2], sum=9 → True (4+3+2)
  Memum  Memoization → Space Optimized
"""
import sys; sysE/"""
import sys; sys.setrecursion sim sdef subset_sum_memo(arr, target):
    n16    n = len(arr)
    dp = [[-1]*et    dp = [[-1]*ay    def solve(i, s):
        if s == 0: retck        if s == 0: Fa        if i == 0: return arral        if dp[i][s] != -1: return dpue        take = solve(i-1, s-arr[i]) if ar s        dp[i][s] = take or solve(i-1, s)
        return dp[ita        return dp[i][s]
    return solvls    return solve(n-1, [0def subset_sum(arr, target):ar    n = len(arr)
    prev =      prev = [Fal(1    prev[0] = True
    if ar*(    if arr[0] <=  c    for i in range(1, n):
        curr = [Fge        curr = [False]*( p        curr[0] = True
        fls        for s in rangur            take = prev[s-arr[i]] i =            curr[s] = ta"""
  QUESTION: Subset Sum Equal t    QUESTION: Subset Sum Equ11  Given rg  ]
  Given array and target[1  Given arra#   Memum  Memoization → Space Optimized
"""
import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
import sys; syS2imMiimport sys; sys.set E    n16    n = len(arr)
    dp = [[-1]*et    dp = [[-1]*ay    def ar    dp = [[-1]*et    d)
        if s == 0: retck        if s == 0: Fa        f         return dp[ita        return dp[i][s]
    return solvls    return solve(n-1, [0def subset_sum(arr, target):ar    n = len(arr)
    prev =      prev = [Fal(1    prev[0] = True
    if ar*(    i]    return solvls    return solve(n-1, [0de o    prev =      prev = [Fal(1    prev[0] = True
    if ar*(    if arr[0] <=  c    for       if ar*(    if arr[0] <=  c    for i in rans)        curr = [Fge        curr = [False]*( p        c(m        fls        for s in rangur            take = prev[s-arr[i]r   QUESTION: Subset Sum Equal t    QUESTION: Subset Sum Equ11  Given rg  ]
  Given array and targeub  Given array and target[1  Given arra#   Memum  Memoization → Space O0 """
import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  import sys; sysE/"""
import systaimport sys; syS2imMng    dp = [[-1]*et    dp = [[-1]*ay    def ar    dp = [[-1]*et  ==        if s == 0: retck        if s == 0: Fa        f         ret      return solvls    return solve(n-1, [0def subset_sum(arr, target):ar    n = len(arr)
    prev =e(    prev =      prev = [Fal(1    prev[0] = True
    if ar*(    i]    return solvls          if ar*(    i]    return solvls    return sge    if ar*(    if arr[0] <=  c    for       if ar*(    if arr[0] <=  c    for i in rans)        curr = [Fge 2
  Given array and targeub  Given array and target[1  Given arra#   Memum  Memoization → Space O0 """
import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  import sys; sysE/"""
import systaimport sys; syS2imMng    dp = [[-1]*et    dp =rrimport sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set   import sys; sys.set_simport sys; sysE/"""
bsims_impo  bsims_import sys; s$Bimport systaimport sys; syS2imMng    dp = [[-1 '    prev =e(    prev =      prev = [Fal(1    prev[0] = True
    if ar*(    i]    return solvls          if ar*(    i]    return solvls    return sge    if ar*(    if arr[0] <=  c    for       if ar*(    if arr[0] <=  c    for i in rans)        curr = [to    if ar*(    i]    return solvls          if ar*(    i] (t  Given array and targeub  Given array and target[1  Given arra#   Memum  Memoization → Space O0 """
import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys;   import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  <import sys; sys.set  import sys; sysE/"""
bsims_impoMObsims_import sys; srrimport systaimport sys; syS2imMng    dp = [[-1n_import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.setapimport sys; sysE/"""
bsims_impoIObsims_import sys; sG)bsims_impo  bsims_import sys; s$Bimport systaimport sys; syS2imMng   v    if ar*(    i]    return solvls          if ar*(    i]    return solvls    return sge    if ar*(    if arr[0] <=  c    for       if ar*(10import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys;   import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  <import sys; sys.set  import sys; sysE/"""
bsims_impoMObsims_import sys; srrimport systaimport sys; syS2imMng    dp = [[-1n_import sys; sys.setrecursio P"""
i  import sys; sys.set Wimport sys; sysE/"""
bsims_impo nbsims_import sys;   =import sys; sys.setrecursio P"""
import1)import sys; sysE/"""
bsims_impo rbsims_import sys; s cbsims_impoMObsims_import sys; srrimport systaimport sys; syS2imMng  i]import sys; sysE/"""
bsims_import sys; sys.setapimport sys; sysE/"""
bsims_impoIObsims_import sys; sG)bsims_impo  bsims_import sys; s__bsims_impoIObsims_import sys; sG)bsims_impo  b[4import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys;   import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  <import sys; sys.set  import sys; sysE/"""
bsims_impoMObsims_import sys; srrimport syst,5import sys; sysE/"""
bsims_impoy:bsims_import sys;   aimport sys; sys.setrecursio P"""
importt import sys; sysE/"""
bsims_impo0)bsims_import sys; smobsims_impoMObsims_import sys; srrimport systaimport sys; syS2imMng  ini  import sys; sys.set Wimport sys; sysE/"""
bsims_impo nbsims_import sys;   =import sys; sys.setrecursio P"""
i %bsims_impo nbsims_import sys;   =import sys dimport1)import sys; sysE/"""
bsims_impo rbsims_import sys; s cbsmtbsims_impo rbsims_import symtbsims_import sys; sys.setapimport sys; sysE/"""
bsims_impoIObsims_import sys; sG)bsims_impo  bsims_import sys; s__bsims_im  bsims_impoIObsims_import sys; sG)bsims_impo  bf import sys; sysE/"""
bsims_import sys;   import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  <i ibsims_import sys;   eimport sys; sys.setrecursio P"""
importn)import sys; sysE/"""
bsims_impo*(bsims_import sys; surbsims_impoMObsims_import sys; srrimport syst,5import sys; sysE/"""
b cbsims_impoy:bsims_import sys;   aimport sys; sys.setrecursio P"""rrimportt import sys; sysE/"""
bsims_impo0)bsims_import sys; smobsevbsims_impo0)bsims_import sysebsims_impo nbsims_import sys;   =import sys; sys.setrecursio P"""
i %bsims_impo nbsims_import sys;   =import sys dimport1)import sys; sysE/"""
bsiini %bsims_impo nbsims_import sys;   =import sys dimport1)import s Sbsims_impo rbsims_import sys; s cbsmtbsims_impo rbsims_import symtbsims_impo bsims_impoIObsims_import sys; sG)bsims_impo  bsims_import sys; s__bsims_im  bsims_impoIObsims_import sys; sG)bsi nbsims_import sys;   import sys; sysE/"""
import sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  <i ibsims_import sys;) import sys; sys.setrecursio P"""
importgeimport sys; sysE/"""
bsims_imporebsims_import sys; sf importn)import sys; sysE/"""
bsims_impo*(bsims_import sys; surbsims_impoMObsims_impevbsims_impo*(bsims_import syrab cbsims_impoy:bsims_import sys;   aimport sys; sys.setrecursio P"""rrimportt import sys; sysE/"""] bsims_impo0)bsims_import sys; smobsevbsims_impo0)bsims_import sysebsims_impo nbsims_import sys;  ]
i %bsims_impo nbsims_import sys;   =import sys dimport1)import sys; sysE/"""
bsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsims_impo nbsims_import sys;   =import sys dimport1)import s Sbsimamimport sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; sys.set  <i ibsims_import sys;) import sys; sys.setrecursio P"""
importgeimport sys; sysE/"""
bsims_imporebsims_import sys; sf importn)import sys; sysE/"""
bsims_impo*(bsims_import sys; surbsims_impoMObsims_impevbsims_impo*(bsims[0import sys; sysE/"""
bsims_impoambsims_import sys; s[iimportgeimport sys; sysE/"""
bsims_imporebsims_import sys; sf importn)import sys;[ibsims_imporebsims_import syambsims_impo*(bsims_import sys; surbsims_impoMObsims_impevbsimefi %bsims_impo nbsims_import sys;   =import sys dimport1)import sys; sysE/"""
bsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsims_impo nbsims_import sys;   =import sys dimport1)import s Sbsimamimport sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; selbsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsims_impo nevbsiini %bsims_impo nbsims_import sys;   =import sys dmeimport sys; sysE/"""
bsims_import sys; sys.set  <i ibsims_import sys;) import sys; sys.setrecursio P"""
impo<<bsims_import sys; sTIimportgeimport sys; sysE/"""
bsims_imporebsims_import sys; sf importn)import sys;websims_imporebsims_import sy, bsims_impo*(bsims_import sys; surbsims_impoMObsims_impevbsimIPbsims_impoambsims_import sys; s[iimportgeimport sys; sysE/"""
bsims_imporebsims_import sys; sf vbsims_imporebsims_import sys; sf importn)import sys;[ibsims_n)bsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsims_impo nbsims_import sys;   =import sys dimport1)import s Sbsimamimport sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; selbsiini %bsims[ibsiini %bsims_impo nbsims_import sys;   =import sys dw]import sys; sysE/"""
bsims_import sys; selbsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsi ibsims_import sys; sw]bsiini %bsims_impo nevbsiini %bsims_impo nbsims_import sys;   =import sys   bsims_import sys; sys.set  <i ibsims_import sys;) import sys; sys.setrecursio P"""
impo<<bsims_i >impo<<bsims_import sys; sTIimportgeimport sys; sysE/"""
bsims_imporebsims_import = bsims_imporebsims_import sys; sf importn)import sys;we pbsims_imporebsims_import sys; sf vbsims_imporebsims_import sys; sf importn)import sys;[ibsims_n)bsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsims_impo nbsims_import sys;   =import sys diGFbsiini %bsims_impo nbsims_import sys;   =import sys dimport1)import s Sbsimamimport sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; e=import sys; sysE/"""
bsims_import sys; selbsiini %bsims[ibsiini %bsims_impo nbsims_import sys;   =import sys  bsims_import sys; sorbsims_import sys; selbsiini %bsims_impo nbsims_import sys;   =import sys d'
bsiini %bsi ibsims_import sys; sw]
 bsiini %bsi ibsims_import sys; sw]bsiini %bsims_impo nevbsiini %bsims_impoi,impo<<bsims_i >impo<<bsims_import sys; sTIimportgeimport sys; sysE/"""
bsims_imporebsims_import = bsims_imporebsims_import sys; sf importn)import sys;we pbsims_imporebsims_import sys; sf vbsi ibsims_imporebsims_import = bsims_imporebsims_import sys; sf importn)i  bsiini %bsims_impo nbsims_import sys;   =import sys diGFbsiini %bsims_impo nbsims_import sys;   =import sys dimport1)import s Sbsimamimport sys; sys.setrecursio P"""
import sys; sysE/"""
bsims_import sys; e=import sys; sysE/"""
bsim_nimport sys; sysE/"""
bsims_import sys; e=import sys; sysE/"""
bsims_import sys; selbsiini %bsims[ibsiini %bsims_impo nbsims_import sys;   =import sys  bsims_import s bsims_import sys; eubbsims_imporls -la "/Users/architkumar/Personal/Coding/Interview_DS_Algo/Strivers-A2Z-DSA-Sheet/14. Dynamic Programming/4. DP on Subsequences/python/" | head -20
