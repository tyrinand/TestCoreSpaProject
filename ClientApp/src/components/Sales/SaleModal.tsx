import React from 'react';
import { ISalesView } from './../../Interface/MainTypes';
import { makeStyles } from 'tss-react/mui';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';

interface ISaleModalProps {
  sale: ISalesView,
  iconClassName: string
}

const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      position: 'absolute',
      width: 500,
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      textAlign: "center",
      padding: "25px"
    },
    titles:
    {
      fontWeight: 'bold'
    },
    table:
    {
      width: "70%"
    }
  }
});

const SaleModal = (props: ISaleModalProps) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen(true);
  }

  const handelClose = () => {
    setOpen(false);
  }

  const sale = props.sale;
  

  const body = (
    <div className={classes.paper}>
      <Grid container spacing={0} justifyContent="center">
        <Grid item md={11}>
          <span>Sales Information</span>
        </Grid>
        <Grid item md={1}>
          <CloseIcon
            className={props.iconClassName}
            onClick={handelClose}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={0} justifyContent="center">
        <Table size="medium" className={classes.table} >
          <TableBody>
            <TableRow key={sale.softName}>
              <TableCell className={classes.titles} align="left">Software</TableCell>
              <TableCell align="left">{sale.softName}</TableCell>
            </TableRow>
            <TableRow key={sale.priceOne}>
              <TableCell className={classes.titles} align="left">Unit price</TableCell>
              <TableCell align="left">{sale.priceOne}</TableCell>
            </TableRow>
            <TableRow key={sale.count}>
              <TableCell className={classes.titles} align="left">Quantity</TableCell>
              <TableCell align="left">{sale.count}</TableCell>
            </TableRow>
            <TableRow key={sale.summ}>
              <TableCell className={classes.titles} align="left">The amount</TableCell>
              <TableCell align="left">{sale.summ}</TableCell>
            </TableRow>
            <TableRow key={sale.dateBuyStr}>
              <TableCell className={classes.titles} align="left">Date</TableCell>
              <TableCell align="left">{sale.dateBuyStr}</TableCell>
            </TableRow>
            <TableRow key={sale.clientName}>
              <TableCell className={classes.titles} align="left">Client</TableCell>
              <TableCell align="left">{sale.clientName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </div>
  );

  return (
    <>
      <VisibilityIcon
        className={props.iconClassName}
        onClick={handelOpen}
      />
      <Modal
        open={open}
        onClose={handelClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default SaleModal;