import { describe, expect, it, vi } from 'vitest';
import { createSSRApp, defineComponent, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { NmorphLibrary } from '@/main';
import { NmorphDatePicker, NmorphSelect, NmorphOverlay } from '@/components';
import { options } from '@test/utils/components';

describe('component SSR rendering', () => {
  it('renders overlay and form components on the server', async () => {
    const currentDocument = globalThis.document;
    vi.stubGlobal('document', undefined);

    const app = createSSRApp(
      defineComponent({
        setup() {
          return () =>
            h(
              NmorphOverlay,
              { show: true, disabledTeleport: true },
              {
                default: () => [
                  h(NmorphSelect, { modelValue: 'first', options }),
                  h(NmorphDatePicker, { modelValue: new Date(2024, 0, 1) }),
                ],
              }
            );
        },
      })
    );

    app.use(NmorphLibrary, {
      i18n: {
        locale: 'en',
      },
    });

    const context: { teleports?: Record<string, string> } = {};
    let renderedHtml = '';

    try {
      const html = await renderToString(app, context);
      renderedHtml = [html, ...Object.values(context.teleports || {})].join('');
    } finally {
      vi.stubGlobal('document', currentDocument);
    }

    expect(renderedHtml).toContain('nmorph-overlay');
  });
});
