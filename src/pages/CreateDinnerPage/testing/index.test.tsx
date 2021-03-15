import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

import CreateDinnerPage from '../index';
import { fireEvent, getByTestId } from '@testing-library/dom';

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    render(<CreateDinnerPage />, container);
    const dishInput = getByTestId(container, 'dishInput');
    const locationInput = getByTestId(container, 'locationInput');
    const ownerInput = getByTestId(container, 'ownerInput');
    const descriptionInput = getByTestId(container, 'descriptionInput');
    const dateTimeInput = getByTestId(container, 'dateTimeInput');
    fireEvent.change(dishInput, { target: { value: 'abc' } });
    fireEvent.change(locationInput, { target: { value: 'abc' } });
    fireEvent.change(ownerInput, { target: { value: 'abc' } });
    fireEvent.change(descriptionInput, { target: { value: 'abc' } });
    fireEvent.change(dateTimeInput, { target: { value: 'abc' } });
  });
});
afterEach(() => {
  // cleanup on exiting

  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Error if dish empty', () => {
  act(() => {
    const input = getByTestId(container, 'dishInput');
    fireEvent.change(input, { target: { value: '' } });
  });
  try {
    act(() => {
      const button = getByTestId(container, 'sendKnapp');
      fireEvent.click(button);
      throw new Error('No error when dish empty');
    });
  } catch {}
});

it('Error if location empty', () => {
  act(() => {
    const input = getByTestId(container, 'locationInput');
    fireEvent.change(input, { target: { value: '' } });
  });
  try {
    act(() => {
      const button = getByTestId(container, 'sendKnapp');
      fireEvent.click(button);
      throw new Error('No error when location empty');
    });
  } catch {}
});

it('Error if owner empty', () => {
  act(() => {
    const input = getByTestId(container, 'ownerInput');
    fireEvent.change(input, { target: { value: '' } });
  });
  try {
    act(() => {
      const button = getByTestId(container, 'sendKnapp');
      fireEvent.click(button);
      throw new Error('No error when owner empty');
    });
  } catch {}
});

it('Error if description empty', () => {
  act(() => {
    const input = getByTestId(container, 'descriptionInput');
    fireEvent.change(input, { target: { value: '' } });
  });
  try {
    act(() => {
      const button = getByTestId(container, 'sendKnapp');
      fireEvent.click(button);
      throw new Error('No error when description empty');
    });
  } catch {}
});

it('Error if dateTime empty', () => {
  act(() => {
    const input = getByTestId(container, 'dateTimeInput');
    fireEvent.change(input, { target: { value: '' } });
  });
  try {
    act(() => {
      const button = getByTestId(container, 'sendKnapp');
      fireEvent.click(button);
      throw new Error('No error when dateTime empty');
    });
  } catch {}
});
