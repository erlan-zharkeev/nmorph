import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphImage', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphImage'));
  });
});
