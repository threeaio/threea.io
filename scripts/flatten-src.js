import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

async function flattenStagedFiles(srcDir, outputDir) {
  // Clean output directory
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  // Get a list of staged files
  const stagedFiles = getStagedFiles(srcDir);

  // Copy staged files to the output directory
  for (const file of stagedFiles) {
    const relativePath = path.relative(srcDir, file);
    const flattenedName = relativePath.replace(/[\\/]/g, "-");
    console.log(flattenedName.split(".").slice(0, -1).join("."));
    await fs.copyFile(file, path.join(outputDir, flattenedName));
  }
}

function getStagedFiles(directory) {
  const gitStatus = execSync("git status --porcelain", {
    cwd: directory,
  }).toString();
  console.log("gitStatus", gitStatus);
  return gitStatus
    .split("\n")
    .filter(
      (line) =>
        line.startsWith("AM ") ||
        line.startsWith(" M ") ||
        line.startsWith("A  "),
    )
    .filter((line) => !line.includes("package.json"))
    .filter((line) => !line.includes("tailwind.config"))
    .filter((line) => !line.includes("mongo-guide.md"))
    .filter((line) => !line.includes("project-documentation"))
    .map((line) => {
      const file = line.slice(3).trim().replace("src/", "");

      return file;
    })
    .map((line) => path.join(directory, line));
}

// Execute
flattenStagedFiles(path.resolve("src"), path.resolve("src-flattened")).catch(
  console.error,
);
