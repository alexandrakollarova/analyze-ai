import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Input from '../Input';

expect.extend(toHaveNoViolations);

describe('Input accessibility', () => {
  it('should have no accessibility violations (default)', async () => {
    const { container } = render(<Input placeholder="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (with leftIcon)', async () => {
    const { container } = render(<Input leftIcon={<span>Icon</span>} placeholder="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (disabled)', async () => {
    const { container } = render(<Input disabled placeholder="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 