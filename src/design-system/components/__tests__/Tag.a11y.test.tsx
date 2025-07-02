import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Tag from '../Tag';

expect.extend(toHaveNoViolations);

describe('Tag accessibility', () => {
  it('should have no accessibility violations (default)', async () => {
    const { container } = render(<Tag>Default Tag</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (success variant)', async () => {
    const { container } = render(<Tag variant="success">Success Tag</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (subtle)', async () => {
    const { container } = render(<Tag subtle>Subtle Tag</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 