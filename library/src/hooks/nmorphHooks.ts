import { onMounted, ref, watch } from 'vue';
type ThemeType = 'dark' | 'light';

export const useTheme = (defaultTheme: ThemeType = 'dark') => {
  const isThemeLight = ref(defaultTheme === 'light');
  const html = ref(null);

  onMounted(() => {
    html.value = document.querySelector('html');
    html?.value.setAttribute('data-theme', isThemeLight.value ? 'light' : 'dark');
  });

  watch(
    isThemeLight,
    (newValue) => {
      if (!html.value) return;
      if (!newValue) {
        html?.value.setAttribute('data-theme', isThemeLight.value ? 'light' : 'dark');
      } else {
        html?.value.removeAttribute('data-theme');
      }
    },
    { immediate: true }
  );

  const toggleTheme = () => {
    isThemeLight.value = !isThemeLight.value;
  };

  const setTheme = (theme: ThemeType) => {
    isThemeLight.value = theme === 'dark';
  };

  return {
    isThemeLight,
    toggleTheme,
    setTheme,
  };
};
