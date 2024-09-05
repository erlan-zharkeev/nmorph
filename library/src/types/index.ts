import { Ref } from 'vue';
import { I18n } from 'vue-i18n';

export enum NmorphComponentHeight {
  thick = 'thick-component',
  default = 'default-height-component',
  thin = 'thin-component',
}

export type NmorphSortOrderType = keyof typeof NmorphSortOrder | undefined;

export enum NmorphSortOrder {
  ascending = 'ascending',
  descending = 'descending',
}

export enum NmorphComponentDirection {
  row = 'row',
  column = 'column',
}

export interface INmorphCommonInputProps {
  height?: keyof typeof NmorphComponentHeight;
  fill?: boolean;
  disabled?: boolean;
}

export enum NmorphShadowType {
  inset = 'inset',
  outset = 'outset',
  combined = 'combined',
}

export enum NmorphColor {
  accent = 'accent',
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export enum NmorphIconList {
  'add-location' = 'add-location',
  'aim' = 'aim',
  'alarm-clock' = 'alarm-clock',
  'apple' = 'apple',
  'archive' = 'archive',
  'arrow-down' = 'arrow-down',
  'arrow-left' = 'arrow-left',
  'arrow-right' = 'arrow-right',
  'arrow-up' = 'arrow-up',
  'audio' = 'audio',
  'avatar' = 'avatar',
  'back' = 'back',
  'bell-filled' = 'bell-filled',
  'bell' = 'bell',
  'bicycle' = 'bicycle',
  'bottom-left' = 'bottom-left',
  'bottom-right' = 'bottom-right',
  'bottom' = 'bottom',
  'burger' = 'burger',
  'calendar' = 'calendar',
  'camera' = 'camera',
  'caret-bottom' = 'caret-bottom',
  'caret-left' = 'caret-left',
  'caret-right' = 'caret-right',
  'caret-top' = 'caret-top',
  'cellphone' = 'cellphone',
  'chat-dot-round' = 'chat-dot-round',
  'chat-dot-square' = 'chat-dot-square',
  'chat-line-round' = 'chat-line-round',
  'chat-line-square' = 'chat-line-square',
  'chat-round' = 'chat-round',
  'chat-square' = 'chat-square',
  'check' = 'check',
  'checked' = 'checked',
  'cherry' = 'cherry',
  'chevron-double-down' = 'chevron-double-down',
  'chevron-down' = 'chevron-down',
  'chrome-filled' = 'chrome-filled',
  'circle-check-filled' = 'circle-check-filled',
  'circle-check' = 'circle-check',
  'circle-close-filled' = 'circle-close-filled',
  'circle-close' = 'circle-close',
  'circle-plus-filled' = 'circle-plus-filled',
  'circle-plus' = 'circle-plus',
  'clock' = 'clock',
  'close' = 'close',
  'cloudy' = 'cloudy',
  'code' = 'code',
  'coffee-cup' = 'coffee-cup',
  'coffee' = 'coffee',
  'coin' = 'coin',
  'collection-tag' = 'collection-tag',
  'collection' = 'collection',
  'compass' = 'compass',
  'connection' = 'connection',
  'coordinate' = 'coordinate',
  'copy-document' = 'copy-document',
  'copy' = 'copy',
  'cpu' = 'cpu',
  'credit-card' = 'credit-card',
  'crop' = 'crop',
  'cross' = 'cross',
  'delete-filled' = 'delete-filled',
  'delete' = 'delete',
  'dessert' = 'dessert',
  'discount' = 'discount',
  'doc' = 'doc',
  'document-add' = 'document-add',
  'document-checked' = 'document-checked',
  'document-copy' = 'document-copy',
  'document-delete' = 'document-delete',
  'document-remove' = 'document-remove',
  'document' = 'document',
  'download' = 'download',
  'edit-pen' = 'edit-pen',
  'edit' = 'edit',
  'enlarge' = 'enlarge',
  'error' = 'error',
  'expand' = 'expand',
  'eye-blocked' = 'eye-blocked',
  'eye' = 'eye',
  'failed' = 'failed',
  'files' = 'files',
  'film' = 'film',
  'filter' = 'filter',
  'finished' = 'finished',
  'flag' = 'flag',
  'fold' = 'fold',
  'folder-add' = 'folder-add',
  'folder-checked' = 'folder-checked',
  'folder-delete' = 'folder-delete',
  'folder-opened' = 'folder-opened',
  'folder' = 'folder',
  'food' = 'food',
  'fork-spoon' = 'fork-spoon',
  'full-screen' = 'full-screen',
  'goblet' = 'goblet',
  'gold-medal' = 'gold-medal',
  'goods-filled' = 'goods-filled',
  'goods' = 'goods',
  'grape' = 'grape',
  'grid' = 'grid',
  'guide' = 'guide',
  'handbag' = 'handbag',
  'headset' = 'headset',
  'histogram' = 'histogram',
  'hot-water' = 'hot-water',
  'house' = 'house',
  'ice-cream-round' = 'ice-cream-round',
  'ice-drink' = 'ice-drink',
  'info-filled' = 'info-filled',
  'info' = 'info',
  'image' = 'image',
  'key' = 'key',
  'knife-fork' = 'knife-fork',
  'lightning' = 'lightning',
  'link' = 'link',
  'list' = 'list',
  'loader' = 'loader',
  'loading' = 'loading',
  'location-filled' = 'location-filled',
  'location-information' = 'location-information',
  'location' = 'location',
  'lock' = 'lock',
  'logo' = 'logo',
  'lollipop' = 'lollipop',
  'magic-stick' = 'magic-stick',
  'magnet' = 'magnet',
  'male' = 'male',
  'management' = 'management',
  'map-location' = 'map-location',
  'medal' = 'medal',
  'memo' = 'memo',
  'menu' = 'menu',
  'message-box' = 'message-box',
  'message' = 'message',
  'mic' = 'mic',
  'microphone' = 'microphone',
  'minus' = 'minus',
  'money' = 'money',
  'monitor' = 'monitor',
  'moon' = 'moon',
  'more-filled' = 'more-filled',
  'more' = 'more',
  'mostly-cloudy' = 'mostly-cloudy',
  'mouse' = 'mouse',
  'mug' = 'mug',
  'mute-notification' = 'mute-notification',
  'mute' = 'mute',
  'no-smoking' = 'no-smoking',
  'notebook' = 'notebook',
  'notification' = 'notification',
  'office-building' = 'office-building',
  'operation' = 'operation',
  'opportunity' = 'opportunity',
  'orange' = 'orange',
  'paperclip' = 'paperclip',
  'partly-cloudy' = 'partly-cloudy',
  'pear' = 'pear',
  'phone-filled' = 'phone-filled',
  'phone' = 'phone',
  'picture' = 'picture',
  'pie-chart' = 'pie-chart',
  'place' = 'place',
  'platform' = 'platform',
  'plus' = 'plus',
  'pointer' = 'pointer',
  'position' = 'position',
  'post-card' = 'post-card',
  'pouring' = 'pouring',
  'present' = 'present',
  'price-tag' = 'price-tag',
  'printer' = 'printer',
  'promotion' = 'promotion',
  'quartz-watch' = 'quartz-watch',
  'question-filled' = 'question-filled',
  'rank' = 'rank',
  'reading-lamp' = 'reading-lamp',
  'reading' = 'reading',
  'refresh-left' = 'refresh-left',
  'refresh-right' = 'refresh-right',
  'refresh' = 'refresh',
  'refrigerator' = 'refrigerator',
  'remove-filled' = 'remove-filled',
  'remove' = 'remove',
  'rotate-left' = 'rotate-left',
  'rotate-right' = 'rotate-right',
  'scale-to-original' = 'scale-to-original',
  'school' = 'school',
  'scissor' = 'scissor',
  'search' = 'search',
  'select' = 'select',
  'sell' = 'sell',
  'semi-select' = 'semi-select',
  'service' = 'service',
  'setting' = 'setting',
  'share' = 'share',
  'ship' = 'ship',
  'shop' = 'shop',
  'shopping-bag' = 'shopping-bag',
  'shopping-cart-full' = 'shopping-cart-full',
  'shopping-cart' = 'shopping-cart',
  'shrink' = 'shrink',
  'smoking' = 'smoking',
  'soccer' = 'soccer',
  'sold-out' = 'sold-out',
  'sort-down' = 'sort-down',
  'sort-up' = 'sort-up',
  'sort' = 'sort',
  'stamp' = 'stamp',
  'star-filled' = 'star-filled',
  'star' = 'star',
  'success-filled' = 'success-filled',
  'success' = 'success',
  'sugar' = 'sugar',
  'sunny' = 'sunny',
  'sunrise' = 'sunrise',
  'sunset' = 'sunset',
  'switch-button' = 'switch-button',
  'switch-filled' = 'switch-filled',
  'switch' = 'switch',
  'takeaway-box' = 'takeaway-box',
  'ticket' = 'ticket',
  'tickets' = 'tickets',
  'time' = 'time',
  'timer' = 'timer',
  'toilet-paper' = 'toilet-paper',
  'tools' = 'tools',
  'top-left' = 'top-left',
  'top-right' = 'top-right',
  'top' = 'top',
  'trend-charts' = 'trend-charts',
  'triangle-down' = 'triangle-down',
  'trophy-base' = 'trophy-base',
  'trophy' = 'trophy',
  'turn-off' = 'turn-off',
  'umbrella' = 'umbrella',
  'unlock' = 'unlock',
  'upload-filled' = 'upload-filled',
  'upload' = 'upload',
  'user-filled' = 'user-filled',
  'user' = 'user',
  'van' = 'van',
  'video-camera' = 'video-camera',
  'video-pause' = 'video-pause',
  'video-play' = 'video-play',
  'video' = 'video',
  'view' = 'view',
  'wallet-filled' = 'wallet-filled',
  'wallet' = 'wallet',
  'warn-triangle-filled' = 'warn-triangle-filled',
  'warning' = 'warning',
  'watch' = 'watch',
  'wind-power' = 'wind-power',
  'zoom-in' = 'zoom-in',
  'zoom-out' = 'zoom-out',
}

export enum NmorphComponentPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type NmorphPlacementType = keyof typeof NmorphComponentPosition;

export type NmorphDomElementType = HTMLElement | null;

export interface INmorphCoords<T> {
  x: T;
  y: T;
}

export type HexColor = `#${string}`;

export enum NmorphImageFit {
  fill = 'fill',
  contain = 'contain',
  cover = 'cover',
  none = 'none',
  'scale-down' = 'scale-down',
}

export interface INmorphColorVariable {
  name: string;
  color: HexColor;
}

export interface INmorphOtherThemeOptions {
  baseShadowWidth?: string;
  shadowBlurCoefficient?: string;
}

export interface INmorphThemeOptions {
  themes?: NmorphThemeOptionsType;
  defaultTheme?: string;
  saveCurrentThemeToLS?: boolean;
  darkShadeGeneratorCoefficient?: number;
  lightShadeGeneratorCoefficient?: number;
  other?: INmorphOtherThemeOptions;
}

export interface INmorphOptions {
  theme?: INmorphThemeOptions;
  i18n?: INmorphApplyTranslation;
  components?: string[];
}

export type NmorphThemeOptionsType = Record<string, INmorphThemeOptions>;

export interface INmorphStaticColors {
  info?: HexColor;
  infoText?: HexColor;
  success?: HexColor;
  successText?: HexColor;
  error?: HexColor;
  errorText?: HexColor;
  warn?: HexColor;
  warnText?: HexColor;
  gray?: HexColor;
  accent?: HexColor;
  white?: HexColor;
  black?: HexColor;
  text?: HexColor;
  overlay?: HexColor;
  focusTextColor?: HexColor;
}

export interface INmorphDynamicColors {
  darkShade?: HexColor;
  lightShade?: HexColor;
}

export interface INmorphThemeOptions extends INmorphDynamicColors, INmorphStaticColors {
  main?: HexColor;
}

export type NmorphThemeMapType = Record<string, INmorphColorVariable[]>;

export enum Locale {
  en = 'en',
  ru = 'ru',
}

export type TranslateType = Record<keyof typeof Locale, TranslateMessages>;

export interface TranslateMessages {
  [key: string]: TranslateMessages | string;
}

export interface LibraryOptions {
  i18n?: I18n;
}

export interface INmorphApplyTranslation {
  outsideMessagesMerge?: boolean;
  messages?: TranslateType;
  locale?: keyof typeof Locale;
}

export interface INmorphThemeInstance {
  setTheme: (theme: string) => void;
  currentTheme: Readonly<Ref<string>>;
}

export interface INmorphA11yProps {
  role?: string;
  ariaLabel?: string;
  ariaOrientation?: string;
}

export interface INmorphDimensions {
  width: number;
  height: number;
}

export interface INmorphInstance {
  theme: INmorphThemeInstance;
  browser: {
    dimensions: Ref<INmorphDimensions>;
  };
}
