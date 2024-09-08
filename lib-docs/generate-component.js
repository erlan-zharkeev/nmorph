import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  generateAttribute,
  generateIndex,
  generatePageContent,
  generateApiContent,
  generateNewCategoryObject,
} from "./generate-templates.js";
import { capitalizeFirstChar, camelToKebab, anyToPascalCase } from "@nmorph/nmorph-ui-kit";
import en from "./locales/en.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const componentName = args[0];
const attributes = args[1] ? args[1].split(",") : [];
const category = args[2];

if (!componentName) {
  console.error("Ошибка: Имя компонента не указано.");
  process.exit(1);
}

if (attributes.length <= 0) {
  console.error("Ошибка: Не указан атрибут.");
  process.exit(1);
}

if (!category) {
  console.error("Ошибка: Не указана категория");
  process.exit(1);
}

const createComponentPage = () => {
  const pagesFolder = path.resolve(__dirname, "pages/components");

  const componentFilePath = path.join(pagesFolder, `${componentName}.vue`);

  // Проверка на существование файла с таким именем
  if (fs.existsSync(componentFilePath)) {
    console.error(`Ошибка: Файл ${componentName}.vue уже существует.`);
    process.exit(1);
  }

  const pageComponent = generatePageContent(componentName);

  fs.writeFileSync(path.join(pagesFolder, `${componentName}.vue`), pageComponent);
};

