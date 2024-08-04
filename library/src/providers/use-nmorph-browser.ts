import { ref } from 'vue';

export const useNmorphBrowser = () => {
  const dimensions = ref({ width: 0, height: 0 });

  const resizeHandler = () => {
    dimensions.value.width = window.innerWidth;
    dimensions.value.height = window.innerHeight;
  };

  if (window) {
    window.addEventListener('resize', resizeHandler);
  }

  return {
    dimensions,
  };
};
