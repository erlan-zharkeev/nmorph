import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import {
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphDatePicker,
  NmorphFileUpload,
  NmorphSelect,
  NmorphSelectOption,
  NmorphSlider,
  NmorphSwitch,
  NmorphTimePicker,
  NmorphSelectButton,
} from '@/components';
import { options } from '@test/utils/components';

describe('form controls', () => {
  it('forwards CSS variable props on form controls', async () => {
    const assertStyles = async (wrapper, selector, expected) => {
      await nextTick();

      const element = wrapper.find(selector).element as HTMLElement;

      for (const [name, value] of Object.entries(expected)) {
        expect(element.style.getPropertyValue(name)).toBe(value);
      }

      wrapper.unmount();
    };

    await assertStyles(
      mount(NmorphSwitch, {
        props: {
          modelValue: true,
          width: 54,
          height: 30,
          offset: 4,
          thumbHeight: 22,
        },
      }),
      '.nmorph-switch',
      {
        '--nmorph-private-switch-width': '54px',
        '--nmorph-private-switch-height': '30px',
        '--nmorph-private-switch-offset': '4px',
        '--nmorph-private-switch-thumb-height': '22px',
      }
    );

    await assertStyles(
      mount(NmorphSelectButton, {
        props: {
          modelValue: 'first',
          options,
          customThickness: 36,
        },
      }),
      '.nmorph-select-button',
      {
        '--nmorph-private-control-height': '36px',
      }
    );

    await assertStyles(
      mount(NmorphSelect, {
        props: {
          modelValue: 'first',
          options,
          width: 280,
        },
      }),
      '.nmorph-select',
      {
        '--nmorph-private-select-width': '280px',
      }
    );

    await assertStyles(
      mount(NmorphSelectOption, {
        props: {
          value: 'first',
          label: 'First',
          hoverBackground: '#111111',
          hoverColor: '#eeeeee',
        },
        global: {
          provide: {
            'select-selected-value': ref('first'),
            'select-change-selected-value': () => undefined,
          },
        },
      }),
      '.nmorph-select-option',
      {
        '--nmorph-private-select-option-hover-background': '#111111',
        '--nmorph-private-select-option-hover-color': '#eeeeee',
      }
    );

    const fileUpload = mount(NmorphFileUpload, {
      props: {
        compact: true,
        layout: 'inline',
        fileNameWidth: 180,
      },
    });
    const fileUploadElement = fileUpload.find('.nmorph-file-upload').element as HTMLElement;

    expect(fileUpload.find('.nmorph-file-upload').classes()).toEqual(
      expect.arrayContaining(['nmorph-file-upload--compact', 'nmorph-file-upload--layout-inline'])
    );
    expect(fileUploadElement.style.getPropertyValue('--nmorph-private-file-upload-name-width')).toBe('180px');
    fileUpload.unmount();

    await assertStyles(
      mount(NmorphSlider, {
        props: {
          modelValue: 40,
          thumbWidth: 64,
          sliderHeight: 28,
          valueFixedContainerHeight: 12,
        },
      }),
      '.nmorph-slider',
      {
        '--nmorph-private-slider-thumb-width': '64px',
        '--nmorph-private-slider-height': '28px',
        '--nmorph-private-slider-value-container-height': '12px',
      }
    );

    await assertStyles(
      mount(NmorphDatePicker, {
        props: {
          modelValue: new Date(2024, 0, 1),
          initialDate: new Date(2024, 0, 1),
          width: 260,
          calendarCellHeight: 38,
        },
      }),
      '.nmorph-date-picker',
      {
        '--nmorph-private-date-picker-width': '260px',
        '--nmorph-private-date-picker-calendar-cell-height': '38px',
      }
    );

    await assertStyles(
      mount(NmorphTimePicker, {
        props: {
          modelValue: '09:30',
          width: 180,
        },
      }),
      '.nmorph-time-picker',
      {
        '--nmorph-private-time-picker-width': '180px',
      }
    );

    await assertStyles(
      mount(
        defineComponent({
          components: { NmorphCollapse, NmorphCollapseItem },
          template: `
            <NmorphCollapse :model-value="['first']">
              <NmorphCollapseItem name="first" title="First" :transition-speed="220">Content</NmorphCollapseItem>
            </NmorphCollapse>
          `,
        })
      ),
      '.nmorph-collapse-item',
      {
        '--nmorph-private-collapse-item-transition-speed': '220ms',
      }
    );
  });
});
