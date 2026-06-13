import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphDivider', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphDivider'));
  });
});
