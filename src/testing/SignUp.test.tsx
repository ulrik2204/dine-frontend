import Button from '@material-ui/core/Button';
import { createMount } from '@material-ui/core/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import axios from '../myaxios';
import DinnerPage from '../pages/DinnerPage/index';

jest.mock('../myaxios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
configure({ adapter: new Adapter() });

describe('Testing signing up for dinner', () => {
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
        <ToastContainer /> <DinnerPage />
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

