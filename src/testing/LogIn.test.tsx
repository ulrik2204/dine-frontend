import { createMount } from '@material-ui/core/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LogInPage from '../pages/LogIn/index';
import { Button } from '@material-ui/core';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import axios from 'axios';

configure({ adapter: new Adapter() });

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const err = {
  response: {
    status: 400,
    data: 'Bad request',
  },
  isAxiosError: true,
};

const res = {
  data: { token: 'raghoi4qtadrfohjig43' }, // just some arbitrarily chosen token
  status: 200,
  statusText: 'OK',
};

describe('Testing LogIn Page', () => {
  let mount: any;
  let wrapper: any;
  let button: any;
  let registerLink: any;
  const history = createMemoryHistory();

  //The input fields
  let usernameInput: any;
  let passwordInput: any;

  beforeEach(() => {
    mount = createMount();
    wrapper = mount(
      <Router history={history}>
        <ToastContainer />
        <LogInPage />
      </Router>,
    );
    usernameInput = screen.getByPlaceholderText('brukernavn');
    passwordInput = screen.getByPlaceholderText('passord');
    button = wrapper.find(Button);
    registerLink = screen.getByText('Har du ikke bruker? Registrer deg her');
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: 'def' } });
  });
  test('Testing if username field has to be filled in', async () => {
    fireEvent.change(usernameInput, { target: { value: '' } });
    button.simulate('click');
    await screen.findByText('Du må skrive inn begge feltene');
  });
  test('Testing if password field has to be filled in', async () => {
    fireEvent.change(passwordInput, { target: { value: '' } });
    button.simulate('click');
    await screen.findByText('Du må skrive inn begge feltene');
  });
  test('Testing clicking register redirects to register page', async () => {
    fireEvent.click(registerLink);
    expect(history.location.pathname).toBe('/regin');
  });
  test('Testing failed login', async () => {
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    mockedAxios.post.mockRejectedValue(err);
    button.simulate('click');
    await screen.findByText('Ukjent brukernavn / passord');
  });
  test('Testing successful login', async () => {
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    mockedAxios.post.mockResolvedValue(res);
    button.simulate('click');
    await screen.findByText('Du er logget inn!');
  });

  // Clean up after the tests
  afterEach(() => {
    mount.cleanUp();
  });
});
