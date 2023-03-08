import React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {

  return (
    <Grid container spacing={0} justifyContent="center">
      <CircularProgress disableShrink />
    </Grid>
  );

}
export default Loader;
