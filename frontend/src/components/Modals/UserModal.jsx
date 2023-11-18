import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import style from "../../styles/modal";
import { Field, Form, Formik } from "formik";
import { useUser } from "../../context/user";

const UserModal = ({ modalData, open, closeModal, edit }) => {

 if(edit){
    modalData.isActive==='Yes'?modalData.isActive=true:modalData.isActive=true;
    modalData.emailVerified==='Yes'?modalData.emailVerified=true:modalData.emailVerified=true;
    modalData.role==='ADMIN'?modalData.role="admin":modalData.role="user";

 }
 console.log(modalData)
  const initialValues = edit
    ? modalData
    : {
        name: "",
        email: "",
        username: "",
        isActive: "",
        emailVerified: "",
        role: "user",
      };
  const { create, update } = useUser();

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    console.log(values);
    if (!edit) create(values);
    else update(values.id, values);
    actions.resetForm();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Stack spacing={4}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                as={TextField}
                type="text"
                name="name"
                variant="outlined"
                label="Name"
                required
                fullWidth
                sx={{ mb: 2 }}
              />

              <Field
                as={TextField}
                type="text"
                name="username"
                variant="outlined"
                label="Username"
                required
                fullWidth
                sx={{ mb: 2 }}
              />

              <Field
                as={TextField}
                type="email"
                name="email"
                variant="outlined"
                label="Email"
                required
                fullWidth
                sx={{ mb: 2 }}
              />
                            {!edit&&<Field
                as={TextField}
                type="password"
                name="password"
                variant="outlined"
                label="Password"
                required
                fullWidth
                sx={{ mb: 2 }}
              />}
              <FormControl sx={{ width: "100%", mb: 2 }}>
                <InputLabel>Email Verified</InputLabel>
                <Field
                  as={Select}
                  name="emailVerified"
                  variant="outlined"
                  label="Active"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value={true}>YES</MenuItem>
                  <MenuItem vaue={false}>NO</MenuItem>
                </Field>
              </FormControl>
              <FormControl sx={{ width: "100%", mb: 2 }}>
                <InputLabel>Active</InputLabel>
                <Field
                  as={Select}
                  name="isActive"
                  variant="outlined"
                  label="Active"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value={true}>YES</MenuItem>
                  <MenuItem vaue={false}>NO</MenuItem>
                </Field>
              </FormControl>

              <FormControl sx={{ width: "100%", mb: 2 }}>
                <InputLabel>Role</InputLabel>
                <Field
                  as={Select}
                  name="role"
                  variant="outlined"
                  label="Role"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem vaue="user">USER</MenuItem>
                  <MenuItem value="admin">ADMIN</MenuItem>
                </Field>
              </FormControl>

              <Stack direction="row" justifyContent="space-between">
                <Button type="submit" variant="contained" size="large">
                  {edit ? "Update User" : "Add new User"}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel{" "}
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UserModal;
