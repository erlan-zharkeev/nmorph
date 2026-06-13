import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphTabPane', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphTabPane'));
  });
});
