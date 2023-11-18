import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOulineIcon from "@mui/icons-material/DeleteOutline";

import { TodoModal } from "../components";
import { useTodo } from "../context/todo";

const TodoTable = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState({});

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  const { todos, remove } = useTodo();


  const handleEdit = (todo) => {

    setModalData(todo);
    setEdit(true);
    setOpen(true);
  };

  const columns = [
    { field: "id", width: 50, headerClass: "hidden-header" },
    { field: "no", headerName: "#", width: 50 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "createdAt", headerName: "CreatedId", width: 150 },
    { field: "isCompleted", headerName: "Completed", width: 150 },

    {
      field: "Actions",
      renderCell: (params) => (
        <Stack direction="row" spacing={3}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ color: "orange" }} />
          </IconButton>
          <IconButton onClick={() => remove(params.row.id)}>
            <DeleteOulineIcon sx={{ color: "red" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];
  
let rows;
if(todos.length>=1){
  rows = todos?.map((todo, index) => ({
    id: todo?._id,
    no: index + 1,
    username: todo?.userId?.username,
    category: todo?.categoryId?.name,
    title: todo?.title,
    description: todo.description,
    createdAt: new Date(todo?.createdAt).toLocaleDateString(),
    isCompleted: todo?.isCompleted?'Yes':'No'
  }));
}

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography variant="h5" component="h1" color="inherit" noWrap>
          Todos
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Todo
        </Button>
      </Stack>

      <Container maxWidth="xl">
        {todos.length>=1?(
        <DataGrid
        columns={columns}
        rows={rows}
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
        sx={{
          bgcolor: "white",
          "&.MuiDataGrid-root .MuiDataGrid-cell": {
            outline: "none !important",
          },
        }}
      />
        ):(
          <Typography align="center" variant="h5">No Todos, add one</Typography>
        )}

      </Container>

      <TodoModal
        open={open}
        edit={edit}
        closeModal={closeModal}
        modalData={modalData}
      />
    </Box>
  );
};

export default TodoTable;
