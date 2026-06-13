import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphColorPicker', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphColorPicker'));
  });
});
