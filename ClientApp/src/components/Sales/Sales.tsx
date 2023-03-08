import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ISalesView, IComponentStatus, PagesData } from './../../Interface/MainTypes';
import { serverUrlSales } from './../../Interface/ServerRouteConst';
import { get } from './../../Utils/Fetch';
import { salesRoute, salesEditPath, salesCreateRoute } from './../../Interface/RouteConst';
import Loader from '../Common/Loader/Loader';
import ShowError from '../Common/ShowError/ShowError';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreateBtn from './../Buttons/CreateBtn';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import SaleModal from './SaleModal';
import EditBtn from '../Buttons/EditBtn';
import DeleteBtn from '../Buttons/DeleteBtn';
import PaginationBtn from './../Buttons/PaginationBtn';

const useStyles = makeStyles()((theme) => {
  return {
    titles: {
      fontWeight: 'bold',
      width: "14%"
    },
    icons: {
      cursor: "pointer"
    }
  }
})

const Sales = () => {

  let history = useHistory();
  const { classes } = useStyles();

  const { page } = useParams<{ page?: string }>();
  const pageNum: number = page ? Number(page) : 1;

  const pageSize = 2;

  const [sales, setSales] = useState<Array<ISalesView> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<IComponentStatus>('idle');
  const [countPage, setCountPage] = useState<number>(0);
  
  useEffect(() => {
    get<PagesData<ISalesView>>(`${serverUrlSales}/?PageNumber=${pageNum}&PageSize=${pageSize}`)
      .then((response: PagesData<ISalesView>) => {
        setSales(response.items);
        setCountPage(response.countPage);
        setStatus('success');
      })
      .catch((error: Error) => {
        setError(error);
        setStatus('error');
      })
  }, [pageNum]);

  const dropInList = (id: number): void => {
    if (sales != null) {
      const newArray: Array<ISalesView> = sales.filter(x => x.id !== id);

      if (newArray.length > 0) {
        setSales(newArray);
      }
      else {
        const url: string = `${salesRoute}/page/${pageNum - 1}`;
        history.push(url);
      }
    }
  }

  if (error) {
    return <ShowError message={error.stack ? error.stack : error.message} />
  }

  if (status === 'pending' || status === 'idle') {
    return (<Loader />);
  }

  if (status === "success" && sales != null && sales.length === 0) {
    return (
      <Grid container spacing={0} justifyContent="center">
        <Typography variant='subtitle2' >Empty list</Typography>
        <CreateBtn url={salesCreateRoute} />
      </Grid>
    );
  }

  if (status === "success" && sales != null) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.titles}>Software</TableCell>
                <TableCell align="center" className={classes.titles}>Unit price</TableCell>
                <TableCell align="center" className={classes.titles}>Quantity</TableCell>
                <TableCell align="center" className={classes.titles}>The amount</TableCell>
                <TableCell align="center" className={classes.titles}>Date</TableCell>
                <TableCell align="center" className={classes.titles}>Client</TableCell>
                <TableCell align="center" className={classes.titles}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.softName}</TableCell>
                  <TableCell align="center">{item.priceOne}</TableCell>
                  <TableCell align="center">{item.count}</TableCell>
                  <TableCell align="center">{item.summ}</TableCell>
                  <TableCell align="center">{item.dateBuyStr}</TableCell>
                  <TableCell align="center">{item.clientName}</TableCell>
                  <TableCell align="center">
                    <SaleModal
                      iconClassName={classes.icons}
                      sale={item}
                    />
                    <EditBtn
                      id={item.id}
                      url={salesEditPath}
                      className={classes.icons}
                    />
                    <DeleteBtn
                      id={item.id}
                      url={serverUrlSales}
                      updateList={dropInList}
                      setError={setError}
                      setStatus={setStatus}
                      className={classes.icons}
                    />
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <CreateBtn url={salesCreateRoute} />
        <br />
        <PaginationBtn
          to={salesRoute}
          page={pageNum}
          count={countPage}
        />
      </>
    );
  }

  return (<div>440</div>)
}

export default Sales;