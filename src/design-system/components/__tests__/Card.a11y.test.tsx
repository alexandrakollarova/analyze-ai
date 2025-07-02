import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Card from '../Card';

expect.extend(toHaveNoViolations);

describe('Card accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Card>Card content</Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 