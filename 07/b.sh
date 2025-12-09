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

declare -A beam_counts
beam_counts[$start_col]=1

for ((row = start_row + 1; row < rows; row++)); do
    line="${lines[row]}"
    cols=${#line}
    declare -A new_counts
    
    for col in "${!beam_counts[@]}"; do
        count=${beam_counts[$col]}
        char="${line:col:1}"
        if [[ "$char" == "^" ]]; then
            left=$((col - 1))
            right=$((col + 1))
            ((left >= 0)) && ((new_counts[$left] += count))
            ((right < cols)) && ((new_counts[$right] += count))
        else
            ((new_counts[$col] += count))
        fi
    done
    
    unset beam_counts
    declare -A beam_counts
    for col in "${!new_counts[@]}"; do
        beam_counts[$col]=${new_counts[$col]}
    done
    unset new_counts
done

total=0
for count in "${beam_counts[@]}"; do
    ((total += count))
done

echo $total
