import { createNmorphEmojiLocale } from '../base';

const categories = {
  Smileys: 'Смайлы',
  People: 'Люди',
  Animals: 'Животные',
  Nature: 'Природа',
  Food: 'Еда',
  Activity: 'Активность',
  Travel: 'Путешествия',
  Objects: 'Предметы',
  Symbols: 'Символы',
  Flags: 'Флаги',
};

export default createNmorphEmojiLocale({
  language: 'ru',
  groups: {
    Smileys: { label: categories.Smileys, tags: ['лицо', 'улыбка', 'эмоция'] },
    People: { label: categories.People, tags: ['человек', 'жест', 'тело'] },
    Animals: { label: categories.Animals, tags: ['животное', 'природа'] },
    Nature: { label: categories.Nature, tags: ['растение', 'погода', 'природа'] },
    Food: { label: categories.Food, tags: ['еда', 'напиток'] },
    Activity: { label: categories.Activity, tags: ['активность', 'спорт', 'игра'] },
    Travel: { label: categories.Travel, tags: ['путешествие', 'место', 'транспорт'] },
    Objects: { label: categories.Objects, tags: ['предмет', 'инструмент', 'устройство'] },
    Symbols: { label: categories.Symbols, tags: ['символ', 'сердце', 'знак'] },
    Flags: { label: categories.Flags, tags: ['флаг', 'страна'] },
  },
  i18n: {
    searchPlaceholder: 'Поиск эмодзи',
    searchLabel: 'Поиск эмодзи',
    quickLabel: 'Частые реакции',
    expandLabel: 'Открыть эмодзи',
    collapseLabel: 'Свернуть эмодзи',
    noResults: 'Эмодзи не найдены',
    categoryLabel: 'Категории эмодзи',
    resultsLabel: 'Результаты эмодзи',
    categories,
  },
});
