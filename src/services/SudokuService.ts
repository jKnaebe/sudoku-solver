export async function fetchSudoku(filename: string): Promise<number[][]> {
  const response = await fetch(`/${filename}`);

  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Datei ${filename}: ${response.statusText}`);
  }

  const content = await response.text();

  // Debug: Dateiinhalt anzeigen
  console.log(`Dateiinhalt von ${filename}:`);
  console.log(JSON.stringify(content));

  // Optional: BOM entfernen
  const withoutBOM = content.replace(/^\uFEFF/, '');

  // Ziffern extrahieren
  const digits = withoutBOM
    .split('')
    .filter((c) => c >= '0' && c <= '9')
    .map((c) => Number(c));

  console.log('Extrahierte Ziffern:', digits);
  console.log('Anzahl:', digits.length);

  if (digits.length !== 81) {
    throw new Error(
      `Fehler beim Einlesen: Erwartet 81 Ziffern, aber gefunden: ${digits.length}`
    );
  }

  const grid: number[][] = [];
  for (let i = 0; i < 9; i++) {
    grid.push(digits.slice(i * 9, i * 9 + 9));
  }

  return grid;
}
