import React, { useState } from "react";
import type { SudokuGrid as Grid } from "./types/Sudoku";
import { fetchSudokuById } from "./services/SudokuService";
import { solveSudoku } from "./logic/SudokuSolver";
import { SudokuGrid } from "./components/sudokuGrid";

const MAX_SUDOKUS = 3;

const App: React.FC = () => {
  const [current, setCurrent] = useState<Grid | null>(null);

  const handleLoad = async () => {
    const randomId = Math.floor(Math.random() * MAX_SUDOKUS) + 1;
    try {
      const sudoku = await fetchSudokuById(randomId);
      setCurrent(sudoku.grid.map(row => [...row])); // Deep Copy
    } catch (err) {
      alert("Fehler beim Laden des Sudokus");
    }
  };

  const handleSolve = () => {
    if (!current) return;
    const solved = solveSudoku(current);
    if (solved) {
      setCurrent(solved);
    } else {
      alert("Keine eindeutige Lösung gefunden!");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4">
        <button onClick={handleLoad} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sudoku laden
        </button>
        <button onClick={handleSolve} className="bg-green-500 text-white px-4 py-2 rounded">
          Lösen
        </button>
      </div>

      {current && <SudokuGrid grid={current} />}
    </div>
  );
};

export default App;
