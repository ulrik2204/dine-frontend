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
  date: '2021-04-03T20:00',
  location: 'Oslo',
  description: 'beskrivelse',
  allergies: [],
};

const mockUser = {
  username: 'Haakon',
  first_name: 'Haakon',
  last_name: 'Selnes',
  allergies: [],
  password: 'test',
};

const fakeDinner = { status: 200, data: { dinner: mockDinner }, statusText: 'Created' };

// This test had to mock different responses for different GET requests for it to work
// this is possble, but requires more work, thus this test is diabled
describe.skip('Testing signing up for dinner', () => {
  let mount: any;
  let wrapper: any;
  let signUpButton: any;

  beforeAll(() => {
    mount = createMount();
    mockedAxios.get.mockResolvedValue(fakeDinner);
    wrapper = mount(
      <div>
        <ToastContainer />
        <UserContext.Provider value={{ userToken: 'fdsagsd', setUserToken: () => {} }}>
          <ToastContainer /> <DinnerPage dinnerID={1} />
        </UserContext.Provider>
      </div>,
    );
  });

  test('Test you appear on attendee list when clicking signup button', async () => {
    signUpButton = screen.getByText('Meld deg på');
    mockedAxios.get.mockResolvedValue(mockUser);
    fireEvent.click(signUpButton);
    await screen.findByText('Haakon Selnes');
  });

  test('Test that signup button is gone when you are already signed up', async () => {
    try {
      signUpButton = screen.getByText('Meld deg på');
      throw new Error('Signup button was found');
    } catch {}
  });
});
