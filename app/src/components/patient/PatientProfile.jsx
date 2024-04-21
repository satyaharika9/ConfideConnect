import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormHelperText, Alert, Modal, Box ,  Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import Typography from '@mui/material/Typography';

import patientService from "../../services/patientService";
import { useTranslation } from 'react-i18next';

const PatientProfileUpdate = ({ user, showProfileUpdate }) => {
    const [open, setOpen] = useState(true);
    const [error, setError] = useState(null);
    const [patient, setPatient] = useState({});

    // Function to handle internationalization
    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await patientService.getPatientById(user.user._id);
                console.log("response",response);
                setPatient({
                    ...response,
                    dob: response.dob ? formatDate(response.dob) : ''
                });
            } catch (error) {
                console.error('Get patient failed:', error);
                setError('Get patient failed');
            }
        };
        fetchPatient();
    }, [user.user._id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return [date.getFullYear(), (date.getMonth() + 1).toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
    };

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("values",values);
        console.log("inside submiittttt")
        patientService.updatePatient(user.user._id,values)
          .then(() => handleClose())
          .catch(err => {
            console.error('Update failed:', err);
            setError('Failed to update profile');
          })
          .finally(() => setSubmitting(false));
      };
    

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
    <Box>
            <Modal
        open={open}
        onClose={() => {setOpen(false);
           showProfileUpdate(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            height: '70%', 
            overflow: 'scroll' 
          }}
         >
             <Typography variant="h4" color="primary">
                {t('update_profile')}
             </Typography>
             {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
        
          <Formik
           key={patient.patientId || 'new-patient'}
            initialValues={
                {
                    ...patient,
            }}
            validationSchema={Yup.object({
                name: Yup.string(),
                phone: Yup.string().matches(/^\+?[0-9]{1,3}[0-9]{10}$/, 'Invalid phone number'),
                street: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                country: Yup.string(),
                zip: Yup.string(),
                gender: Yup.string(),
                languagePreference: Yup.string(),
                dob: Yup.date(),
            })}
            onSubmit={handleSubmit}
            >
                <Form>
                    <Field name="name">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Field>
                    <FormHelperText error>
                        <ErrorMessage name="name" />
                    </FormHelperText>

                    <Field name="phone">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Field>
                    <FormHelperText error>
                        <ErrorMessage name="phone" />
                    </FormHelperText>

                    <Field name="address.street">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Street"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="street" />
              </FormHelperText>

              <Field name="address.city">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="city" />
              </FormHelperText>

              <Field name="address.state">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="state" />
              </FormHelperText>

              <Field name="address.country">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="country" />
              </FormHelperText>

              <Field name="address.zip">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Zip"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <FormHelperText error>
                <ErrorMessage name="zip" />
              </FormHelperText>

<Field name="gender">
    {({ field, form, meta }) => (
        <FormControl fullWidth error={Boolean(meta.touched && meta.error)} margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
                labelId="gender-label"
                {...field}
                label="Gender"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched ? form.errors.gender : ""}
            >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
            </Select>
            {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
            ) : null}
        </FormControl>
    )}
</Field>

                <Field name="languagePreference">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Language Preference"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    />
                )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="languagePreference"/>
                </FormHelperText>

                <Field name="dob">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                   />
                )}
                </Field>
                <FormHelperText error>
                    <ErrorMessage name="dob"/>
                </FormHelperText>

                <Button type="submit" variant="contained" color="primary">
                {t('save_profile')}
              </Button>

                </Form>
            </Formik>
         </Box>
        </Modal>
    </Box>
        
    )
}

export default PatientProfileUpdate;
