import { describe, it } from 'vitest';
import { getRenderCase, mountCase } from '@test/utils/components';

describe('NmorphSkeletonItem', () => {
  it('renders', async () => {
    await mountCase(getRenderCase('NmorphSkeletonItem'));
  });
});
