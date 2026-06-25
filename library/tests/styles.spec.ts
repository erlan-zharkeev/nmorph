import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import { getCommonStyles } from '@/hooks/use-common-styles';
import { getNmorphThemeStyles } from '@/outside-hooks/use-nmorph-theme';
import {
  NmorphScroll,
  NmorphText,
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphProgress,
  NmorphSelectButton,
} from '@/components';
import { options } from '@test/utils/components';

describe('shared component styles', () => {
  it('keeps NmorphScroll skin in common styles for plugin-only usage', () => {
    const styles = getCommonStyles();

    expect(styles).toContain('.nmorph-scroll::-webkit-scrollbar-track');
    expect(styles).toContain('box-shadow: var(--nmorph-shadow-inset);');
    expect(styles).toContain('.nmorph-scroll::-webkit-scrollbar-button');
  });

  it('defines shared typography for component thickness classes', () => {
    const styles = getCommonStyles();

    expect(styles).toContain('--line-height-control: 1.15;');
    expect(styles).toContain('--nmorph-typography-control-small-font-size: var(--font-size-extra-small);');
    expect(styles).toContain('--nmorph-typography-control-font-size: var(--font-size-small);');
    expect(styles).toContain('--nmorph-typography-control-large-font-size: var(--font-size-base);');
    expect(styles).toContain('--nmorph-private-control-font-size: var(--nmorph-typography-control-small-font-size);');
    expect(styles).toContain('--nmorph-private-control-font-size: var(--nmorph-typography-control-font-size);');
    expect(styles).toContain('--nmorph-private-control-font-size: var(--nmorph-typography-control-large-font-size);');
    expect(styles).toContain('font-size: var(--nmorph-private-control-font-size);');
    expect(styles).toContain('line-height: var(--nmorph-private-control-line-height);');
    expect(styles).toContain('.nmorph-typography--body');
    expect(styles).toContain('.nmorph-typography--control');
    expect(styles).toContain('--nmorph-plain-border: 1px solid var(--nmorph-plain-border-color);');
    expect(styles).toContain('.nmorph--plain-surface');
    expect(styles).not.toContain('.nmorph--thin-component.nmorph-native-input');
  });

  it('renders NmorphText with typography modifiers and style variables', () => {
    const wrapper = mount(NmorphText, {
      props: {
        as: 'p',
        variant: 'title',
        weight: 'bold',
        color: 'accent',
        align: 'center',
        truncate: true,
      },
      slots: {
        default: 'Typographic text',
      },
    });
    const text = wrapper.find('p');

    expect(text.exists()).toBe(true);
    expect(text.classes()).toContain('nmorph-typography');
    expect(text.classes()).toContain('nmorph-typography--title');
    expect(text.classes()).toContain('nmorph-typography--bold');
    expect(text.classes()).toContain('nmorph-typography--truncate');
    expect(text.element.style.getPropertyValue('--nmorph-private-text-color')).toBe('var(--nmorph-accent-color)');
    expect(text.element.style.getPropertyValue('--nmorph-private-text-align')).toBe('center');

    wrapper.unmount();
  });

  it('keeps default placeholder colors cool-toned', () => {
    const styles = getNmorphThemeStyles();

    expect(styles).toContain('--nmorph-placeholder-text-color: #9aa8b3;');
    expect(styles).toContain('--nmorph-placeholder-text-color: #68747b;');
  });

  it('aligns compact control typography with component thickness classes', () => {
    const selectButton = mount(NmorphSelectButton, {
      props: {
        modelValue: 'first',
        options,
        thickness: 'thin',
      },
    });

    const selectButtonElement = selectButton.find('.nmorph-select-button');

    expect(selectButtonElement.classes()).toEqual(
      expect.arrayContaining(['nmorph--thin-component', 'nmorph-select-button--thin'])
    );
    expect(selectButtonElement.attributes('style')).toBeUndefined();
    selectButton.unmount();

    const collapse = mount(
      defineComponent({
        components: { NmorphCollapse, NmorphCollapseItem },
        template: `
          <NmorphCollapse :model-value="['first']">
            <NmorphCollapseItem name="first" title="First" thickness="thin">Content</NmorphCollapseItem>
          </NmorphCollapse>
        `,
      })
    );

    expect(collapse.find('.nmorph-collapse-item__title').classes()).toContain('nmorph--thin-component');
    collapse.unmount();

    const progress = mount(NmorphProgress, {
      props: {
        percentage: 50,
        valueInside: true,
      },
    });

    expect((progress.find('.nmorph-progress').element as HTMLElement).style.getPropertyValue('--nmorph-private-progress-height')).toBe(
      '18px'
    );
    progress.unmount();
  });
});
