import { createMount } from '@material-ui/core/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import axios from '../myaxios';
import DinnerPage from '../pages/DinnerPage/index';
import UserContext from '../util/UserContext';

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

const data = { status: 201, data: { token: 'raghoi4qtadrfohjig43' }, statusText: 'OK' };

describe('Testing signing up for dinner', () => {
  let mount: any;
  let wrapper: any;
  let signUpButton: any;

  beforeAll(() => {
    mount = createMount();
    mockedAxios.get.mockResolvedValue(data);
    wrapper = mount(
      <div>
        <ToastContainer />
        <UserContext.Provider value={{ userToken: 'fdsagsd', setUserToken: () => {} }}>
          <ToastContainer /> <DinnerPage dinnerID={-1} />
        </UserContext.Provider>
      </div>,
    );
  });

  test('Test you appear on attendee list when clicking signup button', async () => {
    signUpButton = screen.getByText('Meld på');
    mockedAxios.get.mockResolvedValue(mockUser);
    fireEvent.click(signUpButton);
    await screen.findByText('Haakon Selnes');
  });

  test('Test that signup button is gone when you are already signed up', async () => {
    try {
      signUpButton = screen.getByText('Meld på');
      throw new Error('Signup button was found');
    } catch {}
  });
});
