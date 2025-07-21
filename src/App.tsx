import { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import Button from './components/Button';
import { fetchSudoku } from './services/SudokuService';
import { solveSudoku } from './logic/SudokuSolver';
import type { SudokuGrid as GridType } from './types/Sudoku';

const App = () => {
  const [initialGrid, setInitialGrid] = useState<GridType | null>(null);
  const [currentGrid, setCurrentGrid] = useState<GridType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = async () => {
    try {
      const response = await fetch('/sudokuList.json');
      const sudokuFiles: string[] = await response.json();

      if (!sudokuFiles.length) throw new Error('Keine Sudoku-Dateien gefunden.');

      const randomFile =
        sudokuFiles[Math.floor(Math.random() * sudokuFiles.length)];
      const loadedGrid = await fetchSudoku(randomFile);

      setInitialGrid(loadedGrid);
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
        <Button onClick={handleLoad} variant="loadButton">Laden</Button>
        <Button onClick={handleSolve} variant="solveButton">Lösen</Button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {initialGrid && currentGrid && (
        <SudokuGrid grid={currentGrid} initialGrid={initialGrid} />
      )}
    </div>
  );
};

export default App;
