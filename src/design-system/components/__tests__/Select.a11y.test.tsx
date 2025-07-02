import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Select from '../Select';

expect.extend(toHaveNoViolations);

describe('Select accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Select aria-label="Select">
        <option value="1">One</option>
        <option value="2">Two</option>
      </Select>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 