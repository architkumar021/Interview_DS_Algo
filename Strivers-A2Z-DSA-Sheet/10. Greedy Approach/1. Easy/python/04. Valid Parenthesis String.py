"""
QUESTION:
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.
The following rules define a valid string:
- Any left parenthesis '(' must have a corresponding right parenthesis ')'.
- Any right parenthesis ')' must have a corresponding left parenthesis '('.
- Left parenthesis '(' must go before the corresponding right parenthesis ')'.
- '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example:
Input: s = "(*))"
Output: true

APPROACH:
- Use two counters: `cmin` (minimum possible open parentheses) and `cmax` (maximum possible open parentheses).
- For '(': Both cmin and cmax increase (definite open).
- For ')': Both decrease, but cmin can't go below 0 (we can ignore extra ')' if '*' treated as '(').
- For '*': cmax increases (treating as '('), cmin decreases but stays >= 0 (treating as ')' or empty).
- If cmax < 0 at any point, even treating all '*' as '(' can't balance.
- At end, cmin must be 0 for valid string.

COMPLEXITY ANALYSIS:
- Time Complexity: O(N) - Single pass through the string.
- Space Complexity: O(1) - Only using constant extra space.
"""


def check_valid_string(s: str) -> bool:
    """
    Check if the string with parentheses and wildcards is valid.

    Args:
        s: String containing '(', ')' and '*'

    Returns:
        True if string is valid, False otherwise
    """
    cmin = 0  # Minimum possible open parentheses
    cmax = 0  # Maximum possible open parentheses

    for char in s:
        if char == '(':
            # Definite open parenthesis
            cmin += 1
            cmax += 1
        elif char == ')':
            # Definite close parenthesis
            cmax -= 1
            cmin = max(cmin - 1, 0)
        else:
            # '*' can be '(', ')', or empty
            cmax += 1  # Treat '*' as '('
            cmin = max(cmin - 1, 0)  # Treat '*' as ')' or empty

        # If cmax < 0, even treating all '*' as '(' can't balance
        if cmax < 0:
            return False

    # cmin should be 0 for a valid string
    return cmin == 0


# Example usage:
# print(check_valid_string("(*)"))  # Output: True
# print(check_valid_string("(*))"))  # Output: True
# print(check_valid_string("(((*))"))  # Output: True
# print(check_valid_string("((((*))"))  # Output: False

