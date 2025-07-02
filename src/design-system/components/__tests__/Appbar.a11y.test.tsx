import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Appbar from '../Appbar';

expect.extend(toHaveNoViolations);

describe('Appbar accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Appbar title="App Title" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 