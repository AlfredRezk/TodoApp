import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/auth";
const URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showNewPassword2, setNewShowPassword2] = useState(false);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  };

  const { user, updatePassword } = useAuth();

  const proifleSchema = yup.object().shape({
    currentPassword:yup.string().required('Current Password is required'),

    newPassword: yup
      .string()
      .min(8, "Password minimum 8 characters")
      .max(12)
      .matches(/\d+/, "Password should include at least 1 number")
      .matches(
        /[a-z]+/,
        "Password should include at least 1 lowercase character",
      )
      .matches(
        /[A-Z]+/,
        "Password should include at least 1 uppercase character",
      )
      .matches(
        /[!,?{}<>%#+-.]+/,
        "Password should include at least 1 special character",
      )
      .required("Password is required"),
    newPassword2: yup
      .string()
      .min(8, "Password minimum 8 characters")
      .max(12)
      .matches(/\d+/, "Password should include at least 1 number")
      .matches(
        /[a-z]+/,
        "Password should include at least 1 lowercase character",
      )
      .matches(
        /[A-Z]+/,
        "Password should include at least 1 uppercase character",
      )
      .matches(
        /[!,?{}<>%#+-.]+/,
        "Password should include at least 1 special character",
      )
      .required("Password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.newPassword === value;
      }),
  });

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);

    updatePassword(values)
    actions.resetForm();
  };

  return (
    <Box p={5}>


      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Avatar
                    src={`${URL}${user.image}`}
                    alt={user?.username?.toUpperCase()}
                    variant="square"
                    sx={{ width: 100, height: 100, fontSize: 50 }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Username:
                          </Typography>
                          <Typography variant="subtitle1">
                            {user?.username}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Email:
                          </Typography>
                          <Typography variant="subtitle1">{user?.email} </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Name:
                          </Typography>
                          <Typography variant="subtitle1">
                            {user?.name}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitl2"> Change Password</Typography>

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={proifleSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        as={TextField}
                        type={showOldPassword ? "text" : "password"}
                        variant="outlined"
                        label="Current Password"
                        fullWidth
                        name="currentPassword"
                        margin="dense"
                        error={
                          Boolean(errors.currentPassword) &&
                          Boolean(touched.currentPassword)
                        }
                        helperText={
                          Boolean(touched.currentPassword) ? errors.currentPassword : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  setOldShowPassword(!showOldPassword)
                                }
                              >
                                {showNewPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field
                        as={TextField}
                        type={showNewPassword ? "text" : "password"}
                        variant="outlined"
                        label="New Password"
                        fullWidth
                        name="newPassword"
                        margin="dense"
                        error={
                          Boolean(errors.newPassword) &&
                          Boolean(touched.newPassword)
                        }
                        helperText={
                          Boolean(touched.newPassword)
                            ? errors.newPassword
                            : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  setNewShowPassword(!showNewPassword)
                                }
                              >
                                {showOldPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field
                        as={TextField}
                        type={showNewPassword2 ? "text" : "password"}
                        variant="outlined"
                        label="Confirm New Password"
                        fullWidth
                        name="newPassword2"
                        margin="dense"
                        error={
                          Boolean(errors.newPassword2) &&
                          Boolean(touched.newPassword2)
                        }
                        helperText={
                          Boolean(touched.newPassword2)
                            ? errors.newPassword2
                            : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 2 }}>
                              <IconButton
                                edge="end"
                                onClick={() =>
                                  setNewShowPassword2(!showNewPassword2)
                                }
                              >
                                {showNewPassword2 ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2, width: "100%" }}
                      >
                        {" "}
                        Change Password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item>
                <Box m={3} mt={5}>
                  <Typography variant="body2" gutterBottom>
                    Password minimum 8 characters
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 number'
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 lowercase character
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 uppercase character
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 special character
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
