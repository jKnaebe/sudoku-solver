export async function fetchSudoku(fileName: string): Promise<number[][]> {
  const response = await fetch(`/${fileName}`);
  const text = await response.text();

  const grid = text
    .trim()
    .split("\n")
    .map(line => line.split("").map(char => parseInt(char, 10)));

  return grid;
}