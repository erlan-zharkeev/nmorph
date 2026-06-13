import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphSelectButtonItem', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphSelectButtonItem'));
  });
});
