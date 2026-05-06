import { INmorphInstance } from '@/types';
import { inject } from 'vue';

export const useNmorph = (): INmorphInstance => {
  const nmorph = inject<INmorphInstance>('nmorph');
  if (!nmorph) throw new Error('Nmorph instance is not provided');
  return nmorph;
};
