import { translate as NmorphSwitch } from '@/components/form/nmorph-switch/translate';
import { translate as NmorphCalendar } from '@/components/data/nmorph-calendar/translate';
import { Locale, TranslateMessages } from '@/main';

export const translation: TranslateMessages = {
  NmorphSwitch: NmorphSwitch[Locale.en],
  NmorphCalendar: NmorphCalendar[Locale.en],
};
