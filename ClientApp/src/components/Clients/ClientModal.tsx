import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import {IClient} from './../../Interface/MainTypes';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface IClientModal {
    client : IClient,
    iconClassName : string
}


const useStyles = makeStyles()((theme) => {
  return {
    paper: {
        position: 'absolute',
        width: 500,
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor : "#fff",
        textAlign : "center",
        padding : "25px"
      },
    titles :
    {
        fontWeight : 'bold',
    },
    table :
    {
        width : "60%"
    }}
  });


export default function ClientModal(props : IClientModal) {

  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const client = props.client;

  const body = (
    <div className={classes.paper}>
      <Grid container spacing={0} justifyContent="center">
        <Grid item md={11}>
            <span>Customer Information</span>
        </Grid>
        <Grid item md={1}>
            <CloseIcon 
                className = {props.iconClassName}
                onClick = {handleClose}
            />
        </Grid>
    </Grid>
    <br/>
        <Grid container spacing={0} justifyContent="center">
            <Table  size="small" className={classes.table} >
                <TableBody>
                    <TableRow key={client.name}>
                        <TableCell className={classes.titles} align="left">Full name</TableCell>
                        <TableCell  align="left">{client.name}</TableCell>
                    </TableRow>
                    <TableRow key={client.mark}>
                        <TableCell className={classes.titles} align="left">Customer rating</TableCell>
                        <TableCell align="left">{client.mark}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Grid>
    </div>
  );

  return (
    <>
      <VisibilityIcon 
        className = {props.iconClassName}
        onClick = {handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

