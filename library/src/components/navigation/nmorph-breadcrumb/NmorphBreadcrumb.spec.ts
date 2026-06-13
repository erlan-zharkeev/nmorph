import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphBreadcrumb', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphBreadcrumb'));
  });
});
