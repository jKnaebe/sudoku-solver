import React, { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import { fetchSudoku } from './services/SudokuService';
import { solveSudoku } from './logic/SudokuSolver';
import type { SudokuGrid as GridType } from './types/Sudoku';

const App: React.FC = () => {
  const [initialGrid, setInitialGrid] = useState<GridType | null>(null);
  const [currentGrid, setCurrentGrid] = useState<GridType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sudokuFiles = ['sudoku1.txt', 'sudoku2.txt'];

  const handleLoad = async () => {
    try {
      const randomFile =
        sudokuFiles[Math.floor(Math.random() * sudokuFiles.length)];
      const loadedGrid = await fetchSudoku(`${randomFile}`);
      setInitialGrid(loadedGrid);
      // Tiefe Kopie für den aktuellen Zustand
      setCurrentGrid(loadedGrid.map(row => [...row]));
      setError(null);
    } catch (err: any) {
      setError(`Fehler beim Laden: ${err.message}`);
    }
  };

  const handleSolve = () => {
    if (!currentGrid) return;
    const solved = solveSudoku(currentGrid);
    if (solved) {
      setCurrentGrid(solved);
    } else {
      setError('Sudoku konnte nicht gelöst werden.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleLoad}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Laden
        </button>
        <button
          onClick={handleSolve}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Lösen
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {initialGrid && currentGrid && (
        <SudokuGrid grid={currentGrid} initialGrid={initialGrid} />
      )}
    </div>
  );
};

export default App;
