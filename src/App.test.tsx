import { render, screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import App from './App';

it('renders app heading', () => {
  renderWithProviders(<App />);
  const headingElement = screen.getByText(/dog poster generator/i);
  expect(headingElement).toBeInTheDocument();
});
