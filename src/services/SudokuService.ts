import type { SudokuPuzzle } from "../types/Sudoku";

export const fetchSudokuById = async (id: number): Promise<SudokuPuzzle> => {
  const res = await fetch(`/sudoku${id}.txt`);
  if (!res.ok) throw new Error(`Datei sudoku${id}.txt nicht gefunden`);
  const text = await res.text();

  const lines = text.trim().split("\n");
  if (lines.length !== 9) throw new Error(`Ungültiges Format in sudoku${id}.txt`);

  const grid = lines.map(line =>
    line.trim().split("").map(char => parseInt(char, 10))
  );

  return {
    id: id.toString(),
    grid,
  };
};