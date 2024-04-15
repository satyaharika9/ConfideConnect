import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Link, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import userService from "../../services/userService";


const Login = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (userInfo) => {
    try {
      const loggedInUser = await userService.login(userInfo);
      console.log("User logged in:", loggedInUser);
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
            console.log("Register form: ", values);
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
