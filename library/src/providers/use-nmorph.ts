import { INmorphThemeInstance } from '@/types';
import { inject } from 'vue';

export const useNmorph = () => {
  return inject<INmorphThemeInstance>('nmorph');
};
