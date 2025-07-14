import type { SudokuGrid } from "../types/Sudoku";

export const solveSudoku = (grid: SudokuGrid): SudokuGrid | null => {
  const newGrid = grid.map(row => [...row]); // Kopie erstellen
  let changed: boolean;

  do {
    changed = false;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newGrid[row][col] === 0) {
          const possible = getPossibleValues(newGrid, row, col);
          if (possible.length === 1) {
            newGrid[row][col] = possible[0];
            changed = true;
          }
        }
      }
    }
  } while (changed);

  return isComplete(newGrid) ? newGrid : null;
};

const getPossibleValues = (grid: SudokuGrid, row: number, col: number): number[] => {
  const used = new Set<number>();

  for (let i = 0; i < 9; i++) {
    used.add(grid[row][i]); // Zeile
    used.add(grid[i][col]); // Spalte
  }

  // 3x3 Block
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      used.add(grid[boxRow + r][boxCol + c]);
    }
  }

  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !used.has(n));
};

const isComplete = (grid: SudokuGrid): boolean =>
  grid.every(row => row.every(cell => cell !== 0));