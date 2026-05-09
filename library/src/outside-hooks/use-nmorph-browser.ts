import { ref } from 'vue';

export const useNmorphBrowser = () => {
  const dimensions = ref({ width: 0, height: 0 });
  const scrollTop = ref(0);

  let resizeTimeout: ReturnType<typeof setTimeout>;
  let scrollTimeout: ReturnType<typeof setTimeout>;

  const resizeHandler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      dimensions.value.width = window.innerWidth;
      dimensions.value.height = window.innerHeight;
    }, 400);
  };

  const scrollHandler = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollTop.value = window.scrollY;
    }, 400);
  };

  if (typeof window !== 'undefined') {
    dimensions.value.width = window.innerWidth;
    dimensions.value.height = window.innerHeight;
    scrollTop.value = window.scrollY;
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', scrollHandler);
  }

  return {
    dimensions,
    scrollTop,
  };
};
