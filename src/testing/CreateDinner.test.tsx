import { act } from 'react-dom/test-utils';
import CreateDinnerPage from '../pages/CreateDinnerPage/index';
import { render, fireEvent, getByTestId, getByText, screen, getByRole, waitFor } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { createMount } from '@material-ui/core/test-utils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
// import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
configure({ adapter: new Adapter() });
describe('Testing the CreateDinnerPage', () => {
  let mount: any;
  let wrapper: any;
  beforeEach(() => {
    // Mock the allergies response
    const data = [{ id: 1, allergy: 'bløtdyr' }];
    mockedAxios.get.mockResolvedValue(data);
    mount = createMount();
    wrapper = mount(
      <div>
        <ToastContainer /> <CreateDinnerPage />
      </div>,
    );
  });

  test('Testing if toast pops up if everything is empty', async () => {
    const button = wrapper.find(Button);
    button.simulate('click');
    await screen.findByText('Du må fylle inn alle feltene');
  });
  /*
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
*/
  afterEach(() => {
    mount.cleanUp();
  });
});
