import React from 'react';
import type { SudokuGrid as Grid } from '../types/Sudoku';

interface SudokuGridProps {
  grid: Grid;
  initialGrid: Grid;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, initialGrid }) => {
  return (
    <div className="inline-grid grid-cols-9 border border-black">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isTopBorderThick = rowIndex % 3 === 0;
          const isLeftBorderThick = colIndex % 3 === 0;
          const isRightEdge = colIndex === 8;
          const isBottomEdge = rowIndex === 8;

          const isGiven = initialGrid[rowIndex][colIndex] !== 0;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-10 h-10 flex items-center justify-center text-lg
                ${isGiven ? 'bg-gray-200 font-bold' : 'bg-white'}
                ${isTopBorderThick ? 'border-t-2' : 'border-t'}
                ${isLeftBorderThick ? 'border-l-2' : 'border-l'}
                ${isRightEdge ? 'border-r-2' : ''}
                ${isBottomEdge ? 'border-b-2' : ''}
                border-black
              `}
            >
              {cell !== 0 ? cell : ''}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuGrid;
