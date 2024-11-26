import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    currentTheme: "dark",
    setNmorphTheme: (payload: string) => {},
    getDynamicColorVariables: (mainBgColor: string) => [],
  }),
  actions: {
    inferNmorphSetTheme(fn: (payload: string) => void) {
      this.setNmorphTheme = fn;
    },
    changeTheme(theme: string) {
      this.currentTheme = theme;
      this.setNmorphTheme(this.currentTheme);
    },
    inferGetDynamicColorVariables(fn: (payload: string) => []) {
      this.getDynamicColorVariables = fn;
    },
  },
});
