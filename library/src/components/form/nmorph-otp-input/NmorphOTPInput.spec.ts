import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphOTPInput', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphOTPInput'));
  });
});
