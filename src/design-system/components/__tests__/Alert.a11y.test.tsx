import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Alert from '../Alert';

expect.extend(toHaveNoViolations);

describe('Alert accessibility', () => {
  it('should have no accessibility violations (success)', async () => {
    const { container } = render(<Alert severity="success">Success message</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (error)', async () => {
    const { container } = render(<Alert severity="error">Error message</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (info)', async () => {
    const { container } = render(<Alert severity="info">Info message</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (warning)', async () => {
    const { container } = render(<Alert severity="warning">Warning message</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 