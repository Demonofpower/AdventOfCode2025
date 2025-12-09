#!/bin/bash

mapfile -t lines < input.txt

rows=${#lines[@]}
for ((row = 0; row < rows; row++)); do
    line="${lines[row]}"
    for ((col = 0; col < ${#line}; col++)); do
        if [[ "${line:col:1}" == "S" ]]; then
            start_col=$col
            start_row=$row
            break 2
        fi
    done
done

beam_cols="$start_col"
splits=0

for ((row = start_row + 1; row < rows; row++)); do
    line="${lines[row]}"
    cols=${#line}
    declare -A new_beams
    
    for col in $beam_cols; do
        char="${line:col:1}"
        if [[ "$char" == "^" ]]; then
            ((splits++))
            left=$((col - 1))
            right=$((col + 1))
            ((left >= 0)) && new_beams[$left]=1
            ((right < cols)) && new_beams[$right]=1
        else
            new_beams[$col]=1
        fi
    done
    
    beam_cols="${!new_beams[*]}"
    unset new_beams
done

echo $splits
