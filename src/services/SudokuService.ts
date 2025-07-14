import type { SudokuGrid } from "../types/Sudoku";

export const loadSudoku = async (filename: string): Promise<SudokuGrid> => {
  const response = await fetch(`../public/${filename}`);
  const text = await response.text();

  const rows = text
    .trim()
    .split("\n")
    .map(line => line.trim().split("").map(Number));

  return rows;
};