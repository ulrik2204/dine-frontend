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

describe('Testing signing up for dinner', () => {
  let mount: any;
  let wrapper: any;

  let signUpButton: any;
  let attendees: any;

  beforeEach(() => {
    mount = createMount();
    wrapper = mount(
      <div>
        <ToastContainer /> <DinnerPage dinnerID={-1} />
      </div>,
    );
    signUpButton = screen.getByText('Meld på');
  });

  test('Test you appear on attendee list when clicking signup button', async () => {
    signUpButton = screen.getByText('Meld på');
    const data = { status: 201 };
    mockedAxios.get.mockResolvedValue(data);
    signUpButton.simulate('click');
  });
});
