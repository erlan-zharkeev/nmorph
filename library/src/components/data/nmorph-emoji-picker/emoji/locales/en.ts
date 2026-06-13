import { createNmorphEmojiLocale } from '../base';

const categories = {
  Smileys: 'Smileys',
  People: 'People',
  Animals: 'Animals',
  Nature: 'Nature',
  Food: 'Food',
  Activity: 'Activity',
  Travel: 'Travel',
  Objects: 'Objects',
  Symbols: 'Symbols',
  Flags: 'Flags',
};

export default createNmorphEmojiLocale({
  language: 'en',
  groups: {
    Smileys: { label: categories.Smileys, tags: ['face', 'smile', 'emotion'] },
    People: { label: categories.People, tags: ['person', 'gesture', 'body'] },
    Animals: { label: categories.Animals, tags: ['animal', 'nature'] },
    Nature: { label: categories.Nature, tags: ['plant', 'weather', 'nature'] },
    Food: { label: categories.Food, tags: ['food', 'drink'] },
    Activity: { label: categories.Activity, tags: ['activity', 'sport', 'game'] },
    Travel: { label: categories.Travel, tags: ['travel', 'place', 'vehicle'] },
    Objects: { label: categories.Objects, tags: ['object', 'tool', 'device'] },
    Symbols: { label: categories.Symbols, tags: ['symbol', 'heart', 'sign'] },
    Flags: { label: categories.Flags, tags: ['flag', 'country'] },
  },
  i18n: {
    searchPlaceholder: 'Search emoji',
    searchLabel: 'Search emoji',
    quickLabel: 'Frequent reactions',
    expandLabel: 'Open emoji picker',
    collapseLabel: 'Collapse emoji picker',
    noResults: 'No emoji found',
    categoryLabel: 'Emoji categories',
    resultsLabel: 'Emoji results',
    categories,
  },
});
