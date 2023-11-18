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
import { useTodo } from "../../context/todo";
import { useCategory } from "../../context/category";

const TodoModal = ({ modalData, open, closeModal, edit }) => {
  if (edit) {
    modalData.isActive === "Yes"
      ? (modalData.isActive = true)
      : (modalData.isActive = true);
    modalData.emailVerified === "Yes"
      ? (modalData.emailVerified = true)
      : (modalData.emailVerified = true);
    modalData.role === "ADMIN"
      ? (modalData.role = "admin")
      : (modalData.role = "user");
  }

  const initialValues = edit
    ? modalData
    : {
        title: "",
        description: "",
        userId: localStorage.getItem("username"),
        categoryId: "",
      };
  const { create, update } = useTodo();
  const { categories } = useCategory();
  console.log(categories)

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    values.userId = localStorage.getItem("id")

   
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
                name="title"
                variant="outlined"
                label="Title"
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                type="text"
                name="description"
                variant="outlined"
                label="Description"
                required
                fullWidth
                sx={{ mb: 2 }}
              />

              <Field
                as={TextField}
                type="text"
                name="userId"
                variant="outlined"
                label="Username"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ mb: 2 }}
              />

    
              <FormControl sx={{ width: "100%", mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Field
                  as={Select}
                  name="categoryId"
                  variant="outlined"
                  label="Active"
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {categories.map(cat=> <MenuItem value={cat._id} key={cat._id}>{cat.name}</MenuItem>)}
   
                </Field>
              </FormControl>
             
              <Stack direction="row" justifyContent="space-between">
                <Button type="submit" variant="contained" size="large">
                  {edit ? "Update Todo" : "Add new Todo"}
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

export default TodoModal;
