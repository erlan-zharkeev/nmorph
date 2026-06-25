import { computed, toValue, useAttrs } from 'vue';
import type { MaybeRefOrGetter, StyleValue } from 'vue';

export const useMergedAttrs = (classValue?: MaybeRefOrGetter<unknown>, styleValue?: MaybeRefOrGetter<StyleValue>) => {
  const attrs = useAttrs();

  return computed(() => {
    const { class: userClass, style: userStyle, ...restAttrs } = attrs;

    return {
      ...restAttrs,
      class: [toValue(classValue), userClass],
      style: [toValue(styleValue), userStyle],
    };
  });
};
