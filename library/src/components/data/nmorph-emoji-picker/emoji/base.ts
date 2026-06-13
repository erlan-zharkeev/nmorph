import type { INmorphEmojiPickerI18n, INmorphEmojiPickerItem } from '../types';

export type NmorphEmojiLanguage = 'en' | 'ru' | 'zh';

interface NmorphEmojiGroup {
  group: string;
  tags: string[];
  emojis: string;
}

export interface NmorphEmojiLocaleGroup {
  label: string;
  tags: string[];
}

export interface NmorphEmojiLocaleConfig {
  language: NmorphEmojiLanguage;
  groups: Record<string, NmorphEmojiLocaleGroup>;
  i18n: INmorphEmojiPickerI18n;
  quickList?: string[];
}

export interface NmorphEmojiLocale {
  language: NmorphEmojiLanguage;
  data: INmorphEmojiPickerItem[];
  i18n: INmorphEmojiPickerI18n;
  quickList: string[];
}

const emojiGroups: NmorphEmojiGroup[] = [
  {
    group: 'Smileys',
    tags: ['face', 'smile', 'emotion'],
    emojis:
      '😀 😃 😄 😁 😆 😅 😂 🤣 🥲 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🥴 🤢 🤮 🤧 😷 🤒 🤕',
  },
  {
    group: 'People',
    tags: ['person', 'gesture', 'body'],
    emojis:
      '👋 🤚 🖐️ ✋ 🖖 🫱 🫲 🫳 🫴 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁️ 👅 👄 🫦 👶 🧒 👦 👧 🧑 👱 👨 🧔 🧔‍♂️ 🧔‍♀️ 👩 🧓 👴 👵 🙍 🙎 🙅 🙆 💁 🙋 🧏 🙇 🤦 🤷 🧑‍⚕️ 🧑‍🎓 🧑‍🏫 🧑‍⚖️ 🧑‍🌾 🧑‍🍳 🧑‍🔧 🧑‍🏭 🧑‍💼 🧑‍🔬 🧑‍💻 🧑‍🎤 🧑‍🎨 🧑‍✈️ 🧑‍🚀 🧑‍🚒 👮 🕵️ 💂 🥷 👷 🫅 🤴 👸 👳 👲 🧕 🤵 👰 🤰 🫃 🫄 👼 🎅 🤶 🦸 🦹 🧙 🧚 🧛 🧜 🧝 🧞 🧟',
  },
  {
    group: 'Animals',
    tags: ['animal', 'nature'],
    emojis:
      '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🫎 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷️ 🕸️ 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🪼 🪸 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🦣 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🦬 🐃 🐂 🐄 🫏 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐕‍🦺 🐈 🐈‍⬛ 🪶 🐓 🦃 🦤 🦚 🦜 🪽 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁 🐀 🐿️ 🦔',
  },
  {
    group: 'Nature',
    tags: ['plant', 'weather', 'nature'],
    emojis:
      '🌵 🎄 🌲 🌳 🌴 🪵 🌱 🌿 ☘️ 🍀 🎍 🪴 🎋 🍃 🍂 🍁 🪺 🪹 🍄 🪨 🐚 🪷 🌾 💐 🌷 🪻 🌹 🥀 🪸 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌜 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 🪐 💫 ⭐ 🌟 ✨ ⚡ ☄️ 💥 🔥 🌪️ 🌈 ☀️ 🌤️ ⛅ 🌥️ ☁️ 🌦️ 🌧️ ⛈️ 🌩️ 🌨️ ❄️ ☃️ ⛄ 🌬️ 💨 💧 💦 ☔ ☂️ 🌊 🌫️',
  },
  {
    group: 'Food',
    tags: ['food', 'drink'],
    emojis:
      '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🫛 🥦 🥬 🥒 🌶️ 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🫘 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🫔 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊',
  },
  {
    group: 'Activity',
    tags: ['activity', 'sport', 'game'],
    emojis:
      '⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪃 🥅 ⛳ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸️ 🥌 🎿 ⛷️ 🏂 🪂 🏋️ 🤼 🤸 ⛹️ 🤺 🤾 🏌️ 🏇 🧘 🏄 🏊 🤽 🚣 🧗 🚵 🚴 🏆 🥇 🥈 🥉 🏅 🎖️ 🏵️ 🎗️ 🎫 🎟️ 🎪 🤹 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🪘 🎷 🎺 🪗 🎸 🪕 🎻 🪈 🎲 ♟️ 🎯 🎳 🎮 🎰 🧩',
  },
  {
    group: 'Travel',
    tags: ['travel', 'place', 'vehicle'],
    emojis:
      '🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🏍️ 🛵 🦽 🦼 🛺 🚲 🛴 🛹 🛼 🚏 🛣️ 🛤️ 🛢️ ⛽ 🛞 🚨 🚥 🚦 🛑 🚧 ⚓ 🛟 ⛵ 🛶 🚤 🛳️ ⛴️ 🛥️ 🚢 ✈️ 🛩️ 🛫 🛬 🪂 💺 🚁 🚟 🚠 🚡 🛰️ 🚀 🛸 🛎️ 🧳 ⌛ ⏳ ⌚ ⏰ ⏱️ ⏲️ 🕰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🧱 🪨 🪵 🛖 🏘️ 🏚️ 🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🏩 🏪 🏫 🏬 🏭 🏯 🏰 💒 🗼 🗽 ⛪ 🕌 🛕 🕍 ⛩️ 🕋 ⛲ ⛺ 🌁 🌃 🏙️ 🌄 🌅 🌆 🌇 🌉',
  },
  {
    group: 'Objects',
    tags: ['object', 'tool', 'device'],
    emojis:
      '⌚ 📱 📲 💻 ⌨️ 🖥️ 🖨️ 🖱️ 🖲️ 🕹️ 🗜️ 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽️ 🎞️ 📞 ☎️ 📟 📠 📺 📻 🎙️ 🎚️ 🎛️ 🧭 ⏱️ ⏲️ ⏰ 🕰️ ⌛ ⏳ 📡 🔋 🪫 🔌 💡 🔦 🕯️ 🪔 🧯 🛢️ 💸 💵 💴 💶 💷 🪙 💰 💳 🧾 💎 ⚖️ 🪜 🧰 🪛 🔧 🔨 ⚒️ 🛠️ ⛏️ 🪚 🔩 ⚙️ 🪤 🧱 ⛓️ 🧲 🔫 💣 🧨 🪓 🔪 🗡️ ⚔️ 🛡️ 🚬 ⚰️ 🪦 ⚱️ 🏺 🔮 📿 🧿 🪬 💈 ⚗️ 🔭 🔬 🕳️ 🩹 🩺 🩻 🩼 💊 💉 🩸 🧬 🦠 🧫 🧪 🌡️ 🧹 🪠 🧺 🧻 🚽 🚰 🚿 🛁 🛀 🧼 🪥 🪒 🧽 🪣 🧴 🛎️ 🔑 🗝️ 🚪 🪑 🛋️ 🛏️ 🛌 🧸 🪆 🖼️ 🪞 🪟 🛍️ 🛒 🎁 🎈 🎏 🎀 🪄 🪅 🎊 🎉',
  },
  {
    group: 'Symbols',
    tags: ['symbol', 'heart', 'sign'],
    emojis:
      '❤️ 🩷 🧡 💛 💚 💙 🩵 💜 🤎 🖤 🩶 🤍 💔 ❤️‍🔥 ❤️‍🩹 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ☪️ 🕉️ ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ 🆔 ⚛️ 🉑 ☢️ ☣️ 📴 📳 🈶 🈚 🈸 🈺 🈷️ ✴️ 🆚 💮 🉐 ㊙️ ㊗️ 🈴 🈵 🈹 🈲 🅰️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕ 🛑 ⛔ 📛 🚫 💯 💢 ♨️ 🚷 🚯 🚳 🚱 🔞 📵 🚭 ❗ ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 〽️ ⚠️ 🚸 🔱 ⚜️ 🔰 ♻️ ✅ 🈯 💹 ❇️ ✳️ ❎ 🌐 💠 Ⓜ️ 🌀 💤 🏧 🚾 ♿ 🅿️ 🛗 🈳 🈂️ 🛂 🛃 🛄 🛅 🚹 🚺 🚼 ⚧️ 🚻 🚮 🎦 📶 🈁 🔣 ℹ️ 🔤 🔡 🔠 🆖 🆗 🆙 🆒 🆕 🆓 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟',
  },
  {
    group: 'Flags',
    tags: ['flag', 'country'],
    emojis:
      '🏁 🚩 🎌 🏴 🏳️ 🏳️‍🌈 🏳️‍⚧️ 🏴‍☠️ 🇺🇳 🇦🇨 🇦🇩 🇦🇪 🇦🇫 🇦🇬 🇦🇮 🇦🇱 🇦🇲 🇦🇴 🇦🇶 🇦🇷 🇦🇸 🇦🇹 🇦🇺 🇦🇼 🇦🇽 🇦🇿 🇧🇦 🇧🇧 🇧🇩 🇧🇪 🇧🇫 🇧🇬 🇧🇭 🇧🇮 🇧🇯 🇧🇱 🇧🇲 🇧🇳 🇧🇴 🇧🇶 🇧🇷 🇧🇸 🇧🇹 🇧🇻 🇧🇼 🇧🇾 🇧🇿 🇨🇦 🇨🇨 🇨🇩 🇨🇫 🇨🇬 🇨🇭 🇨🇮 🇨🇰 🇨🇱 🇨🇲 🇨🇳 🇨🇴 🇨🇵 🇨🇷 🇨🇺 🇨🇻 🇨🇼 🇨🇽 🇨🇾 🇨🇿 🇩🇪 🇩🇬 🇩🇯 🇩🇰 🇩🇲 🇩🇴 🇩🇿 🇪🇦 🇪🇨 🇪🇪 🇪🇬 🇪🇭 🇪🇷 🇪🇸 🇪🇹 🇪🇺 🇫🇮 🇫🇯 🇫🇰 🇫🇲 🇫🇴 🇫🇷 🇬🇦 🇬🇧 🇬🇩 🇬🇪 🇬🇫 🇬🇬 🇬🇭 🇬🇮 🇬🇱 🇬🇲 🇬🇳 🇬🇵 🇬🇶 🇬🇷 🇬🇸 🇬🇹 🇬🇺 🇬🇼 🇬🇾 🇭🇰 🇭🇲 🇭🇳 🇭🇷 🇭🇹 🇭🇺 🇮🇨 🇮🇩 🇮🇪 🇮🇱 🇮🇲 🇮🇳 🇮🇴 🇮🇶 🇮🇷 🇮🇸 🇮🇹 🇯🇪 🇯🇲 🇯🇴 🇯🇵 🇰🇪 🇰🇬 🇰🇭 🇰🇮 🇰🇲 🇰🇳 🇰🇵 🇰🇷 🇰🇼 🇰🇾 🇰🇿',
  },
];

