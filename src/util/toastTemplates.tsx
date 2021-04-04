import { Button } from '@material-ui/core';
import React from 'react';
import { toast } from 'react-toastify';

export const areYouSure = (text: String, actionOnYes: () => void) => {
  toast.warn(
    ({ closeToast }) => (
      <div>
        {text}
        <br />
        <br />
        <Button variant="contained" color="default" onClick={closeToast}>
          Nei
        </Button>
        <Button variant="contained" color="secondary" onClick={actionOnYes}>
          Ja
        </Button>
      </div>
    ),
    {
      autoClose: false,
    },
  );
};
