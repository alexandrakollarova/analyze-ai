import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Tooltip from '../Tooltip';

expect.extend(toHaveNoViolations);

describe('Tooltip accessibility', () => {
  it('should have no accessibility violations when visible', async () => {
    const { container } = render(
      <Tooltip show>Tooltip content</Tooltip>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 