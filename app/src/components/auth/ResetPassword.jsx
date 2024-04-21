import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Link, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import userService from "../../services/userService";


const ResetPassword = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let { token } = useParams();
  const resetPassword = async (userInfo) => {
    try {
      if (userInfo.password != userInfo.confirmPassword) {
        throw Error("Password and Confirm Password are not same") 
      }
      console.log("userInfo ", userInfo)
      const authInfo = await userService.resetPassword(userInfo, token);
      if (authInfo.success == false) {
        throw ErrorMessage("Password change failed")
      }
      console.log(authInfo);
      alert("Password Change successfull")
      navigate(`/login`);
      setError(null);
    } catch (error) {
      console.error(`Error Reset password: ${error}`);
      setError("Password does not match");
    }
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
        <Typography variant="h2" color="primary">Type your new password</Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Formik
          initialValues={{
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            password: Yup.string().required('Email is required'),
            confirmPassword: Yup.string().required('Email is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Password: ", values);
            const userInfo = {
              "password": values.password,
              "confirmPassword": values.confirmPassword
            }
            resetPassword(userInfo);
          }}
        >
          <Form>
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
              <ErrorMessage name="Email" />
            </FormHelperText>
            <Field name="confirmPassword">
              {({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            </Field>
            <FormHelperText error>
              <ErrorMessage name="Email" />
            </FormHelperText>
            <Button type="submit" variant="contained" color="primary">
              Confirm Password change
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;
