import React from "react";
import type { SudokuGrid as Grid } from "../types/Sudoku";

interface Props {
  grid: Grid;
}

export const SudokuGrid: React.FC<Props> = ({ grid }) => {
  return (
    <div className="grid grid-cols-9 gap-0.5">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isPrefilled = cell !== 0;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 flex items-center justify-center border text-lg ${
                isPrefilled ? "bg-gray-100 font-bold" : "bg-white"
              }`}
            >
              {cell !== 0 ? cell : ""}
            </div>
          );
        })
      )}
    </div>
  );
};