import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useArticle from '../hooks/useArticle';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

function TableData() {

  const navigate = useNavigate();
  const articles = useArticle();

  //handler
  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/article/${id}`);
      toast.success("Delete successful!");
      window.location.reload();
    } catch (error) {
      console.error("Error on delete");
      toast.error("Error on delete!");
    }
  }

  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell>
                    No record found !
                  </TableCell>

                </TableRow>
              ) : (articles?.map((article) => (
                <TableRow
                  key={article.nom}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {article.nom}
                  </TableCell>
                  <TableCell>{article.quantity}</TableCell>
                  <TableCell>
                    <Button size='small' sx={{ mr: 1 }} variant='contained' color='secondary' onClick={() => navigate('/article/' + article.id)}>Edit</Button>
                    <Button size='small' variant='contained' color='error' onClick={() => handleDelete(article.id)}>delete</Button>
                  </TableCell>
                </TableRow>
              )))}

            </TableBody>
          </Table>
        </TableContainer >
        <Button
          sx={{ mt: 2 }} variant='contained' color='success'
          onClick={() => navigate('/article')}
        >New</Button>
      </Container>
    </>

  );
}
export default TableData;
