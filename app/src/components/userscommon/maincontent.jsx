import React, { useState } from 'react';
import { Box} from '@mui/material';

import SubNavBar from "../userscommon/subnavbar";
import PatientLabRequestList from '../patient/PatientLabRequestList';
import PatientMedicalRequestList from '../patient/PatientMedicalRequestList';
import DoctorMedicalRequestList from '../doctor/DoctorMedicalRequestList';
import DoctorEventList from '../doctor/DoctorEventList';
import DoctorBlogList from '../doctor/DoctorBlogList';
import LabRequestList from '../lab/LabRequestList';
import LabEventList from '../lab/LabEventList';
import LabBlogList from '../lab/LabBlogList';


const tabMappings = {
    patient: ['Medical Requests', 'Lab Requests'],
    doctor: ['Medical Requests', 'Events', 'Blogs'],
    lab: ['Lab Requests', 'Events', 'Blogs']
};

const MainContent = ({ currentUser }) => {

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <SubNavBar items={tabMappings[currentUser.user.role]} handleTabChange={handleTabChange} tabIndex={tabIndex} />

            {currentUser.user.role == 'patient' &&
                tabMappings[currentUser.user.role].map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(index == tabIndex && index == 0) && <PatientMedicalRequestList key={index} />}
                            {(index == tabIndex && index == 1) && <PatientLabRequestList key={index} />}
                        </React.Fragment>)
                })
            }

            {currentUser.user.role == 'doctor' &&
                tabMappings[currentUser.user.role].map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(index == tabIndex && index == 0) && <DoctorMedicalRequestList key={index} />}
                            {(index == tabIndex && index == 1) && <DoctorEventList key={index} />}
                            {(index == tabIndex && index == 2) && <DoctorBlogList key={index} />}
                        </React.Fragment>)
                })
            }

            {currentUser.user.role == 'lab' &&
                tabMappings[currentUser.user.role].map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {(index == tabIndex && index == 0) && <LabRequestList key={index} />}
                            {(index == tabIndex && index == 1) && <LabEventList key={index} />}
                            {(index == tabIndex && index == 2) && <LabBlogList key={index} />}
                        </React.Fragment>)
                })
            }

        </Box>
    );
};

export default MainContent;