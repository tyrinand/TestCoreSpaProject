import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

interface IBtnCreate{
  url : string
}

const CreateBtn = (props : IBtnCreate) => {
    return (
        <Grid container spacing={0} justifyContent="center" style={{ marginTop : "1%" }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          component={NavLink} to={props.url}
          >
            Add New
          </Button>
        </Grid> 
    );
}

export default CreateBtn;