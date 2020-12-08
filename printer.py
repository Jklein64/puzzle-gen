from __future__ import annotations
from sys import argv, stdout
from math import ceil, floor, sqrt
from itertools import islice
from typing import Iterable
from string import ascii_uppercase

line = argv[1]

def calc_size(length: int) -> tuple[int, tuple[int, int]]:
    def factor(n: int) -> list[int]:
        return [i for i in range(1, n+1) if n % i == 0]

    whole = int(sqrt(length))
    factors = factor(whole)
    perfect_sq = sqrt(whole) == int(sqrt(whole))
    sub: tuple[int, int] = tuple([int(sqrt(whole))] * 2) if perfect_sq else tuple(
        sorted(factors, key=lambda v: abs(v - sqrt(whole)))[0:2])
    if sub[0] < sub[1]:
        sub = sub[1], sub[0]
    return whole, sub

def calc_symbol_set(length: int) -> set[str]:
    return set([*"123456789", *ascii_uppercase][:int(sqrt(length))])

# def create_puzzle(line: str):
size, (sub_w, sub_h) = calc_size(len(line))
symbols = calc_symbol_set(len(line))
board = ["".join(symbols) if ch == "." else ch for ch in line]


# def print_puzzle(board: list[str], size: int, sub_w: int, sub_h: int, symbols: set[str]) -> None:
def chunk(it: Iterable[str], size: int):
    it2 = iter(it)
    return list(iter(lambda: tuple(islice(it2, size)), ()))

def pad(s: str) -> str:
    spaces = len(symbols) - len(s)
    if spaces == 0:
        return " " + s + " "
    left_s = ceil(spaces/2)
    right_s = floor(spaces/2)
    return " " + " "*left_s + s + " "*right_s + " "

rows = ["||".join("|".join(pad(c if len(c) == 1 else ".") for c in ch) for ch in r)
        for r in [chunk(row, size//sub_w) for row in chunk(board, size)]]
formatted = ("\n"+"="*len(rows[0])+"\n").join(
    "\n".join(c) for c in chunk(rows, size//sub_h))

print(formatted)
stdout.flush()