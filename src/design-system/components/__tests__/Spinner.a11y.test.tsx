import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Spinner from '../Spinner';

expect.extend(toHaveNoViolations);

describe('Spinner accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 