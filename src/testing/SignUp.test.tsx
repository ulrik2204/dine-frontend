import Button from '@material-ui/core/Button';
import { createMount } from '@material-ui/core/test-utils';
import { screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import axios from '../myaxios';
import DinnerPage from '../pages/DinnerPage/index';

jest.mock('../myaxios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
configure({ adapter: new Adapter() });

const mockDinner = {
  dish: 'Spaghetti',
  cuisine: 'Italiensk',
  date: 'Tue Nov 14 2017 15:03:43 GMT+0530 (IST)',
  location: 'Oslo',
  description: 'beskrivelse',
  allergies: null,
};

const mockUser = {
  username: 'Haakon',
  first_name: 'Haakon',
  last_name: 'Selnes',
  allergies: null,
  password: 'test',
};

const data = { status: 201 };

describe('Testing signing up for dinner', () => {
  let mount: any;
  let wrapper: any;
  let signUpButton: any;

  beforeAll(() => {
    mount = createMount();
    mockedAxios.get.mockResolvedValue(data);
    wrapper = mount(
      <div>
        <ToastContainer /> <DinnerPage dinnerID={-1} />
      </div>,
    );
    signUpButton = screen.getByText('Meld på');
  });

  test('Test you appear on attendee list when clicking signup button', async () => {
    signUpButton = wrapper.find(Button);
    mockedAxios.get.mockResolvedValue(data);
    signUpButton.simulate('click');
    await screen.findByText('Haakon Selnes');
  });

  test('Test that signup button is gone when you are already signed up', async () => {
    try {
      signUpButton = wrapper.find(Button);
    } catch {}
  });
});
