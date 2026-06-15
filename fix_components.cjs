const fs = require('fs');

const modalPath = '/Users/green/Desktop/Portfolio/src/components/ProjectModal.tsx';
let modalContent = fs.readFileSync(modalPath, 'utf8');

modalContent = modalContent.replace(/^const ActivityModal:/m, 'export const ActivityModal:');
modalContent = modalContent.replace(/^const roundTranslate =/m, 'export const roundTranslate =');

fs.writeFileSync(modalPath, modalContent, 'utf8');

const appPath = '/Users/green/Desktop/Portfolio/src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');

appContent = appContent.replace(
  /import\s+\{\s*ProjectModal\s*\}\s+from\s+['"]\.\/components\/ProjectModal['"];?/,
  'import { ProjectModal, ActivityModal, roundTranslate } from "./components/ProjectModal";'
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log("Fixed ActivityModal and roundTranslate");
