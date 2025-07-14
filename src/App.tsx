import { useState } from "react";
import { SudokuGrid } from "./components/SudokuGrid";
import { fetchSudoku } from "./services/SudokuService";
import { solveSudoku } from "./logic/SudokuSolver";
import type { SudokuGrid as Grid } from "./types/Sudoku";

const sudokuFiles = ["sudoku1.txt", "sudoku2.txt", "sudoku3.txt"];

export default function App() {
  const [grid, setGrid] = useState<Grid>(Array(9).fill(Array(9).fill(0)));

  const loadSudoku = async () => {
    const randomFile =
      sudokuFiles[Math.floor(Math.random() * sudokuFiles.length)];
    const loadedGrid = await fetchSudoku(randomFile);
    setGrid(loadedGrid);
  };

  const solve = () => {
    const solved = solveSudoku(grid);
    setGrid(solved);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={loadSudoku}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Laden
        </button>
        <button
          onClick={solve}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Lösen
        </button>
      </div>
      <SudokuGrid grid={grid} />
    </div>
  );
}