# Nmorph Attachment Rendering Notes

## Цель

В сообщениях K-Room планируются вложения нескольких типов:

- изображения
- видео
- аудио
- PDF
- Office-документы
- прочие файлы

Сейчас в сообщениях есть `images?: ImageObject[]`, а клиент рендерит их через `AppMediaImage` -> `NmorphImagePreview`.
Для следующих типов нужен общий подход к рендеру вложений, чтобы uploader preview и message view не расходились визуально.

## Один компонент или разные

Лучше не делать один огромный компонент, который сам знает всю бизнес-логику сообщений.

Нужна такая схема:

- в приложении: один контейнер-роутер, например `MessageAttachmentList` или `AppMediaAttachmentList`
- внутри контейнера: отдельные представления по типам файлов
- в `nmorph`: набор UI-примитивов для конкретных типов вложений

То есть в сообщении должен быть один входной компонент списка вложений, но UI-рендеры должны быть разными:

- image preview
- video preview/player
- audio preview/player
- document/file card

Так проще поддерживать разные размеры, состояния загрузки, действия и доступность.

## Что нужно от Nmorph

### Image

`NmorphImagePreview` уже есть и подходит как базовый примитив.

Что пригодится дополнительно:

- единый compact mode для превью внутри чата
- галерея для нескольких изображений
- overlay actions slot
- стабильные размеры без layout shift
- управляемый `object-fit`

### Video

Нужен отдельный компонент, например `NmorphVideoPreview` или `NmorphMediaVideo`.

Желательные props:

```ts
src: string
poster?: string
name?: string
width?: string
height?: string
durationMs?: number
compact?: boolean
controls?: boolean
```

Желательные slots/events:

- actions slot
- `play`
- `pause`
- `open`
- `download`
- `error`

В сообщениях нужен компактный preview, а не полноэкранный player как основной вид.

### Audio

Нужен отдельный компонент, например `NmorphAudioPreview` или `NmorphMediaAudio`.

Желательные props:

```ts
src: string
name?: string
durationMs?: number
compact?: boolean
```

Желательные возможности:

- play/pause
- progress
- duration/current time
- loading/error state
- actions slot

Waveform опционален. Для первого этапа достаточно компактного audio player.

### PDF и Office-документы

Для PDF и Office лучше иметь общий документный компонент, например `NmorphDocumentPreview` или `NmorphFileCard`.

Желательные props:

```ts
name: string
extension?: string
mimeType?: string
size?: number
previewSrc?: string
downloadHref?: string
compact?: boolean
```

Желательные возможности:

- иконка по типу файла
- название файла
- extension badge
- размер файла
- открыть
- скачать
- loading/error state
- actions slot

Для PDF можно позже добавить inline preview, но для чата на первом этапе достаточно file card + open/download.
Office-документы обычно лучше рендерить как file card, без попытки inline preview.

### Unknown file

Нужен fallback-вид, чтобы неизвестный файл не ломал сообщение:

- generic file icon
- filename
- extension/mime label
- size
- download action

## Контракт данных для сообщений

Текущий `ImageObject`:

```ts
export interface ImageObject {
  src: string
  name: string
  fileBuffer?: ArrayBuffer
}
```

Для универсальных вложений лучше завести новый тип рядом с media/message shared-типами:

```ts
export type MessageAttachmentKind = 'image' | 'video' | 'audio' | 'pdf' | 'office' | 'file'

export interface MessageAttachmentObject {
  src: string
  name: string
  kind: MessageAttachmentKind
  mimeType: string
  size: number
  extension?: string
  width?: number
  height?: number
  durationMs?: number
  thumbnailSrc?: string
  fileBuffer?: ArrayBuffer
}
```

`fileBuffer` нужен только для исходящего socket payload.
В сохраненном сообщении и UI-рендере лучше опираться на `src`, `name`, `kind`, `mimeType`, `size` и optional metadata.

## Что понадобится клиенту для рендера

Чтобы потом нормально рендерить вложения в сообщениях, от backend/shared нужны:

- media id в `src`
- оригинальное имя файла
- kind файла
- mime type
- extension или upload type
- размер файла
- duration для audio/video
- width/height для image/video
- thumbnail/poster media id для video и, возможно, документов
- единый download режим через media endpoint
- статус загрузки/ошибки для локальных draft/optimistic вложений

## Как это связать с текущим кодом

На стороне приложения лучше сделать свои wrapper-компоненты:

- `AppMediaImage` уже есть
- `AppMediaVideo`
- `AppMediaAudio`
- `AppMediaDocument`
- `AppMediaAttachmentList`

Wrappers должны принимать project-level media id, получать live object URL через текущий media cache, а в `nmorph` передавать уже готовый `src`.
Так `nmorph` останется UI-kit, не завязанный на Dexie, socket и наши media endpoint правила.

## Совместимость

Можно временно поддерживать оба поля:

```ts
images?: ImageObject[]
attachments?: MessageAttachmentObject[]
```

Новые файлы лучше писать в `attachments`.
Старые `images` можно конвертировать в `attachments` на клиенте или сервере, когда будет готова миграция.

## Минимальный набор Nmorph-компонентов

Для первого полноценного этапа достаточно:

- `NmorphImagePreview` улучшить/оставить как есть
- добавить `NmorphVideoPreview`
- добавить `NmorphAudioPreview`
- добавить `NmorphFileCard`

`NmorphAttachmentList` можно не делать в UI-kit, если layout списка сильно зависит от чата.
Лучше оставить список на стороне приложения, а из `nmorph` брать только атомарные визуальные блоки.
