const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const outputFile = path.join(publicDir, 'sudokuList.json');

fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error('Fehler beim Lesen des public-Ordners:', err);
    return;
  }

  const sudokuFiles = files.filter(file => file.endsWith('.txt'));

  fs.writeFile(outputFile, JSON.stringify(sudokuFiles, null, 2), err => {
    if (err) {
      console.error('Fehler beim Schreiben der sudokuList.json:', err);
    } else {
      console.log(`✅ sudokuList.json mit ${sudokuFiles.length} Dateien erstellt.`);
    }
  });
});