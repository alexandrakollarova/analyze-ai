import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Banner from '../Banner';

expect.extend(toHaveNoViolations);

describe('Banner accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Banner title="Announcement!" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 