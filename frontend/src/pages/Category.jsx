import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOulineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useCategory } from "../context/category";
import {CategoryModal} from "../components";

const Categories = () => {
  const { list, categories, remove } = useCategory();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData]= useState({})
  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };
  const openModal = () => setOpen(true);

  useEffect(() => {
    list();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (category) => {

    setModalData(category)
    setEdit(true);
    setOpen(true);
    
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
         
          Categories
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Catrgory
        </Button>
      </Stack>

      <Container maxWidth="xl">
        {categories.length >= 1 ? (
          <TableContainer component={Paper} sx={{ alignItems: "center" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"> # </TableCell>
                  <TableCell align="center" > Name</TableCell>
                  <TableCell align="center" ></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {categories?.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:lastchild td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center"> {index + 1}</TableCell>
                    <TableCell align="center" > {row.name}</TableCell>
                    <TableCell align="right">
                      <EditIcon
                        sx={{ color: "goldenrod", cursor: "pointer", mx: 2 }}
                        onClick={() => handleEdit(row)}
                      />
                      <DeleteOulineIcon
                        sx={{ color: "red", cursor: "pointer", mx: 2 }}
                        onClick={() => remove(row._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h4" align="center">
            No Categories
          </Typography>
        )}
      </Container>

      <CategoryModal open={open} closeModal={closeModal} edit={edit} modalData={modalData} />
    </Box>
  );
};

export default Categories;
