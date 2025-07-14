import type { SudokuGrid } from "../types/Sudoku";

export function solveSudoku(grid: SudokuGrid): SudokuGrid {
  const possible = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>())
  );

  const result = grid.map(row => [...row]);

  let changed: boolean;

  do {
    changed = false;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (result[row][col] !== 0) continue;

        const used = new Set<number>();

        for (let i = 0; i < 9; i++) {
          used.add(result[row][i]);
          used.add(result[i][col]);
        }

        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            used.add(result[boxRow + i][boxCol + j]);
          }
        }

        const options = Array.from({ length: 9 }, (_, i) => i + 1).filter(
          n => !used.has(n)
        );

        if (options.length === 1) {
          result[row][col] = options[0];
          changed = true;
        }
      }
    }
  } while (changed);

  return result;
}