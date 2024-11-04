export const useMock = () => {
  const { t } = useI18n();

  const drinks = [
    {
      disabled: false,
      label: t("overview.form.basic-usage.coffee"),
      value: "coffee",
    },
    {
      disabled: false,
      label: t("overview.form.basic-usage.tea"),
      value: "tea",
    },
    {
      disabled: false,
      label: "Kombucha",
      value: "kombucha",
    },
  ];

  const browsers = [
    {
      id: "chrome",
      disabled: false,
      modelValue: true,
      label: "Chrome",
    },
    {
      id: "unknown",
      disabled: true,
      modelValue: false,
      label: t("overview.form.basic-usage.unknown"),
    },
    {
      id: "firefox",
      disabled: false,
      modelValue: false,
      label: "Firefox",
    },
    {
      id: "ie",
      disabled: false,
      modelValue: false,
      label: "IE",
    },
  ];

  const food = [
    {
      label: t("overview.form.basic-usage.pear"),
      value: t("overview.form.basic-usage.pear"),
    },
    {
      label: t("overview.form.basic-usage.apple"),
      value: t("overview.form.basic-usage.apple"),
    },
    {
      label: t("overview.form.basic-usage.orange"),
      value: t("overview.form.basic-usage.orange"),
    },
  ];

  return { drinks, browsers, food };
};
