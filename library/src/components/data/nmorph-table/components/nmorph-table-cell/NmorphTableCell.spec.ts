import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphTableCell', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphTableCell'));
  });
});
