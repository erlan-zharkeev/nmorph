import { ref, type Ref } from 'vue';

interface INmorphFocusableInputOptions {
  onFocus?: () => void;
  onBlur?: () => void;
}

interface INmorphFocusableInputReturn<TElement extends HTMLElement = HTMLElement> {
  elementRef: Ref<TElement | null>;
  focused: Ref<boolean>;
  handleFocus: () => void;
  handleBlur: () => void;
  focus: () => void;
  blur: () => void;
  select: () => void;
}

export const useFocusableInput = <TElement extends HTMLElement = HTMLElement>(
  options: INmorphFocusableInputOptions = {}
): INmorphFocusableInputReturn<TElement> => {
  const elementRef = ref(null) as Ref<TElement | null>;
  const focused = ref(false);

  const handleFocus = () => {
    focused.value = true;
    options.onFocus?.();
  };

  const handleBlur = () => {
    focused.value = false;
    options.onBlur?.();
  };

  const focus = () => {
    elementRef.value?.focus();
  };

  const blur = () => {
    elementRef.value?.blur();
  };

  const select = () => {
    const element = elementRef.value;
    if (element && 'select' in element && typeof element.select === 'function') {
      element.select();
    }
  };

  return {
    elementRef,
    focused,
    handleFocus,
    handleBlur,
    focus,
    blur,
    select,
  };
};
