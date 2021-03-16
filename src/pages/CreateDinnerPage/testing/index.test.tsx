import { act } from 'react-dom/test-utils';
import CreateDinnerPage from '../index';
import { render, fireEvent, getByTestId } from '@testing-library/react';

beforeEach(() => {
  act(() => {
    const { getByTestId } = render(<CreateDinnerPage />);
    const dishInput = getByTestId('dishInput');
    const locationInput = getByTestId('locationInput');
    const descriptionInput = getByTestId('descriptionInput');
    const dateTimeInput = getByTestId('dateTimeInput');
    fireEvent.change(dishInput, { target: { value: 'abc' } });
    fireEvent.change(locationInput, { target: { value: 'abc' } });
    fireEvent.change(descriptionInput, { target: { value: 'abc' } });
    fireEvent.change(dateTimeInput, { target: { value: '123' } });
  });
});

it('Error if dish empty', () => {
  act(() => {
    jest.spyOn(window, 'alert');
    const input = getByTestId(document.body, 'dishInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(window.alert).toHaveBeenCalledWith('Du må skrive inn alle feltene');
});

it('Error if location empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'locationInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(window.alert).toHaveBeenCalledWith('Du må skrive inn alle feltene');
});

it('Error if description empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'descriptionInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(window.alert).toHaveBeenCalledWith('Du må skrive inn alle feltene');
});

it('Error if dateTime empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'dateTimeInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(window.alert).toHaveBeenCalledWith('Du må skrive inn alle feltene');
});