type NmorphEmojiAnnotation = {
  label: string;
  tags?: string[];
};

type NmorphIntlDisplayNames = {
  of(code: string): string | undefined;
};

let regionDisplayNames: NmorphIntlDisplayNames | null | undefined;

const emojiAnnotations: Record<string, NmorphEmojiAnnotation> = {
  '😀': { label: 'grinning face', tags: ['smile', 'happy'] },
  '😃': { label: 'grinning face with big eyes', tags: ['smile', 'happy'] },
  '😄': { label: 'grinning face with smiling eyes', tags: ['smile', 'happy'] },
  '😁': { label: 'beaming face with smiling eyes', tags: ['smile', 'happy'] },
  '😆': { label: 'grinning squinting face', tags: ['laugh', 'smile'] },
  '😅': { label: 'grinning face with sweat', tags: ['relief', 'smile'] },
  '😂': { label: 'face with tears of joy', tags: ['laugh', 'cry', 'lol'] },
  '🤣': { label: 'rolling on the floor laughing', tags: ['laugh', 'lol'] },
  '🥲': { label: 'smiling face with tear', tags: ['smile', 'sad'] },
  '☺️': { label: 'smiling face', tags: ['smile', 'happy'] },
  '😊': { label: 'smiling face with smiling eyes', tags: ['smile', 'happy'] },
  '😇': { label: 'smiling face with halo', tags: ['angel', 'innocent'] },
  '🙂': { label: 'slightly smiling face', tags: ['smile'] },
  '🙃': { label: 'upside-down face', tags: ['silly'] },
  '😉': { label: 'winking face', tags: ['wink'] },
  '😌': { label: 'relieved face', tags: ['calm'] },
  '😍': { label: 'smiling face with heart-eyes', tags: ['love', 'heart'] },
  '🥰': { label: 'smiling face with hearts', tags: ['love', 'heart'] },
  '😘': { label: 'face blowing a kiss', tags: ['kiss', 'love'] },
  '😗': { label: 'kissing face', tags: ['kiss'] },
  '😙': { label: 'kissing face with smiling eyes', tags: ['kiss'] },
  '😚': { label: 'kissing face with closed eyes', tags: ['kiss'] },
  '😋': { label: 'face savoring food', tags: ['yum', 'food'] },
  '😛': { label: 'face with tongue', tags: ['tongue', 'playful'] },
  '😝': { label: 'squinting face with tongue', tags: ['tongue', 'playful'] },
  '😜': { label: 'winking face with tongue', tags: ['tongue', 'playful'] },
  '🤪': { label: 'zany face', tags: ['silly', 'crazy'] },
  '🤨': { label: 'face with raised eyebrow', tags: ['skeptical'] },
  '🧐': { label: 'face with monocle', tags: ['thinking'] },
  '🤓': { label: 'nerd face', tags: ['glasses'] },
  '😎': { label: 'smiling face with sunglasses', tags: ['cool'] },
  '🥸': { label: 'disguised face', tags: ['glasses', 'mustache'] },
  '🤩': { label: 'star-struck', tags: ['excited', 'star'] },
  '🥳': { label: 'partying face', tags: ['party', 'celebration'] },
  '😏': { label: 'smirking face', tags: ['smirk'] },
  '😒': { label: 'unamused face', tags: ['annoyed'] },
  '😞': { label: 'disappointed face', tags: ['sad'] },
  '😔': { label: 'pensive face', tags: ['sad'] },
  '😟': { label: 'worried face', tags: ['sad', 'concerned'] },
  '😕': { label: 'confused face', tags: ['confused'] },
  '🙁': { label: 'slightly frowning face', tags: ['sad'] },
  '☹️': { label: 'frowning face', tags: ['sad'] },
  '😣': { label: 'persevering face', tags: ['struggle'] },
  '😖': { label: 'confounded face', tags: ['frustrated'] },
  '😫': { label: 'tired face', tags: ['tired'] },
  '😩': { label: 'weary face', tags: ['tired'] },
  '🥺': { label: 'pleading face', tags: ['please', 'sad'] },
  '😢': { label: 'crying face', tags: ['cry', 'sad'] },
  '😭': { label: 'loudly crying face', tags: ['cry', 'sad'] },
  '😤': { label: 'face with steam from nose', tags: ['angry', 'proud'] },
  '😠': { label: 'angry face', tags: ['mad'] },
  '😡': { label: 'pouting face', tags: ['angry', 'mad'] },
  '🤬': { label: 'face with symbols on mouth', tags: ['angry', 'swear'] },
  '🤯': { label: 'exploding head', tags: ['mind blown', 'shock'] },
  '😳': { label: 'flushed face', tags: ['blush', 'embarrassed'] },
  '🥵': { label: 'hot face', tags: ['heat'] },
  '🥶': { label: 'cold face', tags: ['freeze'] },
  '😱': { label: 'face screaming in fear', tags: ['fear', 'shock'] },
  '😨': { label: 'fearful face', tags: ['fear'] },
  '😰': { label: 'anxious face with sweat', tags: ['fear', 'sweat'] },
  '😥': { label: 'sad but relieved face', tags: ['sad', 'relief'] },
  '😓': { label: 'downcast face with sweat', tags: ['sad', 'sweat'] },
  '🫣': { label: 'face with peeking eye', tags: ['peek', 'shy'] },
  '🤗': { label: 'hugging face', tags: ['hug'] },
  '🫡': { label: 'saluting face', tags: ['salute'] },
  '🤔': { label: 'thinking face', tags: ['think'] },
  '🫢': { label: 'face with open eyes and hand over mouth', tags: ['surprise'] },
  '🤭': { label: 'face with hand over mouth', tags: ['giggle'] },
  '🤫': { label: 'shushing face', tags: ['quiet', 'shh'] },
  '🤥': { label: 'lying face', tags: ['lie'] },
  '😶': { label: 'face without mouth', tags: ['silent'] },
  '😐': { label: 'neutral face', tags: ['meh'] },
  '😑': { label: 'expressionless face', tags: ['meh'] },
  '😬': { label: 'grimacing face', tags: ['awkward'] },
  '🙄': { label: 'face with rolling eyes', tags: ['eyeroll'] },
  '😯': { label: 'hushed face', tags: ['surprise'] },
  '😦': { label: 'frowning face with open mouth', tags: ['sad', 'surprise'] },
  '😧': { label: 'anguished face', tags: ['sad'] },
  '😮': { label: 'face with open mouth', tags: ['surprise'] },
  '😲': { label: 'astonished face', tags: ['surprise'] },
  '🥱': { label: 'yawning face', tags: ['tired', 'sleep'] },
  '😴': { label: 'sleeping face', tags: ['sleep'] },
  '🤤': { label: 'drooling face', tags: ['drool'] },
  '😪': { label: 'sleepy face', tags: ['sleep'] },
  '😵': { label: 'dizzy face', tags: ['dizzy'] },
  '😵‍💫': { label: 'face with spiral eyes', tags: ['dizzy'] },
  '🥴': { label: 'woozy face', tags: ['dizzy'] },
  '🤢': { label: 'nauseated face', tags: ['sick'] },
  '🤮': { label: 'face vomiting', tags: ['sick'] },
  '🤧': { label: 'sneezing face', tags: ['sick'] },
  '😷': { label: 'face with medical mask', tags: ['sick', 'mask'] },
  '🤒': { label: 'face with thermometer', tags: ['sick', 'fever'] },
  '🤕': { label: 'face with head-bandage', tags: ['hurt'] },
  '👋': { label: 'waving hand', tags: ['hello', 'bye'] },
  '🤚': { label: 'raised back of hand', tags: ['hand'] },
  '🖐️': { label: 'hand with fingers splayed', tags: ['hand'] },
  '✋': { label: 'raised hand', tags: ['stop', 'hand'] },
  '🖖': { label: 'vulcan salute', tags: ['hand'] },
  '👌': { label: 'OK hand', tags: ['ok', 'perfect'] },
  '🤌': { label: 'pinched fingers', tags: ['gesture'] },
  '🤏': { label: 'pinching hand', tags: ['small'] },
  '✌️': { label: 'victory hand', tags: ['peace'] },
  '🤞': { label: 'crossed fingers', tags: ['luck'] },
  '🫰': { label: 'hand with index finger and thumb crossed', tags: ['finger heart', 'money'] },
  '🤟': { label: 'love-you gesture', tags: ['love', 'hand'] },
  '🤘': { label: 'sign of the horns', tags: ['rock'] },
  '🤙': { label: 'call me hand', tags: ['phone'] },
  '👈': { label: 'backhand index pointing left', tags: ['point', 'left'] },
  '👉': { label: 'backhand index pointing right', tags: ['point', 'right'] },
  '👆': { label: 'backhand index pointing up', tags: ['point', 'up'] },
  '🖕': { label: 'middle finger', tags: ['hand'] },
  '👇': { label: 'backhand index pointing down', tags: ['point', 'down'] },
  '☝️': { label: 'index pointing up', tags: ['point', 'up'] },
  '🫵': { label: 'index pointing at viewer', tags: ['you', 'point'] },
  '👍': { label: 'thumbs up', tags: ['like', 'approve', 'yes'] },
  '👎': { label: 'thumbs down', tags: ['dislike', 'no'] },
  '✊': { label: 'raised fist', tags: ['fist'] },
  '👊': { label: 'oncoming fist', tags: ['fist', 'punch'] },
  '🤛': { label: 'left-facing fist', tags: ['fist'] },
  '🤜': { label: 'right-facing fist', tags: ['fist'] },
  '👏': { label: 'clapping hands', tags: ['clap', 'applause'] },
  '🙌': { label: 'raising hands', tags: ['celebrate', 'hooray'] },
  '🫶': { label: 'heart hands', tags: ['love', 'heart'] },
  '👐': { label: 'open hands', tags: ['hand'] },
  '🤲': { label: 'palms up together', tags: ['pray'] },
  '🤝': { label: 'handshake', tags: ['agreement'] },
  '🙏': { label: 'folded hands', tags: ['please', 'pray', 'thanks'] },
  '✍️': { label: 'writing hand', tags: ['write'] },
  '💅': { label: 'nail polish', tags: ['nails'] },
  '🤳': { label: 'selfie', tags: ['camera'] },
  '💪': { label: 'flexed biceps', tags: ['strong', 'muscle'] },
  '👀': { label: 'eyes', tags: ['look', 'see'] },
  '👁️': { label: 'eye', tags: ['look', 'see'] },
  '👅': { label: 'tongue', tags: ['mouth'] },
  '👄': { label: 'mouth', tags: ['lips'] },
  '🧠': { label: 'brain', tags: ['mind'] },
  '🫀': { label: 'anatomical heart', tags: ['heart'] },
  '🫁': { label: 'lungs', tags: ['breath'] },
  '🐶': { label: 'dog face', tags: ['dog', 'pet'] },
  '🐱': { label: 'cat face', tags: ['cat', 'pet'] },
  '🐭': { label: 'mouse face', tags: ['mouse'] },
  '🐹': { label: 'hamster', tags: ['pet'] },
  '🐰': { label: 'rabbit face', tags: ['bunny'] },
  '🦊': { label: 'fox', tags: ['fox face'] },
  '🐻': { label: 'bear', tags: ['bear face'] },
  '🐼': { label: 'panda', tags: ['panda face'] },
  '🐨': { label: 'koala', tags: ['koala face'] },
  '🐯': { label: 'tiger face', tags: ['tiger'] },
  '🦁': { label: 'lion', tags: ['lion face'] },
  '🐮': { label: 'cow face', tags: ['cow'] },
  '🐷': { label: 'pig face', tags: ['pig'] },
  '🐸': { label: 'frog', tags: ['frog face'] },
  '🐵': { label: 'monkey face', tags: ['monkey'] },
  '🙈': { label: 'see-no-evil monkey', tags: ['monkey'] },
  '🙉': { label: 'hear-no-evil monkey', tags: ['monkey'] },
  '🙊': { label: 'speak-no-evil monkey', tags: ['monkey'] },
  '🐔': { label: 'chicken', tags: ['bird'] },
  '🐧': { label: 'penguin', tags: ['bird'] },
  '🐦': { label: 'bird', tags: ['bird'] },
  '🦆': { label: 'duck', tags: ['bird'] },
  '🦅': { label: 'eagle', tags: ['bird'] },
  '🦉': { label: 'owl', tags: ['bird'] },
  '🦇': { label: 'bat', tags: ['bat'] },
  '🐺': { label: 'wolf', tags: ['wolf face'] },
  '🐴': { label: 'horse face', tags: ['horse'] },
  '🦄': { label: 'unicorn', tags: ['unicorn face'] },
  '🐝': { label: 'honeybee', tags: ['bee'] },
  '🦋': { label: 'butterfly', tags: ['insect'] },
  '🐌': { label: 'snail', tags: ['insect'] },
  '🐞': { label: 'lady beetle', tags: ['ladybug', 'insect'] },
  '🐜': { label: 'ant', tags: ['insect'] },
  '🕷️': { label: 'spider', tags: ['insect'] },
  '🐢': { label: 'turtle', tags: ['reptile'] },
  '🐍': { label: 'snake', tags: ['reptile'] },
  '🦎': { label: 'lizard', tags: ['reptile'] },
  '🦖': { label: 'T-Rex', tags: ['dinosaur'] },
  '🦕': { label: 'sauropod', tags: ['dinosaur'] },
  '🐙': { label: 'octopus', tags: ['sea'] },
  '🐬': { label: 'dolphin', tags: ['sea'] },
  '🐳': { label: 'spouting whale', tags: ['whale', 'sea'] },
  '🐋': { label: 'whale', tags: ['sea'] },
  '🐟': { label: 'fish', tags: ['sea'] },
  '🦈': { label: 'shark', tags: ['sea'] },
  '🐘': { label: 'elephant', tags: ['elephant'] },
  '🐪': { label: 'camel', tags: ['desert'] },
  '🐫': { label: 'two-hump camel', tags: ['desert'] },
  '🌵': { label: 'cactus', tags: ['plant', 'desert'] },
  '🎄': { label: 'Christmas tree', tags: ['tree', 'holiday'] },
  '🌲': { label: 'evergreen tree', tags: ['tree'] },
  '🌳': { label: 'deciduous tree', tags: ['tree'] },
  '🌴': { label: 'palm tree', tags: ['tree'] },
  '🌱': { label: 'seedling', tags: ['plant'] },
  '☘️': { label: 'shamrock', tags: ['plant'] },
  '🍀': { label: 'four leaf clover', tags: ['luck', 'plant'] },
  '🍃': { label: 'leaf fluttering in wind', tags: ['leaf'] },
  '🍂': { label: 'fallen leaf', tags: ['autumn'] },
  '🍁': { label: 'maple leaf', tags: ['autumn'] },
  '🍄': { label: 'mushroom', tags: ['fungus'] },
  '🐚': { label: 'spiral shell', tags: ['sea'] },
  '🌾': { label: 'sheaf of rice', tags: ['grain'] },
  '💐': { label: 'bouquet', tags: ['flowers'] },
  '🌷': { label: 'tulip', tags: ['flower'] },
  '🌹': { label: 'rose', tags: ['flower', 'love'] },
  '🥀': { label: 'wilted flower', tags: ['flower'] },
  '🌺': { label: 'hibiscus', tags: ['flower'] },
  '🌸': { label: 'cherry blossom', tags: ['flower'] },
  '🌼': { label: 'blossom', tags: ['flower'] },
  '🌻': { label: 'sunflower', tags: ['flower'] },
  '🌞': { label: 'sun with face', tags: ['sun'] },
  '🌝': { label: 'full moon face', tags: ['moon'] },
  '🌙': { label: 'crescent moon', tags: ['moon'] },
  '🌎': { label: 'globe showing Americas', tags: ['earth', 'world'] },
  '🌍': { label: 'globe showing Europe-Africa', tags: ['earth', 'world'] },
  '🌏': { label: 'globe showing Asia-Australia', tags: ['earth', 'world'] },
  '⭐': { label: 'star', tags: ['favorite'] },
  '🌟': { label: 'glowing star', tags: ['star'] },
  '✨': { label: 'sparkles', tags: ['star', 'shine'] },
  '⚡': { label: 'high voltage', tags: ['lightning'] },
  '🔥': { label: 'fire', tags: ['flame', 'hot'] },
  '🌈': { label: 'rainbow', tags: ['weather'] },
  '☀️': { label: 'sun', tags: ['weather'] },
  '☁️': { label: 'cloud', tags: ['weather'] },
  '❄️': { label: 'snowflake', tags: ['cold', 'weather'] },
  '💧': { label: 'droplet', tags: ['water'] },
  '💦': { label: 'sweat droplets', tags: ['water'] },
  '🌊': { label: 'water wave', tags: ['sea', 'ocean'] },
  '🍏': { label: 'green apple', tags: ['fruit'] },
  '🍎': { label: 'red apple', tags: ['fruit'] },
  '🍐': { label: 'pear', tags: ['fruit'] },
  '🍊': { label: 'tangerine', tags: ['orange', 'fruit'] },
  '🍋': { label: 'lemon', tags: ['fruit'] },
  '🍌': { label: 'banana', tags: ['fruit'] },
  '🍉': { label: 'watermelon', tags: ['fruit'] },
  '🍇': { label: 'grapes', tags: ['fruit'] },
  '🍓': { label: 'strawberry', tags: ['fruit'] },
  '🫐': { label: 'blueberries', tags: ['fruit'] },
  '🍈': { label: 'melon', tags: ['fruit'] },
  '🍒': { label: 'cherries', tags: ['fruit'] },
  '🍑': { label: 'peach', tags: ['fruit'] },
  '🥭': { label: 'mango', tags: ['fruit'] },
  '🍍': { label: 'pineapple', tags: ['fruit'] },
  '🥥': { label: 'coconut', tags: ['fruit'] },
  '🥝': { label: 'kiwi fruit', tags: ['fruit'] },
  '🍅': { label: 'tomato', tags: ['vegetable'] },
  '🍆': { label: 'eggplant', tags: ['vegetable'] },
  '🥑': { label: 'avocado', tags: ['vegetable'] },
  '🥦': { label: 'broccoli', tags: ['vegetable'] },
  '🥬': { label: 'leafy greens', tags: ['vegetable'] },
  '🥒': { label: 'cucumber', tags: ['vegetable'] },
  '🌶️': { label: 'hot pepper', tags: ['spicy'] },
  '🌽': { label: 'corn', tags: ['vegetable'] },
  '🥕': { label: 'carrot', tags: ['vegetable'] },
  '🧄': { label: 'garlic', tags: ['vegetable'] },
  '🧅': { label: 'onion', tags: ['vegetable'] },
  '🥔': { label: 'potato', tags: ['vegetable'] },
  '🍠': { label: 'roasted sweet potato', tags: ['vegetable'] },
  '🥐': { label: 'croissant', tags: ['bread'] },
  '🥨': { label: 'pretzel', tags: ['bread'] },
  '🍞': { label: 'bread', tags: ['bread'] },
  '🥖': { label: 'baguette bread', tags: ['bread'] },
  '🧀': { label: 'cheese wedge', tags: ['cheese'] },
  '🥚': { label: 'egg', tags: ['breakfast'] },
  '🍳': { label: 'cooking', tags: ['egg', 'breakfast'] },
  '🥞': { label: 'pancakes', tags: ['breakfast'] },
  '🧇': { label: 'waffle', tags: ['breakfast'] },
  '🥓': { label: 'bacon', tags: ['meat'] },
  '🥩': { label: 'cut of meat', tags: ['steak'] },
  '🍗': { label: 'poultry leg', tags: ['chicken', 'meat'] },
  '🍖': { label: 'meat on bone', tags: ['meat'] },
  '🌭': { label: 'hot dog', tags: ['food'] },
  '🍔': { label: 'hamburger', tags: ['burger'] },
  '🍟': { label: 'french fries', tags: ['fries'] },
  '🍕': { label: 'pizza', tags: ['food'] },
  '🥪': { label: 'sandwich', tags: ['food'] },
  '🌮': { label: 'taco', tags: ['food'] },
  '🌯': { label: 'burrito', tags: ['food'] },
  '🥗': { label: 'green salad', tags: ['salad'] },
  '🍝': { label: 'spaghetti', tags: ['pasta'] },
  '🍜': { label: 'steaming bowl', tags: ['noodles', 'ramen'] },
  '🍣': { label: 'sushi', tags: ['food'] },
  '🍱': { label: 'bento box', tags: ['food'] },
  '🍤': { label: 'fried shrimp', tags: ['seafood'] },
  '🍙': { label: 'rice ball', tags: ['rice'] },
  '🍚': { label: 'cooked rice', tags: ['rice'] },
  '🍘': { label: 'rice cracker', tags: ['rice'] },
  '🍥': { label: 'fish cake with swirl', tags: ['fish'] },
  '🥠': { label: 'fortune cookie', tags: ['cookie'] },
  '🍡': { label: 'dango', tags: ['dessert'] },
  '🍧': { label: 'shaved ice', tags: ['dessert'] },
  '🍨': { label: 'ice cream', tags: ['dessert'] },
  '🍦': { label: 'soft ice cream', tags: ['dessert'] },
  '🥧': { label: 'pie', tags: ['dessert'] },
  '🧁': { label: 'cupcake', tags: ['dessert'] },
  '🍰': { label: 'shortcake', tags: ['cake', 'dessert'] },
  '🎂': { label: 'birthday cake', tags: ['cake', 'birthday'] },
  '🍮': { label: 'custard', tags: ['dessert'] },
  '🍭': { label: 'lollipop', tags: ['candy'] },
  '🍬': { label: 'candy', tags: ['sweet'] },
  '🍫': { label: 'chocolate bar', tags: ['sweet'] },
  '🍿': { label: 'popcorn', tags: ['snack'] },
  '🍩': { label: 'doughnut', tags: ['donut'] },
  '🍪': { label: 'cookie', tags: ['sweet'] },
  '☕': { label: 'hot beverage', tags: ['coffee', 'tea'] },
  '🍵': { label: 'teacup without handle', tags: ['tea'] },
  '🥤': { label: 'cup with straw', tags: ['drink'] },
  '🍺': { label: 'beer mug', tags: ['beer'] },
  '🍻': { label: 'clinking beer mugs', tags: ['beer', 'cheers'] },
  '🥂': { label: 'clinking glasses', tags: ['cheers'] },
  '🍷': { label: 'wine glass', tags: ['wine'] },
  '🍸': { label: 'cocktail glass', tags: ['drink'] },
  '🍾': { label: 'bottle with popping cork', tags: ['champagne', 'celebration'] },
  '⚽': { label: 'soccer ball', tags: ['football', 'sport'] },
  '🏀': { label: 'basketball', tags: ['sport'] },
  '🏈': { label: 'american football', tags: ['sport'] },
  '⚾': { label: 'baseball', tags: ['sport'] },
  '🎾': { label: 'tennis', tags: ['sport'] },
  '🏐': { label: 'volleyball', tags: ['sport'] },
  '🏉': { label: 'rugby football', tags: ['sport'] },
  '🎱': { label: 'pool 8 ball', tags: ['game'] },
  '🏓': { label: 'ping pong', tags: ['sport'] },
  '🏸': { label: 'badminton', tags: ['sport'] },
  '🥅': { label: 'goal net', tags: ['sport'] },
  '⛳': { label: 'flag in hole', tags: ['golf'] },
  '🎣': { label: 'fishing pole', tags: ['activity'] },
  '🥊': { label: 'boxing glove', tags: ['sport'] },
  '🎽': { label: 'running shirt', tags: ['sport'] },
  '⛸️': { label: 'ice skate', tags: ['sport'] },
  '🎿': { label: 'skis', tags: ['sport'] },
  '🏆': { label: 'trophy', tags: ['award', 'winner'] },
  '🥇': { label: 'first place medal', tags: ['gold', 'winner'] },
  '🥈': { label: 'second place medal', tags: ['silver'] },
  '🥉': { label: 'third place medal', tags: ['bronze'] },
  '🎖️': { label: 'military medal', tags: ['award'] },
  '🏅': { label: 'sports medal', tags: ['award'] },
  '🎨': { label: 'artist palette', tags: ['art'] },
  '🎬': { label: 'clapper board', tags: ['movie'] },
  '🎤': { label: 'microphone', tags: ['music'] },
  '🎧': { label: 'headphone', tags: ['music'] },
  '🎼': { label: 'musical score', tags: ['music'] },
  '🎹': { label: 'musical keyboard', tags: ['music'] },
  '🥁': { label: 'drum', tags: ['music'] },
  '🎷': { label: 'saxophone', tags: ['music'] },
  '🎺': { label: 'trumpet', tags: ['music'] },
  '🎸': { label: 'guitar', tags: ['music'] },
  '🎻': { label: 'violin', tags: ['music'] },
  '🎲': { label: 'game die', tags: ['dice', 'game'] },
  '♟️': { label: 'chess pawn', tags: ['game'] },
  '🎯': { label: 'bullseye', tags: ['target'] },
  '🎳': { label: 'bowling', tags: ['game'] },
  '🎮': { label: 'video game', tags: ['controller'] },
  '🧩': { label: 'puzzle piece', tags: ['game'] },
  '🚗': { label: 'automobile', tags: ['car'] },
  '🚕': { label: 'taxi', tags: ['car'] },
  '🚙': { label: 'sport utility vehicle', tags: ['car'] },
  '🚌': { label: 'bus', tags: ['vehicle'] },
  '🚎': { label: 'trolleybus', tags: ['vehicle'] },
  '🏎️': { label: 'racing car', tags: ['car'] },
  '🚓': { label: 'police car', tags: ['car'] },
  '🚑': { label: 'ambulance', tags: ['vehicle'] },
  '🚒': { label: 'fire engine', tags: ['truck'] },
  '🚚': { label: 'delivery truck', tags: ['truck'] },
  '🚲': { label: 'bicycle', tags: ['bike'] },
  '🛴': { label: 'kick scooter', tags: ['scooter'] },
  '🛵': { label: 'motor scooter', tags: ['scooter'] },
  '🏍️': { label: 'motorcycle', tags: ['bike'] },
  '⛽': { label: 'fuel pump', tags: ['gas'] },
  '🚨': { label: 'police car light', tags: ['siren'] },
  '🚥': { label: 'horizontal traffic light', tags: ['traffic'] },
  '🚦': { label: 'vertical traffic light', tags: ['traffic'] },
  '🛑': { label: 'stop sign', tags: ['stop'] },
  '⚓': { label: 'anchor', tags: ['ship'] },
  '⛵': { label: 'sailboat', tags: ['boat'] },
  '🚤': { label: 'speedboat', tags: ['boat'] },
  '🚢': { label: 'ship', tags: ['boat'] },
  '✈️': { label: 'airplane', tags: ['plane', 'flight'] },
  '🛫': { label: 'airplane departure', tags: ['flight'] },
  '🛬': { label: 'airplane arrival', tags: ['flight'] },
  '💺': { label: 'seat', tags: ['travel'] },
  '🚁': { label: 'helicopter', tags: ['flight'] },
  '🚀': { label: 'rocket', tags: ['launch', 'space'] },
  '🛸': { label: 'flying saucer', tags: ['ufo', 'space'] },
  '🧳': { label: 'luggage', tags: ['travel'] },
  '⌛': { label: 'hourglass done', tags: ['time'] },
  '⏳': { label: 'hourglass not done', tags: ['time'] },
  '⌚': { label: 'watch', tags: ['time'] },
  '⏰': { label: 'alarm clock', tags: ['time'] },
  '🗻': { label: 'mount fuji', tags: ['mountain'] },
  '🏠': { label: 'house', tags: ['home'] },
  '🏢': { label: 'office building', tags: ['building'] },
  '🏥': { label: 'hospital', tags: ['building'] },
  '🏦': { label: 'bank', tags: ['building'] },
  '🏨': { label: 'hotel', tags: ['building'] },
  '🏫': { label: 'school', tags: ['building'] },
  '🏰': { label: 'castle', tags: ['building'] },
  '⛪': { label: 'church', tags: ['building'] },
  '⛲': { label: 'fountain', tags: ['place'] },
  '⛺': { label: 'tent', tags: ['camping'] },
  '🌉': { label: 'bridge at night', tags: ['bridge'] },
  '🌃': { label: 'night with stars', tags: ['city'] },
  '🌄': { label: 'sunrise over mountains', tags: ['sunrise'] },
  '🌅': { label: 'sunrise', tags: ['morning'] },
  '🌆': { label: 'cityscape at dusk', tags: ['city'] },
  '🌇': { label: 'sunset', tags: ['city'] },
  '⌨️': { label: 'keyboard', tags: ['computer'] },
  '💻': { label: 'laptop', tags: ['computer'] },
  '📱': { label: 'mobile phone', tags: ['phone'] },
  '📲': { label: 'mobile phone with arrow', tags: ['phone'] },
  '☎️': { label: 'telephone', tags: ['phone'] },
  '📷': { label: 'camera', tags: ['photo'] },
  '📸': { label: 'camera with flash', tags: ['photo'] },
  '🎥': { label: 'movie camera', tags: ['video'] },
  '📞': { label: 'telephone receiver', tags: ['phone'] },
  '📺': { label: 'television', tags: ['tv'] },
  '📻': { label: 'radio', tags: ['audio'] },
  '🧭': { label: 'compass', tags: ['navigation'] },
  '💡': { label: 'light bulb', tags: ['idea'] },
  '🔦': { label: 'flashlight', tags: ['light'] },
  '💸': { label: 'money with wings', tags: ['money', 'cash'] },
  '💵': { label: 'dollar banknote', tags: ['money', 'cash'] },
  '💰': { label: 'money bag', tags: ['money', 'cash'] },
  '💳': { label: 'credit card', tags: ['money', 'payment'] },
  '💎': { label: 'gem stone', tags: ['diamond'] },
  '⚖️': { label: 'balance scale', tags: ['law'] },
  '🔧': { label: 'wrench', tags: ['tool'] },
  '🔨': { label: 'hammer', tags: ['tool'] },
  '⚙️': { label: 'gear', tags: ['settings', 'tool'] },
  '🔫': { label: 'water pistol', tags: ['toy'] },
  '💣': { label: 'bomb', tags: ['danger'] },
  '🔪': { label: 'kitchen knife', tags: ['knife'] },
  '🚬': { label: 'cigarette', tags: ['smoking'] },
  '🔮': { label: 'crystal ball', tags: ['magic'] },
  '🔬': { label: 'microscope', tags: ['science'] },
  '🔭': { label: 'telescope', tags: ['science'] },
  '💊': { label: 'pill', tags: ['medicine'] },
  '💉': { label: 'syringe', tags: ['medicine'] },
  '🧬': { label: 'DNA', tags: ['science'] },
  '🦠': { label: 'microbe', tags: ['germ'] },
  '🧪': { label: 'test tube', tags: ['science'] },
  '🌡️': { label: 'thermometer', tags: ['temperature'] },
  '🧹': { label: 'broom', tags: ['clean'] },
  '🧺': { label: 'basket', tags: ['container'] },
  '🚽': { label: 'toilet', tags: ['bathroom'] },
  '🚿': { label: 'shower', tags: ['bathroom'] },
  '🛁': { label: 'bathtub', tags: ['bathroom'] },
  '🧼': { label: 'soap', tags: ['clean'] },
  '🧽': { label: 'sponge', tags: ['clean'] },
  '🔑': { label: 'key', tags: ['lock'] },
  '🚪': { label: 'door', tags: ['entry'] },
  '🧸': { label: 'teddy bear', tags: ['toy'] },
  '🎁': { label: 'wrapped gift', tags: ['present'] },
  '🎈': { label: 'balloon', tags: ['party'] },
  '🎀': { label: 'ribbon', tags: ['gift'] },
  '🎊': { label: 'confetti ball', tags: ['party', 'celebration'] },
  '🎉': { label: 'party popper', tags: ['party', 'celebration'] },
  '❤️': { label: 'red heart', tags: ['love', 'heart'] },
  '🩷': { label: 'pink heart', tags: ['love', 'heart'] },
  '🧡': { label: 'orange heart', tags: ['love', 'heart'] },
  '💛': { label: 'yellow heart', tags: ['love', 'heart'] },
  '💚': { label: 'green heart', tags: ['love', 'heart'] },
  '💙': { label: 'blue heart', tags: ['love', 'heart'] },
  '🩵': { label: 'light blue heart', tags: ['love', 'heart'] },
  '💜': { label: 'purple heart', tags: ['love', 'heart'] },
  '🤎': { label: 'brown heart', tags: ['love', 'heart'] },
  '🖤': { label: 'black heart', tags: ['love', 'heart'] },
  '🩶': { label: 'grey heart', tags: ['love', 'heart'] },
  '🤍': { label: 'white heart', tags: ['love', 'heart'] },
  '💔': { label: 'broken heart', tags: ['heart', 'sad'] },
  '❣️': { label: 'heart exclamation', tags: ['heart', 'love'] },
  '💕': { label: 'two hearts', tags: ['heart', 'love'] },
  '💞': { label: 'revolving hearts', tags: ['heart', 'love'] },
  '💓': { label: 'beating heart', tags: ['heart', 'love'] },
  '💗': { label: 'growing heart', tags: ['heart', 'love'] },
  '💖': { label: 'sparkling heart', tags: ['heart', 'love'] },
  '💘': { label: 'heart with arrow', tags: ['heart', 'love'] },
  '💝': { label: 'heart with ribbon', tags: ['heart', 'gift'] },
  '☮️': { label: 'peace symbol', tags: ['peace'] },
  '✝️': { label: 'latin cross', tags: ['cross'] },
  '☪️': { label: 'star and crescent', tags: ['religion'] },
  '☯️': { label: 'yin yang', tags: ['symbol'] },
  '☢️': { label: 'radioactive', tags: ['warning'] },
  '☣️': { label: 'biohazard', tags: ['warning'] },
  '❌': { label: 'cross mark', tags: ['x', 'no', 'cancel'] },
  '⭕': { label: 'hollow red circle', tags: ['circle'] },
  '💯': { label: 'hundred points', tags: ['100', 'perfect'] },
  '💢': { label: 'anger symbol', tags: ['angry'] },
  '❗': { label: 'red exclamation mark', tags: ['exclamation', 'warning'] },
  '❓': { label: 'red question mark', tags: ['question'] },
  '⚠️': { label: 'warning', tags: ['alert'] },
  '♻️': { label: 'recycling symbol', tags: ['recycle'] },
  '✅': { label: 'check mark button', tags: ['check', 'done', 'yes'] },
  '❇️': { label: 'sparkle', tags: ['star'] },
  '🌐': { label: 'globe with meridians', tags: ['world', 'web'] },
  '💠': { label: 'diamond with a dot', tags: ['diamond'] },
  'Ⓜ️': { label: 'circled M', tags: ['metro'] },
  '💤': { label: 'zzz', tags: ['sleep'] },
  ℹ️: { label: 'information', tags: ['info'] },
  '🔤': { label: 'input latin letters', tags: ['letters'] },
  '🔡': { label: 'input lowercase letters', tags: ['letters'] },
  '🔠': { label: 'input uppercase letters', tags: ['letters'] },
  '🆕': { label: 'NEW button', tags: ['new'] },
  '🆗': { label: 'OK button', tags: ['ok'] },
  '🆙': { label: 'UP button', tags: ['up'] },
  '➡️': { label: 'right arrow', tags: ['arrow'] },
  '🆓': { label: 'FREE button', tags: ['free'] },
  '🏁': { label: 'chequered flag', tags: ['flag', 'finish'] },
  '🚩': { label: 'triangular flag', tags: ['flag'] },
  '🎌': { label: 'crossed flags', tags: ['flag'] },
  '🏴': { label: 'black flag', tags: ['flag'] },
  '🏳️': { label: 'white flag', tags: ['flag'] },
  '🏳️‍🌈': { label: 'rainbow flag', tags: ['flag', 'pride'] },
  '🏳️‍⚧️': { label: 'transgender flag', tags: ['flag', 'pride'] },
  '🏴‍☠️': { label: 'pirate flag', tags: ['flag'] },
  '🇺🇳': { label: 'United Nations flag', tags: ['flag', 'UN'] },
};

