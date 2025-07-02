import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import CustomSelect from '../CustomSelect';

expect.extend(toHaveNoViolations);

describe('CustomSelect accessibility', () => {
  it('should have no accessibility violations (closed)', async () => {
    const { container } = render(
      <CustomSelect
        value="1"
        onChange={() => {}}
        options={[
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
        placeholder="Select..."
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 