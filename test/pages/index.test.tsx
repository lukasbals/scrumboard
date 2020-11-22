import React from 'react';
import { render } from '../testUtils';
import { Home } from '../../pages/index';
import { RenderResult } from '@testing-library/react';

const setup = (): RenderResult => render(<Home />);

describe('The Home page', () => {
  it('displays the headline', () => {
    const { getByText } = setup();

    expect(getByText('Scrumboard.')).toBeInTheDocument();
  });

  it('displays a input field', () => {
    const { getByRole } = setup();

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a create board button', () => {
    const { getByRole } = setup();

    expect(getByRole('button')).toHaveTextContent('Create board');
  });
});
