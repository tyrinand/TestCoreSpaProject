import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ISoft, IComponentStatus, PagesData } from './../../Interface/MainTypes';
import { get } from './../../Utils/Fetch';
import { serverUrlSofts } from './../../Interface/ServerRouteConst';
import { softRoute, softCreateRoute, softEditPath } from './../../Interface/RouteConst';
import Loader from '../Common/Loader/Loader';
import ShowError from '../Common/ShowError/ShowError';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreateBtn from './../Buttons/CreateBtn';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SoftModal from './SoftModal';
import EditBtn from '../Buttons/EditBtn';
import DeleteBtn from '../Buttons/DeleteBtn';
import PaginationBtn from './../Buttons/PaginationBtn';

const useStyles = makeStyles()((theme) => {
  return {
    titles:
    {
      fontWeight: 'bold',
      width: "20%"
    },
    icons: {
      cursor: "pointer"
    }
  }
});


const Softs = () => {
  let history = useHistory();
  const { classes } = useStyles();
  const { page } = useParams<{ page?: string }>();
  const pageNum: number = page ? Number(page) : 1;
  const pageNumSize = 2; // для теста



  const [softs, setSofts] = useState<Array<ISoft> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<IComponentStatus>('idle');
  const [countpageNum, setCountpageNum] = useState<number>(0);

  useEffect(() => {
    get<PagesData<ISoft>>(`${serverUrlSofts}/?PageNumber=${pageNum}&PageSize=${pageNumSize}`)
      .then((response: PagesData<ISoft>) => {
        setSofts(response.items);
        setCountpageNum(response.countPage);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error);
        setStatus('error');
      })
  }, [pageNum])

  //удаление из vies
  const dropInList = (id: number): void => {
    if (softs != null) {
      const newArray: Array<ISoft> = softs.filter(x => x.id !== id);

      if (newArray.length > 0) {
        setSofts(newArray);
      }
      else {
        const url: string = `${softRoute}/page/${pageNum - 1}`;
        history.push(url);
      }
    }
  }

  if (error) {
    return <ShowError message={error.stack ? error.stack : error.message} />
  }

  if (status === 'pending' || status === 'idle') {
    return <Loader />
  }

  if (status === "success" && softs != null && softs.length === 0) {
    return (
      <Grid container spacing={0} justifyContent="center">
        <Typography variant='subtitle2' >Empty list</Typography>
        <CreateBtn url={softCreateRoute} />
      </Grid>
    );
  }

  if (status === "success" && softs != null) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.titles}>Name</TableCell>
                <TableCell align="center" className={classes.titles}>Description</TableCell>
                <TableCell align="center" className={classes.titles}>Price</TableCell>
                <TableCell align="center" className={classes.titles}>Quantity</TableCell>
                <TableCell align="center" className={classes.titles}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {softs.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.count}</TableCell>
                  <TableCell align="center">
                    <SoftModal
                      iconClassName={classes.icons}
                      soft={item}
                    />
                    <EditBtn
                      id={item.id}
                      url={softEditPath}
                      className={classes.icons}
                    />
                    <DeleteBtn
                      id={item.id}
                      url={serverUrlSofts}
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
        <CreateBtn url={softCreateRoute} />
        <br />
        <PaginationBtn
          to={softRoute}
          page={pageNum}
          count={countpageNum}
        />
      </>
    )
  }

  return (
    <div>440</div>
  )

}
export default Softs;

