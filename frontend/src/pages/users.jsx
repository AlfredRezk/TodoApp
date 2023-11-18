import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOulineIcon from "@mui/icons-material/DeleteOutline";

import { UserModal } from "../components";
import { useUser } from "../context/user";
const User = () => {
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
  const { users, list, remove } = useUser();

  useEffect(() => {
    list();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (user) => {
    setModalData(user);
    setEdit(true);
    setOpen(true);
  };

  const columns = [
    { field: "id", width: 50, headerClass: "hidden-header" },
    { field: "no", headerName: "#", width: 50 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isActive", headerName: "Active", width: 200 },
    { field: "emailVerified", headerName: "Verified", width: 200 },
    { field: "role", headerName: "Role", width: 200 },

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
  

  const rows = users.map((user, index) => ({
    id: user?._id,
    no: index + 1,
    username: user?.username,
    name: user?.name,
    email: user?.email,
    isActive: user?.isActive ? "Yes" : "No",
    emailVerified: user?.emailVerified ? "Yes" : "No",
    role: user?.role.toUpperCase()
  }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography variant="h5" component="h1" color="inherit" noWrap>
          Users
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New User
        </Button>
      </Stack>

      <Container maxWidth="xl">
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
      </Container>

      <UserModal
        open={open}
        edit={edit}
        closeModal={closeModal}
        modalData={modalData}
      />
    </Box>
  );
};

export default User;
