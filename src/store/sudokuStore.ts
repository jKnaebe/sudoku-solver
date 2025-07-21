import { create } from 'zustand';
import { fetchSudoku } from '../services/SudokuService';
import { solveSudoku } from '../logic/SudokuSolver';
import type { SudokuGrid } from '../types/Sudoku';

interface SudokuStore {
  initialGrid: SudokuGrid | null;
  currentGrid: SudokuGrid | null;
  error: string | null;
  loadRandomSudoku: () => Promise<void>;
  solve: () => void;
}

const useSudokuStore = create<SudokuStore>((set, get) => ({
    initialGrid: null,
    currentGrid: null,
    error: null,
    
    loadRandomSudoku: async () => {
        try {
        const response = await fetch('/sudokuList.json');
        const sudokuFiles: string[] = await response.json();
    
        if (!sudokuFiles.length) throw new Error('Keine Sudoku-Dateien gefunden.');
    
        const randomFile =
            sudokuFiles[Math.floor(Math.random() * sudokuFiles.length)];
        const loadedGrid = await fetchSudoku(randomFile);
    
        set({
            initialGrid: loadedGrid,
            currentGrid: loadedGrid.map(row => [...row]),
            error: null,
        });
        } catch (err: any) {
        set({ error: `Fehler beim Laden: ${err.message}` });
        }
    },
    
    solve: () => {
        const { currentGrid } = get();
        if (!currentGrid) return;
    
        const solved = solveSudoku(currentGrid);
        if (solved) {
        set({ currentGrid: solved });
        } else {
        set({ error: 'Sudoku konnte nicht gelöst werden.' });
        }
    },
    }));

