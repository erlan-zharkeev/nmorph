import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../');
const componentsDir = path.join(rootDir, 'node_modules', '@nmorph', 'nmorph-ui-kit', 'dist', 'components');

const validCategories = ['basic', 'data', 'feedback', 'form', 'navigation', 'others'];

function getCategoryFromPath(filePath) {
  if (filePath.includes(path.sep + 'inner-components' + path.sep)) {
    return null;
  }
  for (let category of validCategories) {
    if (filePath.includes(path.sep + category + path.sep)) {
      return category;
    }
  }
  return null;
}

function getComponents(dir, rootDir) {
  let components = [];

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      components = components.concat(getComponents(filePath, rootDir));
    } else if (file.endsWith('.vue.d.ts')) {
      let componentName = file.replace('.vue.d.ts', '');
      const relativePath = path.relative(rootDir, filePath);
      const category = getCategoryFromPath(filePath);
      if (category) {
        // Удаление префикса nmorph- из имени компонента
        if (componentName.startsWith('nmorph-')) {
          componentName = componentName.replace('nmorph-', '');
        }
        components.push({
          name: componentName,
          path: relativePath,
          category: category
        });
      }
    }
  });

  return components;
}

const components = getComponents(componentsDir, rootDir);

const componentsByCategory = components.reduce((acc, component) => {
  if (!acc[component.category]) {
    acc[component.category] = [];
  }
  acc[component.category].push(component.name);
  return acc;
}, {});

const componentsArray = Object.keys(componentsByCategory).map(category => ({
  name: category,
  components: componentsByCategory[category]
}));

const componentsJson = JSON.stringify(componentsArray, null, 2);
const exportString = `export default ${componentsJson}`;
const filePath = path.join(__dirname, 'list.ts');

fs.writeFileSync(filePath, exportString);

// Run Prettier
exec(`npx prettier --write "${filePath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error('Error running Prettier:', stderr);
  } else {
    console.log('Prettier has formatted the file:', stdout);
  }
});

console.log('\x1b[32m%s\x1b[0m', 'Components list has been generated and formatted with Prettier, then saved to list.ts');
