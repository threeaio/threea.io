import fs from "fs/promises";
import path from "path";

async function collectFiles(startDirectory) {
  let fileContent = "";
  let structureContent = "";
  const startPath = path.resolve(startDirectory);

  // Sammle alle Dateien rekursiv
  async function getAllFiles(dir, fileList = [], level = 0) {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      const relativePath = path.relative(startPath, filePath);

      if (stat.isDirectory()) {
        // Füge Verzeichnis zur Struktur hinzu
        structureContent += "  ".repeat(level) + "📁 " + file + "\n";
        await getAllFiles(filePath, fileList, level + 1);
      } else {
        // Füge Datei zur Struktur hinzu
        structureContent += "  ".repeat(level) + "📄 " + file + "\n";
        fileList.push({
          fullPath: filePath,
          relativePath: relativePath,
        });
      }
    }

    return fileList;
  }

  try {
    // Sammle alle Dateipfade
    const files = await getAllFiles(startDirectory);

    // Erstelle den Inhalt für beide Dateien
    for (const file of files) {
      const content = await fs.readFile(file.fullPath, "utf8");
      fileContent += `\n=== ${file.relativePath} ===\n\n`;
      fileContent += content;
      fileContent += "\n\n";
    }

    // Schreibe die Dateien
    await fs.writeFile("collected_files.txt", fileContent);
    await fs.writeFile("structure.txt", structureContent);

    console.log("Dateien wurden erfolgreich erstellt:");
    console.log("- collected_files.txt (Enthält alle Dateiinhalte)");
    console.log("- structure.txt (Enthält die Verzeichnisstruktur)");
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten:", error);
  }
}

// Beispielaufruf
const searchDir = "src"; // Passe diesen Pfad an
collectFiles(searchDir);
