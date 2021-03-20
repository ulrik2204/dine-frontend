import { act } from 'react-dom/test-utils';
import CreateDinnerPage from '../pages/CreateDinnerPage/index';
import { render, fireEvent, getByTestId, getByText } from '@testing-library/react';
import { toast, ToastContainer } from 'react-toastify';
import { Toast } from 'react-toastify/dist/components';
import App from '../App';

beforeEach(() => {
  act(() => {
    const site = render(<CreateDinnerPage />);
    render(<ToastContainer autoClose={false} />);
    const { getByTestId } = site;
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

test('Error if dish empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'dishInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  getByText(document.body, 'Du må fylle inn alle feltene');
});

test('Error if location empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'locationInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(<ToastContainer />).toBeInTheDocument;
});

test('Error if description empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'descriptionInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(<ToastContainer />).toBeInTheDocument;
});

test('Error if dateTime empty', () => {
  act(() => {
    const input = getByTestId(document.body, 'dateTimeInput');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByTestId(document.body, 'sendKnapp');
    fireEvent.click(button);
  });
  expect(<ToastContainer />).toBeInTheDocument;
});
