import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

import CreateDinnerPage from '../index';

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Error if cusine empty', () => {
  act(() => {
    render(<CreateDinnerPage />, container);
    container.CreateDinnerPage.setCuisine('');
  });
  try {
    container.CreateDinnerPage.sendKnapp.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    throw new Error('No error when cusine empty');
  } catch {}
});

it('Error if location empty', () => {
  act(() => {
    render(<CreateDinnerPage />, container);
    container.CreateDinnerPage.setLocation('');
  });
  try {
    container.CreateDinnerPage.sendKnapp.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    throw new Error('No error when location empty');
  } catch {}
});

it('Error if dish empty', () => {
  act(() => {
    render(<CreateDinnerPage />, container);
    container.CreateDinnerPage.setDish('');
  });
  try {
    container.CreateDinnerPage.sendKnapp.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    throw new Error('No error when dish empty');
  } catch {}
});

it('Error if dish empty', () => {
  act(() => {
    render(<CreateDinnerPage />, container);
    container.CreateDinnerPage.setDish('');
  });
  try {
    container.CreateDinnerPage.sendKnapp.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    throw new Error('No error when dish empty');
  } catch {}
});

it('Error if description empty', () => {
  act(() => {
    render(<CreateDinnerPage />, container);
    container.CreateDinnerPage.setDescription('');
  });
  try {
    container.CreateDinnerPage.sendKnapp.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    throw new Error('No error when description empty');
  } catch {}
});

it('Error if DateTime empty', () => {
  act(() => {
    render(<CreateDinnerPage />, container);
    container.CreateDinnerPage.setDateTime(new Date().toISOString());
  });
  try {
    container.CreateDinnerPage.sendKnapp.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    throw new Error('No error when DateTime empty');
  } catch {}
});
