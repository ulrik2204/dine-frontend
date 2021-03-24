import Button from '@material-ui/core/Button';
import { createMount } from '@material-ui/core/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { configure } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import CreateDinnerPage from '../pages/CreateDinnerPage/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
configure({ adapter: new Adapter() });
describe('Testing the CreateDinnerPage', () => {
  let mount: any;
  let wrapper: any;

  // The input fields
  let dishInput: any;
  let cuisine: any;
  let locationInput: any;
  let descriptionInput: any;
  let button: any;
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
    dishInput = screen.getByPlaceholderText('Navn på retten');
    cuisine = screen.getByText('Velg kjøkken');
    locationInput = screen.getByPlaceholderText('Der middagen finner sted');
    descriptionInput = screen.getByPlaceholderText('Beskrivelse av middagen');
    button = wrapper.find(Button);
    fireEvent.change(dishInput, { target: { value: 'abc' } });
    fireEvent.click(cuisine);
    fireEvent.keyDown(cuisine, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(cuisine, { key: 'Enter', code: 'Enter' });
    fireEvent.change(locationInput, { target: { value: 'abc' } });
    fireEvent.change(descriptionInput, { target: { value: 'abc' } });
  });

  test('Testing if toast pops up if everything is empty', async () => {
    fireEvent.change(dishInput, { target: { value: '' } });
    fireEvent.change(locationInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });
    button.simulate('click');
    await screen.findByText('Du må fylle inn alle feltene');
  });

  test('Testing if a toast pops up if dish is empty', async () => {
    fireEvent.change(dishInput, { target: { value: '' } });
    button.simulate('click');
    await screen.findByText('Du må fylle inn alle feltene');
  });

  test('Test if toas pops up if location is empty', async () => {
    fireEvent.change(locationInput, { target: { value: '' } });
    button.simulate('click');
    await screen.findByText('Du må fylle inn alle feltene');
  });

  // Clean up after the tests
  afterEach(() => {
    mount.cleanUp();
  });
});
