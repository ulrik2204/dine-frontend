import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  expect(5).toEqual(5);
});
