import { makeStyles } from '@material-ui/core/styles';

const useCreateDinnerPageStyles = makeStyles({
  inputField: {
    width: '80%',
    marginLeft: '10%',
  },
  buttonField: {
    width: '150px',
    textAlign: 'center',
    backgroundColor: '#e85d04',
  },
  buttonDiv: {
    width: '100%',
    textAlign: 'center',
  },
  createDinnerContainer: {
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: '30%',
    width: '40%',
    marginTop: 100,
  },
  createDinnerH1: {
    textAlign: 'center',
    color: '#e85d04',
  },
  createDinnerH12: {
    width: '80%',
    marginLeft: '10%',
    color: '#e85d04',
  },
  createDinnerH2: {
    marginBottom: '0%',
    textAlign: 'left',
    fontFamily: 'Roboto, sans-serif',
  },
});

export default useCreateDinnerPageStyles;
