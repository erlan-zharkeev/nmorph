#!/bin/bash

# Установка значения по умолчанию для типа увеличения версии
VERSION_TYPE=${1:-patch}

# Допустимые типы увеличения версии
VERSION_TYPES=("patch" "minor" "major")

# Проверка правильности аргумента
if [[ ! " ${VERSION_TYPES[@]} " =~ " $VERSION_TYPE " ]]; then
  echo "Ошибка: недопустимый тип увеличения версии. Используйте patch, minor или major."
  exit 1
fi

# Увеличение версии
echo "Увеличение версии ($VERSION_TYPE)..."
NEW_VERSION=$(pnpm version $VERSION_TYPE)
NEW_VERSION=${NEW_VERSION#v}

# Проверка успешности увеличения версии
if [ $? -ne 0 ]; then
  echo "Ошибка: не удалось увеличить версию"
  exit 1
fi

# Сборка проекта
echo "Сборка проекта..."
pnpm run build

# Проверка успешности сборки
if [ $? -ne 0 ]; then
  echo "Ошибка: сборка не удалась"
  exit 1
fi

# Публикация пакета
PACKAGE_NAME=$(pnpm pkg get name | tr -d '"')
PUBLISHED_VERSION=$(pnpm view "$PACKAGE_NAME@$NEW_VERSION" version 2>/dev/null || true)

if [ "$PUBLISHED_VERSION" = "$NEW_VERSION" ]; then
  echo "Публикация не выполнена: версия $NEW_VERSION уже опубликована."
  exit 0
fi

echo "Публикация пакета..."
pnpm publish

# Проверка успешности публикации
if [ $? -ne 0 ]; then
  echo "Ошибка: не удалось опубликовать пакет"
  exit 1
fi

echo "Публикация успешно завершена!"

# Переход в директорию lib-docs
echo "Переход в директорию lib-docs..."
cd ../lib-docs

# Проверка успешности перехода
if [ $? -ne 0 ]; then
  echo "Ошибка: не удалось перейти в директорию lib-docs"
  exit 1
fi

# Установка новой версии пакета
echo "Установка новой версии пакета..."
pnpm add @nmorph/nmorph-ui-kit@$NEW_VERSION

# Проверка успешности установки
if [ $? -ne 0 ]; then
  echo "Ошибка: не удалось установить новую версию пакета"
  exit 1
fi

echo "Установка новой версии пакета успешно завершена!"

# # Переход в директорию test-app
# echo "Переход в директорию test-app..."
# cd ../test-app

# # Проверка успешности перехода
# if [ $? -ne 0 ]; then
#   echo "Ошибка: не удалось перейти в директорию test-app"
#   exit 1
# fi

# # Установка новой версии пакета в test-app
# echo "Установка новой версии пакета в test-app..."
# pnpm add @nmorph/nmorph-ui-kit@$NEW_VERSION

# # Проверка успешности установки
# if [ $? -ne 0 ]; then
#   echo "Ошибка: не удалось установить новую версию пакета в test-app"
#   exit 1
# fi

# echo "Установка новой версии пакета в test-app успешно завершена!"
