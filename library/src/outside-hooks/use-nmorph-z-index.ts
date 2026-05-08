import { ref } from 'vue';

export const useNmorphZIndex = (options: { base?: number } = {}) => {
  const current = ref(options.base ?? 1000);

  const next = () => {
    current.value += 1;
    return current.value;
  };

  return { current, next };
};
