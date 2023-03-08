import React from 'react';
import { get } from './../../Utils/Fetch';
import { useState, useEffect } from 'react';
import { IClient, IComponentStatus, PagesData } from './../../Interface/MainTypes';
import { serverUrlClients } from './../../Interface/ServerRouteConst';
import { makeStyles } from 'tss-react/mui';
import { useHistory, useParams } from 'react-router-dom';
import { clientsRoute, clientEditPath, clientCreateRoute } from './../../Interface/RouteConst';
import Loader from '../Common/Loader/Loader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreateBtn from './../Buttons/CreateBtn';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import ClientModal from './ClientModal';
import EditBtn from '../Buttons/EditBtn';
import DeleteBtn from '../Buttons/DeleteBtn';
import PaginationBtn from './../Buttons/PaginationBtn';
import ShowError from '../Common/ShowError/ShowError';

const useStyles = makeStyles()((theme) => {
  return {
    titles:
    {
      fontWeight: 'bold',
      width: "33%"
    },
    icons: {
      cursor: 'pointer'
    }
  }
});

const Clients = () => {
  let history = useHistory();
  const { classes } = useStyles();
  const { page } = useParams<{ page?: string }>();
  const pageNum: number = page ? Number(page) : 1;

  const pageSize = 2; // для теста

  const [clients, setClients] = useState<Array<IClient> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<IComponentStatus>('idle');
  const [countPage, setCountPage] = useState<number>(0);

  const targetUrl = `${serverUrlClients}/?PageNumber=${pageNum}&PageSize=${pageSize}`;

  useEffect(() => {

    get<PagesData<IClient>>(targetUrl)
      .then((response: PagesData<IClient>) => {
        setClients(response.items);
        setCountPage(response.countPage);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error);
        setStatus('error');
      })
  }, [targetUrl])


  const dropInList = (id: number): void => {
    if (clients != null) {
      const newArray: Array<IClient> = clients.filter(x => x.id !== id);
      if (newArray.length > 0) {
        setClients(newArray);
      }
      else {
        const url: string = `${clientsRoute}/page/` + (pageNum - 1);
        history.push(url);
      }
    }
  }


  if (error)
  {
    return <ShowError message={error.stack ? error.stack : error.message} />
  }
      

  if (status === 'pending' || status === 'idle')
    return <Loader />



  if (status === "success" && clients != null && clients.length === 0) {
    return (
      <Grid container spacing={0} justifyContent="center">
        <Typography variant='subtitle2' >Empty list</Typography>
        <CreateBtn url={clientCreateRoute} />
      </Grid>
    );
  }


  if (status === "success" && clients != null) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow >
                <TableCell align="center" className={classes.titles}>Full name</TableCell>
                <TableCell align="center" className={classes.titles}>Customer rating</TableCell>
                <TableCell align="center" className={classes.titles}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.mark}</TableCell>
                  <TableCell align="center">
                    <ClientModal
                      iconClassName={classes.icons}
                      client={item}
                    />
                    <EditBtn
                      id={item.id}
                      url={clientEditPath}
                      className={classes.icons}
                    />
                    <DeleteBtn
                      id={item.id}
                      url={serverUrlClients}
                      updateList={dropInList}
                      setError={setError}
                      setStatus={setStatus}
                      className={classes.icons}
                    />

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <CreateBtn url={clientCreateRoute} />
        <br />
        <PaginationBtn
          to={clientsRoute}
          page={pageNum}
          count={countPage}
        />

      </>
    )
  }

  return (
    <div>440</div>
  )
}
export default Clients;

