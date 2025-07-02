import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Checkbox from '../Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox accessibility', () => {
  it('should have no accessibility violations (checked)', async () => {
    const { container } = render(
      <Checkbox checked label="Accept terms" onChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 