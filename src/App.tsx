import SudokuGrid from './components/SudokuGrid';
import Button from './components/Button';
import { useSudokuStore } from './store/sudokuStore';

const App = () => {
  const {
    initialGrid,
    currentGrid,
    error,
    handleLoad: loadSudoku,
    handleSolve: solveSudoku,
  } = useSudokuStore();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
      <div className="flex gap-4 mb-4">
        <Button onClick={loadSudoku} className="bg-blue-600 hover:bg-blue-700 text-white">Laden</Button>
        <Button onClick={solveSudoku} className="bg-green-500 hover:bg-green-600 text-white">Lösen</Button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {initialGrid && currentGrid && (
        <SudokuGrid grid={currentGrid} initialGrid={initialGrid} />
      )}
    </div>
  );
};

export default App;