const updateComponentOverviewFile = () => {
  const componentOverviewFile = path.resolve(
    __dirname,
    "components/component-overview/component-overview.vue"
  );

  if (!fs.existsSync(componentOverviewFile)) {
    console.error(`Ошибка: Файл ${componentOverviewFile} не найден.`);
    process.exit(1);
  }

  let fileContent = fs.readFileSync(componentOverviewFile, "utf8");

  // Вставляем новый импорт после последнего import
  const importRegex = /import\s+.*from\s+['"].*['"];\n?/g;
  const lastImportMatch = [...fileContent.matchAll(importRegex)].pop();

  if (lastImportMatch) {
    const lastImportEndIndex =
      lastImportMatch.index + lastImportMatch[0].length;
    const newImportStatement = `import ${componentName} from "~/lib-overview/${componentName}";\n`;
    fileContent =
      fileContent.slice(0, lastImportEndIndex) +
      newImportStatement +
      fileContent.slice(lastImportEndIndex);
  } else {
    console.error("Ошибка: Не найден ни один import.");
    process.exit(1);
  }

  // Обновляем componentsMap
  const mapRegex =
    /const\s+componentsMap\s*:\s*Record<string,\s*unknown\[]>\s*=\s*{([\s\S]*?)};/;
  const match = fileContent.match(mapRegex);

  if (match) {
    const componentsMapContent = match[1];

    // Проверяем, есть ли компонент уже в componentsMap
    if (!componentsMapContent.includes(componentName)) {
      const newComponentEntry = `  ${componentName},\n`;
      const updatedComponentsMapContent =
        componentsMapContent + newComponentEntry;
      fileContent = fileContent.replace(
        mapRegex,
        `const componentsMap: Record<string, unknown[]> = {${updatedComponentsMapContent}};`
      );
    }
    fs.writeFileSync(componentOverviewFile, fileContent);
    console.log(`Компонент ${componentName} добавлен в componentsMap.`);
  } else {
    console.error(
      "Ошибка: Не найден объект componentsMap. Проверьте структуру файла."
    );
    process.exit(1);
  }
};

const createLibOverviewComponentFolder = () => {
  const componentDir = path.resolve(__dirname, "lib-overview", componentName);
  const attributesDir = path.join(componentDir, "attributes");

  if (fs.existsSync(componentDir)) {
    console.error(`Ошибка: Папка ${componentName} уже существует.`);
    process.exit(1);
  }

  fs.mkdirSync(componentDir, { recursive: true });
  fs.mkdirSync(attributesDir, { recursive: true });

  const apiContent = generateApiContent(attributes, componentName);
  const indexContent = generateIndex();

  fs.writeFileSync(path.join(componentDir, "api.vue"), apiContent);
  fs.writeFileSync(path.join(componentDir, "index.ts"), indexContent);

  const attributeImports = [];
  attributes.forEach((attribute) => {
    const pascalAttribute = anyToPascalCase(attribute);
    const kebabAttribute = camelToKebab(attribute);

    const attributeFileContent = generateAttribute(componentName, attribute);
    const attributeFilePath = path.join(attributesDir, `${kebabAttribute}.vue`);
    fs.writeFileSync(attributeFilePath, attributeFileContent);

    attributeImports.push(`import ${pascalAttribute} from "./${kebabAttribute}.vue";`);
  });

  const attributesIndexContent = `
${attributeImports.join('\n')}

export const Attributes = [
  ${attributes.map(attr => anyToPascalCase(attr)).join(',\n  ')}
];
  `;

  fs.writeFileSync(path.join(attributesDir, 'index.ts'), attributesIndexContent.trim());

  console.log(
    `Папка для компонента ${componentName} и файлы attributes созданы в kebab-case.`
  );
};

const updateComponentList = () => {
  const componentListFile = path.resolve(
    __dirname,
    "components/component-list/component-list.vue"
  );

  if (!fs.existsSync(componentListFile)) {
    console.error(`Ошибка: Файл ${componentListFile} не найден.`);
    process.exit(1);
  }

  let fileContent = fs.readFileSync(componentListFile, "utf8");

  // Найдем нужный блок (категорию) и добавим в него компонент
  const listRegex = /const\s+list\s*:\s*\{[\s\S]*?\}\[\]\s*=\s*\[([\s\S]*?)\];/;
  const match = fileContent.match(listRegex);

  const fullName = `"Nmorph${capitalizeFirstChar(componentName)}"`;

  if (match) {
    let listContent = match[1];

    // Найдем нужную категорию
    const categoryRegex = new RegExp(
      `\\{\\s*name:\\s*"${category}"[\\s\\S]*?components:\\s*\\[(.*?)\\]`,
      "s"
    );
    const categoryMatch = listContent.match(categoryRegex);

    if (categoryMatch) {
      let componentsList = categoryMatch[1];

      // Проверим, есть ли компонент уже в списке
      if (!componentsList.includes(fullName)) {
        // Добавим компонент в конец списка
        componentsList += componentsList.trim()
          ? `, ${fullName}`
          : `${fullName}`;

        // Обновим содержимое категории
        const updatedCategory = categoryMatch[0].replace(
          categoryMatch[1],
          componentsList
        );
        listContent = listContent.replace(categoryMatch[0], updatedCategory);

        console.log(`Компонент ${fullName} добавлен в категорию ${category}.`);
      } else {
        console.log(
          `Компонент ${fullName} уже существует в категории ${category}.`
        );
      }
    } else {
      const newCategory = generateNewCategoryObject(category, fullName);
      listContent += newCategory;
      console.log(
        `Добавлена новая категория ${category} с компонентом ${fullName}.`
      );
    }
    const updatedFileContent = fileContent.replace(
      listRegex,
      `const list: { name: string; components: string[] }[] = [${listContent}];`
    );
    fs.writeFileSync(componentListFile, updatedFileContent);
  } else {
    console.error(
      "Ошибка: Не найден список компонентов в файле component-list.vue."
    );
  }
};

const updateTranslators = () => {
  const enFilePath = path.resolve(__dirname, 'locales/en.js');

  const overview = en.overview;

  const newComponentOverview = {};

  attributes.forEach((attribute) => {
    const key = camelToKebab(attribute);
    if (!newComponentOverview[key]) {
      newComponentOverview[key] = {};
    }
    newComponentOverview[key].subtitle = "";
  });

  attributes.forEach((attribute) => {
    const key = camelToKebab(attribute);
    if (!newComponentOverview.api) {
      newComponentOverview.api = {};
    }
    newComponentOverview.api[key] = "";
  });

  newComponentOverview.slot = {};
  newComponentOverview.variables = {};

  overview[componentName] = newComponentOverview;

  en.overview = overview;

  const translate = `export default ${JSON.stringify(en, null, 2)};`;

  fs.writeFileSync(enFilePath, translate, 'utf8');
};

updateComponentList();
updateComponentOverviewFile();
createLibOverviewComponentFolder();
updateTranslators();
createComponentPage();

console.log(`Компонент ${componentName} создан`);
