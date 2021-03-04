import { makeStyles } from '@material-ui/core';

const useDinnerPageStyles = makeStyles({
  dinnerPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
  },
  halfWidthLeft: {
    width: '40%',
    textAlign: 'left',
  },
  dinnerPageHeadline: {
    textAlign: 'center',
    padding: '5px',
    color: '#e85d04',
  },
  dinnerPageH1: {
    color: '#e85d04',
    marginBottom: '0%',
  },
  dinnerPageH3: {
    color: 'black',
    borderBottom: '#e85d04 solid 1px',
    marginTop: '1.5px',
    padding: '2px',
  },
  dinnerPageImage: {
    height: '250px',
    objectFit: 'cover',
    alignSelf: 'center',
  },
  signUp: {
    backgroundColor: '#e85d04',
    padding: '20px',
    margin: '15px',
    textAlign: 'center',
    borderRadius: '5px',
    border: 'none',
    width: '20%',
    color: 'white',
    fontSize: '18px',
  },
});

export default useDinnerPageStyles;
