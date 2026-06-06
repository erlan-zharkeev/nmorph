# Nmorph Emoji Picker Notes

Нам нужен самописный `NmorphEmojiPicker`, который сможет заменить текущий `emoji-picker-element` в чате без доменной логики внутри UI-kit.

## Current Usage

- В чате есть два сценария:
  - footer composer: кнопка emoji открывает полный picker в dropdown и вставляет emoji в текст сообщения;
  - message reaction picker: compact picker для выбора реакции.
- Сейчас wrapper на стороне проекта отдаёт:
  - `language`;
  - `expandLabel`;
  - `initialExpanded`;
  - `select` event со строкой emoji.
- Локализация у проекта: `en`, `ru`, `zh`.
- Данные emoji сейчас лежат в `client/public/emoji/en.json`, `ru.json`, `zh.json`.

## Required API

Предпочтительный базовый API:

```vue
<NmorphEmojiPicker
  :language="language"
  :data-source="dataSource"
  :i18n="i18n"
  :quick-list="quickList"
  :initial-expanded="initialExpanded"
  @select="selectEmoji"
/>
```

Что важно:

- `select` должен возвращать только выбранный emoji как `string`.
- Компонент должен уметь стартовать в полном режиме без quick-row.
- Компонент должен уметь стартовать в compact режиме с quick-row и кнопкой раскрытия.
- Quick-list должен приходить пропом, чтобы проект мог подставлять часто используемые emoji.
- Внутри UI-kit не должно быть чтения project settings, i18n store, Dexie или localStorage проекта.
- Component-specific styling should use explicit props; nmorph CSS variables are reserved for theme and foundation tokens.

## Frequent Emoji

Нам пригодится поддержка списка часто используемых emoji, но хранить частоты лучше на стороне проекта, не внутри UI-kit.

Нужный контракт:

- `quickList?: string[]` для отображения быстрых emoji.
- `select` event вызывается и для quick emoji, и для emoji из полного picker-а.
- UI-kit не считает частоты сам.

Так чат сможет хранить статистику локально и передавать готовый список в `NmorphEmojiPicker`.

## Layout Requirements

- Picker должен нормально помещаться в dropdown шириной около `300px`.
- Высота полного picker-а должна быть задаваемой или предсказуемой, сейчас нам подходит около `260px`.
- Нужна работа в тёмной теме.
- Не должно быть синего glow/focus-свечения на кнопке открытия picker-а, если host-компонент хочет показать состояние через inset shadow.
- Полный picker должен быть usable без внешних scroll/layout костылей.

## Data Requirements

Для каждого emoji желательно иметь:

- `emoji`;
- `annotation`;
- `tags`;
- `group`;
- `order`;
- optional skin tone variants.

Важно сохранить быстрый поиск по annotation/tags и группировку по категориям.

`NmorphEmojiPicker` остаётся renderer-компонентом и получает уже загруженные `dataSource`, `i18n`, `quickList` и `language`.
В пакете есть опциональные locale-файлы для `en`, `ru`, `zh`: их можно грузить через `@nmorph/nmorph-ui-kit/emoji`, а прямые imports `@nmorph/nmorph-ui-kit/emoji/en`, `/ru`, `/zh` позволяют тащить только нужный язык.

## Accessibility

- Кнопка раскрытия compact picker-а должна принимать aria-label.
- В полном picker-е нужен keyboard navigation.
- Escape должен быть совместим с внешним dropdown/dialog закрытием.
- Focus management лучше не завязывать на глобальные project APIs.

## Integration Notes

- Проектный wrapper может называться `ChatRoomEmojiPicker` и сам читать настройки чата.
- Shared/UI или nmorph-level компонент должен оставаться stateless относительно проекта.
- Нам нужен минимальный migration path: заменить текущий `AppEmojiPicker` внутри wrapper-а без переписывания footer/reaction logic.
