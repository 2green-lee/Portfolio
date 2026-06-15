const fs = require('fs');
const typesPath = '/Users/green/Desktop/Portfolio/src/types_constants.tsx';
let content = fs.readFileSync(typesPath, 'utf8');

const missingExports = [
  'formatCategory', 'AutoFitTitle', 'convertGithubUrl', 'getEndDateFromPeriod',
  'OptimizedImage', 'ModalCarousel', 'staggerItem', 'ProjectCard'
];

missingExports.forEach(name => {
  const regex = new RegExp(`^const ${name}`, 'm');
  content = content.replace(regex, `export const ${name}`);
});

fs.writeFileSync(typesPath, content, 'utf8');

// Also update imports in App.tsx and ProjectModal.tsx
function updateImports(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  // Find the import line from types_constants
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"](?:\.\/|\.\.\/)types_constants['"]/;
  const match = fileContent.match(importRegex);
  if (match) {
    let currentImports = match[1].split(',').map(s => s.trim()).filter(Boolean);
    let newImports = new Set([...currentImports, ...missingExports]);
    let newImportStr = Array.from(newImports).join(', ');
    fileContent = fileContent.replace(match[0], match[0].replace(match[1], ` ${newImportStr} `));
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }
}

updateImports('/Users/green/Desktop/Portfolio/src/App.tsx');
updateImports('/Users/green/Desktop/Portfolio/src/components/ProjectModal.tsx');

console.log("Fixes applied.");
