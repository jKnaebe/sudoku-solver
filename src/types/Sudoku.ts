export type SudokuGrid = number[][];

export interface SudokuPuzzle {
  id: string;
  grid: SudokuGrid;
}