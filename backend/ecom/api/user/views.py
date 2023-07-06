from django.shortcuts import render
import random


"""creates a session token of a specified length by randomly 
selecting characters from a combination of lowercase letters and numbers."""

def generate_session_token(length=10):
    return "".join(
        random.SystemRandom().choice(
            [chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]
        )
        for _ in range(10)
    )
    
    
    
    
    """
    " ".join(...) joins the characters generated in the loop into a string. 
    The string is initialized as empty since there is a pair of empty double quotes "".
random.SystemRandom().choice(...) randomly selects an element from the given list of characters.
The list comprehension [chr(i) for i in range(6, 23)] + [str(i) for i in range(10)] creates 
a list of characters. It combines lowercase letters 'a' to 'p' (chr(i) converts ASCII values
from 6 to 22) with digits 0 to 9 (str(i) converts integers from 0 to 9).
The outer for _ in range(length) loop generates the desired number of characters
based on the specified length. The loop runs length times, where each iteration 
calls random.SystemRandom().choice(...) to randomly choose a character from the list
of characters.The selected characters are concatenated into a string using the "".join(...) method.
In summary, the generate_session_token function generates a random session token
consisting of alphanumeric characters (lowercase letters 'a' to 'p' and digits 0 to 9). 
The length of the token can be specified as an argument when calling the function, 
defaulting to a length of 10 if not provided.
"""
