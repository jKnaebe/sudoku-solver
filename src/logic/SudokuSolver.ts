export function solveSudoku(grid: number[][]): number[][] {
  const result = grid.map(row => [...row]);
  let changed: boolean;

  do {
    changed = false;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (result[row][col] !== 0) continue;

        const candidates = getCandidates(result, row, col);

        // Wenn nur eine Zahl passt, wird diese direkt eingetragen
        if (candidates.length === 1) {
          result[row][col] = candidates[0];
          changed = true;
        }
      }
    }

    // Wenn es mehrere Kandidaten gibt für dieses Feld, aber trotzdem ermittelt wird das eine Zahl hier reinkommt
    for (let num = 1; num <= 9; num++) {
      //Durchlaufen aller Zeilen
      for (let row = 0; row < 9; row++) {
        const positions = [];
        for (let col = 0; col < 9; col++) {
          if (result[row][col] === 0 && getCandidates(result, row, col).includes(num)) {
            positions.push(col);
          }
        }
        if (positions.length === 1) {
          result[row][positions[0]] = num;
          changed = true;
        }
      }

      // Durchlaufen aller Spalten
      for (let col = 0; col < 9; col++) {
        const positions = [];
        for (let row = 0; row < 9; row++) {
          if (result[row][col] === 0 && getCandidates(result, row, col).includes(num)) {
            positions.push(row);
          }
        }
        if (positions.length === 1) {
          result[positions[0]][col] = num;
          changed = true;
        }
      }

      // Durchlaufen aller 3x3 Blöcke
      for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
          const positions = [];
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              const row = blockRow * 3 + i;
              const col = blockCol * 3 + j;
              if (result[row][col] === 0 && getCandidates(result, row, col).includes(num)) {
                positions.push({ row, col });
              }
            }
          }
          if (positions.length === 1) {
            const { row, col } = positions[0];
            result[row][col] = num;
            changed = true;
          }
        }
      }
    }
  } while (changed);

  return result;
}

function getCandidates(grid: number[][], row: number, col: number): number[] {
  if (grid[row][col] !== 0) return [];

  const used = new Set<number>();

  for (let i = 0; i < 9; i++) {
    used.add(grid[row][i]); // Row
    used.add(grid[i][col]); // Column
  }

  const blockRow = Math.floor(row / 3) * 3;
  const blockCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      used.add(grid[blockRow + i][blockCol + j]);
    }
  }

  return Array.from({ length: 9 }, (_, i) => i + 1).filter(n => !used.has(n));
}