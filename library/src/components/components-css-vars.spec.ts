import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import {
  NmorphLink,
  NmorphBadge,
  NmorphCalendar,
  NmorphImagePreview,
  NmorphProgress,
  NmorphSkeleton,
  NmorphTable,
  NmorphAlert,
  NmorphCallout,
  NmorphTooltip,
} from '@/components';
import { imageSrc, tableData } from '@test/utils/components';

describe('component CSS variables', () => {
  it('forwards CSS variable props on data and feedback components', async () => {
    const assertStyles = async (wrapper, selector, expected) => {
      await nextTick();

      const element = wrapper.find(selector).element as HTMLElement;

      for (const [name, value] of Object.entries(expected)) {
        expect(element.style.getPropertyValue(name)).toBe(value);
      }

      wrapper.unmount();
    };

    await assertStyles(
      mount(NmorphBadge, { props: { color: '#123456', ribbonSize: 30, ribbonRadius: 6 } }),
      '.nmorph-badge',
      {
        '--nmorph-private-badge-color': '#123456',
        '--nmorph-private-badge-ribbon-height': '30px',
        '--nmorph-private-badge-ribbon-radius': '6px',
      }
    );

    await assertStyles(
      mount(NmorphProgress, {
        props: {
          percentage: 50,
          height: 12,
          widthTransition: 'width 120ms ease',
          indeterminateAnimation: 'pulse 1s linear infinite',
        },
      }),
      '.nmorph-progress',
      {
        '--nmorph-private-progress-height': '12px',
        '--nmorph-private-progress-width-transition': 'width 120ms ease',
        '--nmorph-private-progress-indeterminate-animation': 'pulse 1s linear infinite',
      }
    );

    await assertStyles(
      mount(NmorphCalendar, {
        props: {
          initialDate: new Date(2024, 0, 1),
          modelValue: new Date(2024, 0, 1),
          cellHeight: 44,
        },
      }),
      '.nmorph-calendar',
      {
        '--nmorph-private-calendar-cell-height': '44px',
      }
    );

    await assertStyles(
      mount(NmorphSkeleton, {
        props: {
          loadingGradient: 'linear-gradient(90deg, red, blue)',
        },
      }),
      '.nmorph-skeleton',
      {
        '--nmorph-private-skeleton-loading-gradient': 'linear-gradient(90deg, red, blue)',
      }
    );

    await assertStyles(
      mount(NmorphTable, {
        props: {
          data: tableData,
          borderColor: '#123456',
          cellHeight: 52,
          rowHoverBackground: 'rgba(1, 2, 3, 0.2)',
        },
      }),
      '.nmorph-table',
      {
        '--nmorph-private-table-border-color': '#123456',
        '--nmorph-private-table-cell-height': '52px',
        '--nmorph-private-table-row-hover-background': 'rgba(1, 2, 3, 0.2)',
      }
    );

    await assertStyles(
      mount(NmorphImagePreview, {
        props: {
          src: imageSrc,
          width: 222,
          height: '130px',
          radius: 10,
          fit: 'contain',
        },
      }),
      '.nmorph-image-preview',
      {
        '--nmorph-private-image-preview-trigger-width': '222px',
        '--nmorph-private-image-preview-trigger-height': '130px',
        '--nmorph-private-image-preview-radius': '10px',
      }
    );

    await assertStyles(
      mount(NmorphTooltip, {
        props: {
          forceShow: true,
          text: 'Tooltip',
          width: 180,
          maxWidth: '220px',
          height: 48,
        },
        slots: {
          default: '<button>Target</button>',
        },
      }),
      '.nmorph-tooltip',
      {
        '--nmorph-private-tooltip-width': '180px',
        '--nmorph-private-tooltip-max-width': '220px',
        '--nmorph-private-tooltip-height': '48px',
      }
    );

    await assertStyles(
      mount(NmorphAlert, {
        props: {
          id: 'alert-style',
          type: 'info',
          title: 'Alert',
          content: 'Content',
          backgroundColor: 'rgba(10, 20, 30, 0.2)',
        },
      }),
      '.nmorph-alert',
      {
        '--nmorph-private-alert-background-color': 'rgba(10, 20, 30, 0.2)',
      }
    );

    await assertStyles(
      mount(NmorphCallout, {
        props: {
          type: 'info',
          title: 'Callout',
          content: 'Content',
          color: '#345678',
          padding: 14,
          borderRadius: 'var(--border-radius-80)',
          accentWidth: 6,
          titleGap: 10,
          titleFontSize: '18px',
          contentFontSize: '13px',
        },
      }),
      '.nmorph-callout',
      {
        '--nmorph-private-callout-accent-color': '#345678',
        '--nmorph-private-callout-background-color': '#345678',
        '--nmorph-private-callout-padding': '14px',
        '--nmorph-private-callout-border-radius': 'var(--border-radius-80)',
        '--nmorph-private-callout-accent-width': '6px',
        '--nmorph-private-callout-title-gap': '10px',
        '--nmorph-private-callout-title-font-size': '18px',
        '--nmorph-private-callout-content-font-size': '13px',
      }
    );

    await assertStyles(
      mount(NmorphLink, {
        props: {
          href: '#',
          text: 'Link',
          color: '#abcdef',
        },
      }),
      '.nmorph-link',
      {
        '--nmorph-private-link-color': '#abcdef',
      }
    );
  });
});
