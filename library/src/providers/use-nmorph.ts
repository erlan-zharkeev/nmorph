import { INmorphInstance } from '@/types';
import { inject } from 'vue';

export const useNmorph = () => {
  return inject<INmorphInstance>('nmorph');
};
