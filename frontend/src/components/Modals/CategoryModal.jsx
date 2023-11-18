import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import React from 'react'
import style from '../../styles/modal'
import { Field, Form, Formik } from 'formik';
import { useCategory } from '../../context/category';

const CategoryModal = ({modalData, open, closeModal, edit}) => {

  const initialValues = edit? modalData : ({name:''})
  const {create, update}= useCategory()
  

    const handleSubmit= (values, actions)=>{
        actions.setSubmitting(false);
        console.log(values.name)
        if(!edit) create(values) 
        else update(values._id, {name: values.name})
        actions.resetForm();
        closeModal()

    }

    const handleClose =()=>{
        closeModal()
    }
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
                    label="Category Name"
                    required
                    fullWidth
                    sx={{mb:2}}
                    >
                    </Field>

                    <Stack direction="row" justifyContent="space-between">
                        <Button type='submit' variant='contained' size="large"> 
                        
                        {edit? 'Update Category': 'Add new Category'}
                         </Button>
                        <Button type='button' variant='contained' size="large" color="error" onClick={handleClose}>Cancel </Button>

                    </Stack>
                </Form>
            </Formik>
            </Stack>
        </Box>
    </Modal>
  )
}

export default CategoryModal