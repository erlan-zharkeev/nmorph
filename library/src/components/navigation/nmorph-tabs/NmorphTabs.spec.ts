import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphTabs', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphTabs'));
  });
});
