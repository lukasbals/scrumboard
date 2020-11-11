import React from 'react';
import { render } from '../testUtils';
import { Home } from '../../pages/index';

describe('The Home page', () => {
  it('displays the headline', () => {
    const { getByText } = render(<Home />, {});

    expect(getByText('Scrumboard')).toBeInTheDocument();
  });
});
