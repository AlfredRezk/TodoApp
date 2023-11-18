import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
	Stack, 
	Button,
  InputAdornment,
  IconButton,
  Container
} from "@mui/material";
import AuthImage from "../assets/images/auth.gif";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";


import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from "../context/auth";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const navigate = useNavigate()
  
  const {register} = useAuth()

  const initialValues = {
    username: "",
    email: "",
    name: "",
    password: "",
    password2: "",
  };
  const regiterSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
		email: yup.string().email('Email Invalid').required('Email is requird'),
		name: yup.string().required("First name is required"),
		password: yup.string().min(8, 'Password minimum 8 characters').max(12)
		.matches(/\d+/, 'Password should include at least 1 number')
		.matches(/[a-z]+/, 'Password should include at least 1 lowercase character')
		.matches(/[A-Z]+/, 'Password should include at least 1 uppercase character')
		.matches(/[!,?{}<>%#+-.]+/, 'Password should include at least 1 special character')
		.required('Password is required')
  });

  const handleSubmit = (values, actions) => {
    console.log('Here')
    actions.setSubmitting(false);
    register(values);
    actions.resetForm();
  };

  return (
    <Box sx={{ width: "100%", height: "100vh"}}>

      <Container>
      <Grid container mt={5} alignItems="center" justifyContent="space-between" >
        <Grid item md={5}   display={{ xs: "none", md: "block" }}>
          <img src={AuthImage} alt="register" style={{ maxHeight: "100vh" }} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ padding: "1rem" }} elevation={4}>
            <CardContent>
              <Typography variant="h3" align="center" mb={3}>
                Register
              </Typography>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={regiterSchema}
              >
                {({errors, touched}) => (
                  <Form>
                    <Field
                      as={TextField}
                      type="text"
                      variant="outlined"
                      label="Username"
                      fullWidth
                      name="username"
                      margin="dense"
											error = {Boolean(errors.username)&& Boolean(touched.username)}
											helperText={Boolean(touched.username)?errors.username : ''}
                    />
                    <Field
                      as={TextField}
                      type="email"
                      variant="outlined"
                      label="Email"
                      fullWidth
                      name="email"
                      margin="dense"
											error = {Boolean(errors.email)&& Boolean(touched.email)}
											helperText={Boolean(touched.email)?errors.email : ''}
                    />
                    <Field
                      as={TextField}
                      type="text"
                      variant="outlined"
                      label="Name"
                      fullWidth
                      name="name"
                      margin="dense"
											error = {Boolean(errors.first_name)&& Boolean(touched.first_name)}
											helperText={Boolean(touched.first_name)?errors.first_name : ''}
                    />
                
                    <Field
                      as={TextField}
                      type={showPassword? 'text': 'password'}
                      variant="outlined"
                      label="Password"
                      fullWidth
                      name="password"
                      margin="dense"
											error = {Boolean(errors.password)&& Boolean(touched.password)}
											helperText={Boolean(touched.password)?errors.password : ''}
                      InputProps={{
                        endAdornment: 
                        <InputAdornment position="end" sx={{pr:2}}>
                          <IconButton edge="end" onClick={()=>setShowPassword(!showPassword)}>
                              {showPassword? <VisibilityOffIcon/> : <VisibilityIcon/>}
                          </IconButton>
                        </InputAdornment>
                      }}
                    />
                    <Field
                      as={TextField}
                      type={showPassword2? 'text': 'password'}
                      variant="outlined"
                      label="Confirm Password"
                      fullWidth
                      name="password2"
                      margin="dense"
											error = {Boolean(errors.password2)&& Boolean(touched.password2)}
											helperText={Boolean(touched.password2)?errors.password2 : ''}
                      InputProps={{
                        endAdornment: 
                        <InputAdornment position="end" sx={{pr:2}}>
                          <IconButton edge="end" onClick={()=>setShowPassword2(!showPassword2)}>
                              {showPassword2? <VisibilityOffIcon/> : <VisibilityIcon/>}
                          </IconButton>
                        </InputAdornment>
                      }}
                    />

										<Stack justifyContent="center" alignItems="center" mt={2}>
												<Button variant="contained" type="submit" size="large"> Register</Button>

										</Stack>
                  </Form>
                )}
              </Formik>
							<Typography variant="subtitle2" align="center" component="div"
								sx={{cursor:'pointer', mt:1, color: "goldenrod"}}
								onClick={()=>navigate('/login')}
							> Have an account ?</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      </Container>
    </Box>
  );
};

export default Register;
