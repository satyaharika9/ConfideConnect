import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Link, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import userService from "../../services/userService";
import { setUser, setTokens } from "../../store/slices/user-slice";


const Login = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userInfo) => {
    try {
      const authInfo = await userService.login(userInfo);
      console.log("AuthInfo: ", authInfo);
      const user = await userService.getUser(authInfo);
      console.log("User details fetched: ", user);
      const specificUserDetails = await userService.getUserDetails(user, authInfo);
      console.log("Specific User details fetched: ", specificUserDetails);
      dispatch(setUser({
        ...specificUserDetails,
        ...user
      }));
      dispatch(setTokens(authInfo));
      navigate(`/${user.role}`);
      setError(null);
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      setError("Loggin in failed. Please try again.");
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}>
      <Box sx={{ width: '40vw' }}>
        <Typography variant="h2" color="primary">Login</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Login form values: ", values);
            const userInfo = {
              "username": values.username,
              "password": values.password
            }
            login(userInfo);
          }}
        >
          <Form>
            <Field name="username">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="username" />
            </FormHelperText>

            <Field name="password">
              {({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="password" />
            </FormHelperText>

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Form>
        </Formik>
        <Typography variant="body2" mt={2}>
          Don't have an account? <Link onClick={handleSignupClick} underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;