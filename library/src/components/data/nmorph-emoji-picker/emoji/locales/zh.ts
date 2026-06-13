import { createNmorphEmojiLocale } from '../base';

const categories = {
  Smileys: '笑脸',
  People: '人物',
  Animals: '动物',
  Nature: '自然',
  Food: '食物',
  Activity: '活动',
  Travel: '旅行',
  Objects: '物品',
  Symbols: '符号',
  Flags: '旗帜',
};

export default createNmorphEmojiLocale({
  language: 'zh',
  groups: {
    Smileys: { label: categories.Smileys, tags: ['表情', '微笑', '情绪'] },
    People: { label: categories.People, tags: ['人物', '手势', '身体'] },
    Animals: { label: categories.Animals, tags: ['动物', '自然'] },
    Nature: { label: categories.Nature, tags: ['植物', '天气', '自然'] },
    Food: { label: categories.Food, tags: ['食物', '饮料'] },
    Activity: { label: categories.Activity, tags: ['活动', '运动', '游戏'] },
    Travel: { label: categories.Travel, tags: ['旅行', '地点', '交通'] },
    Objects: { label: categories.Objects, tags: ['物品', '工具', '设备'] },
    Symbols: { label: categories.Symbols, tags: ['符号', '爱心', '标志'] },
    Flags: { label: categories.Flags, tags: ['旗帜', '国家'] },
  },
  i18n: {
    searchPlaceholder: '搜索表情',
    searchLabel: '搜索表情',
    quickLabel: '常用反应',
    expandLabel: '打开表情选择器',
    collapseLabel: '收起表情选择器',
    noResults: '没有找到表情',
    categoryLabel: '表情分类',
    resultsLabel: '表情结果',
    categories,
  },
});
