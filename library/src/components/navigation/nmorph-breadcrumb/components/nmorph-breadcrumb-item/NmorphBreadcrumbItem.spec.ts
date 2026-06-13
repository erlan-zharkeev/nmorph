import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphBreadcrumbItem', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphBreadcrumbItem'));
  });
});
