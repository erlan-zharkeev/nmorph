import { translate as NmorphSwitch } from '@/components/form/nmorph-switch/translate';
import { translate as NmorphCalendar } from '@/components/data/nmorph-calendar/translate';
import { translate as NmorphDatePicker } from '@/components/form/nmorph-date-picker/translate';
import { translate as NmorphImage } from '@/components/data/nmorph-image/translate';
import { translate as NmorphSelect } from '@/components/form/nmorph-select/translate';

import { Locale, TranslateMessages } from '@/main';

export const translation: TranslateMessages = {
  NmorphSwitch: NmorphSwitch[Locale.ru],
  NmorphCalendar: NmorphCalendar[Locale.ru],
  NmorphDatePicker: NmorphDatePicker[Locale.ru],
  NmorphImage: NmorphImage[Locale.ru],
  NmorphSelect: NmorphSelect[Locale.ru],
};