const getRegionFlagCode = (emoji: string) => {
  const regionalIndicators = Array.from(emoji);
  if (regionalIndicators.length !== 2) return '';

  const letters = regionalIndicators.map((indicator) => {
    const codePoint = indicator.codePointAt(0);
    if (!codePoint) return '';

    const letterIndex = codePoint - 0x1f1e6;
    if (letterIndex < 0 || letterIndex > 25) return '';

    return String.fromCharCode(65 + letterIndex);
  });

  return letters.every(Boolean) ? letters.join('') : '';
};

const getRegionDisplayNames = () => {
  if (regionDisplayNames !== undefined) return regionDisplayNames;
  const DisplayNames = (
    Intl as typeof Intl & {
      DisplayNames?: new (locales: string[], options: { type: 'region' }) => NmorphIntlDisplayNames;
    }
  ).DisplayNames;

  regionDisplayNames = DisplayNames ? new DisplayNames(['en'], { type: 'region' }) : null;
  return regionDisplayNames;
};

const getRegionFlagAnnotation = (emoji: string): NmorphEmojiAnnotation | null => {
  const code = getRegionFlagCode(emoji);
  if (!code) return null;

  let countryName: string | undefined;
  try {
    countryName = getRegionDisplayNames()?.of(code);
  } catch {
    countryName = undefined;
  }

  const label = countryName ? `flag ${countryName}` : `flag ${code}`;

  return {
    label,
    tags: ['flag', 'country', code],
  };
};

