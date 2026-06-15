const fs = require('fs');
const appPath = '/Users/green/Desktop/Portfolio/src/App.tsx';
const appContent = fs.readFileSync(appPath, 'utf8');

const modalStartIdx = appContent.indexOf('const ProjectModal: React.FC<{');
const appStartIdx = appContent.indexOf('export default function App() {');

if (modalStartIdx === -1 || appStartIdx === -1) {
  console.log("Could not find component boundaries.");
  process.exit(1);
}

// 1. App.tsx Top part
let topPart = appContent.substring(0, modalStartIdx);
// Add export to all constants so they can be imported elsewhere
topPart = topPart.replace(/^const ([A-Z0-9_]+)\s*=/gm, 'export const $1 =');

// 2. Write to types_constants.ts
fs.writeFileSync('/Users/green/Desktop/Portfolio/src/types_constants.ts', topPart, 'utf8');

// 3. ProjectModal part
let modalPart = appContent.substring(modalStartIdx, appStartIdx);
// Make it default export or named export
modalPart = modalPart.replace('const ProjectModal: React.FC<{', 'export const ProjectModal: React.FC<{');

// Get all named exports from topPart to import them in ProjectModal and App
const exportRegex = /export (?:const|interface|type) ([a-zA-Z0-9_]+)/g;
let match;
const exportedNames = [];
while ((match = exportRegex.exec(topPart)) !== null) {
  if(match[1] !== 'ProjectModal' && match[1] !== 'App') {
    exportedNames.push(match[1]);
  }
}
const exportList = exportedNames.join(', ');

// Prepare ProjectModal.tsx
const importSection = topPart.match(/import[\s\S]*?(?:['"];?\n)/g)?.join('') || '';
const modalFileContent = `${importSection}
import { ${exportList} } from "../types_constants";

${modalPart}
`;
fs.writeFileSync('/Users/green/Desktop/Portfolio/src/components/ProjectModal.tsx', modalFileContent, 'utf8');

// 4. App part
const appPart = appContent.substring(appStartIdx);

// Prepare new App.tsx
const newAppContent = `${importSection}
import { ${exportList} } from "./types_constants";
import { ProjectModal } from "./components/ProjectModal";

${appPart}
`;
fs.writeFileSync('/Users/green/Desktop/Portfolio/src/App.tsx', newAppContent, 'utf8');

console.log("Refactoring successful!");
