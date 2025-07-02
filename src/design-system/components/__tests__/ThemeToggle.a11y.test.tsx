import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ThemeToggle from '../ThemeToggle';

expect.extend(toHaveNoViolations);

describe('ThemeToggle accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ThemeToggle />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 