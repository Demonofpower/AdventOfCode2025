count = 0

with open("input.txt") as f:
    grid = [[c == '@' for c in line.strip()] for line in f]

    for y in range(len(grid)):
        for x in range(len(grid[0])):
            cell = grid[y][x]
            if cell == 0: continue

            neighbors = 0

            for dy in [-1, 0, 1]:
                for dx in [-1, 0, 1]:
                    if dy == 0 and dx == 0:
                        continue
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < len(grid) and 0 <= nx < len(grid[0]):
                        neighbors += grid[ny][nx]

            if neighbors < 4:
                count += 1

print(count)
