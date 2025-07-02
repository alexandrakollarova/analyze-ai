import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Accordion from '../Accordion';

expect.extend(toHaveNoViolations);

describe('Accordion accessibility', () => {
  it('should have no accessibility violations (closed)', async () => {
    const { container } = render(
      <Accordion title="Section">Content</Accordion>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should have no accessibility violations (open)', async () => {
    const { container, getByRole } = render(
      <Accordion title="Section" defaultOpen>Content</Accordion>
    );
    // Simulate opening if not defaultOpen
    fireEvent.click(getByRole('button'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 