const resolveEmojiAnnotation = (emoji: string, groupLabel: string): NmorphEmojiAnnotation => {
  return (
    emojiAnnotations[emoji] ||
    getRegionFlagAnnotation(emoji) || {
      label: `${groupLabel} ${emoji}`,
      tags: [emoji],
    }
  );
};

const normalizeEmojiTags = (values: string[]) => {
  return values.map((value) => value.trim().toLocaleLowerCase()).filter(Boolean);
};

export const nmorphEmojiQuickList = ['👍', '❤️', '😂', '🎉', '🔥', '👀', '✅', '🙏'];

export const createNmorphEmojiLocale = (config: NmorphEmojiLocaleConfig): NmorphEmojiLocale => {
  const data: INmorphEmojiPickerItem[] = emojiGroups.flatMap((group, groupIndex) => {
    const localizedGroup = config.groups[group.group] || {
      label: group.group,
      tags: [],
    };
    const groupLabel = localizedGroup.label || group.group;
    const normalizedGroupLabel = groupLabel.toLocaleLowerCase(config.language);
    const tags = Array.from(new Set([...group.tags, ...localizedGroup.tags, normalizedGroupLabel]));

    return group.emojis
      .split(/\s+/)
      .filter(Boolean)
      .map((emoji, index) => {
        const annotation = resolveEmojiAnnotation(emoji, groupLabel);
        const itemTags = Array.from(
          new Set([...tags, ...normalizeEmojiTags([annotation.label, ...(annotation.tags || [])])])
        );

        return {
          emoji,
          annotation: annotation.label,
          groupLabel,
          tags: itemTags,
          group: group.group,
          order: groupIndex * 1000 + index,
        };
      });
  });

  return {
    language: config.language,
    data,
    i18n: config.i18n,
    quickList: config.quickList || nmorphEmojiQuickList,
  };
};
