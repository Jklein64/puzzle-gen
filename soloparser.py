#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re


def parse(game_id):
    game_id = re.sub(".*:", "", game_id)
    game_id = re.sub("a", ".", game_id)
    game_id = re.sub("b", "..", game_id)
    game_id = re.sub("c", "...", game_id)
    game_id = re.sub("d", "....", game_id)
    game_id = re.sub("e", ".....", game_id)
    game_id = re.sub("f", "......", game_id)
    game_id = re.sub("g", ".......", game_id)
    game_id = re.sub("h", "........", game_id)
    game_id = re.sub("i", ".........", game_id)
    game_id = re.sub("j", "..........", game_id)
    game_id = re.sub("k", "...........", game_id)
    game_id = re.sub("l", "............", game_id)
    game_id = re.sub("m", ".............", game_id)
    game_id = re.sub("n", "..............", game_id)
    game_id = re.sub("o", "...............", game_id)
    game_id = re.sub("p", "................", game_id)
    game_id = re.sub("q", ".................", game_id)
    game_id = re.sub("r", "..................", game_id)
    game_id = re.sub("s", "...................", game_id)
    game_id = re.sub("t", "....................", game_id)
    game_id = re.sub("u", ".....................", game_id)
    game_id = re.sub("v", "......................", game_id)
    game_id = re.sub("w", ".......................", game_id)
    game_id = re.sub("x", "........................", game_id)
    game_id = re.sub("y", ".........................", game_id)
    game_id = re.sub("z", "..........................", game_id)
    game_id = game_id.replace("10", "A")
    game_id = game_id.replace("11", "B")
    game_id = game_id.replace("12", "C")
    game_id = game_id.replace("13", "D")
    game_id = game_id.replace("14", "E")
    game_id = game_id.replace("15", "F")
    game_id = game_id.replace("16", "G")
    game_id = game_id.replace("_", "")
    return game_id


infile = open("soloids.txt", "rt")
outfile = open("solo_sudoku_test_cases.txt", "wt")
outfile.writelines([parse(x) for x in infile.readlines()])
