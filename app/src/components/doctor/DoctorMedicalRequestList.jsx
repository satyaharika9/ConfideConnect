import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';

import medicalRequestService from '../../services/medicalrequestService';
import doctorService from "../../services/doctorService";


const DoctorMedicalRequestList = () => {

    const user = useSelector((state) => state.user);

    const [medicalRequests, setMedicalRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const medicalrequests = await medicalRequestService.getMedicalRequestsForDoctor(user.user.doctorId);
                const medicalRequestsWithDoctorDetails = await Promise.all(
                    medicalrequests.map(async medicalrequest => {
                        const doctor = await doctorService.getDoctor(medicalrequest.doctorId);
                        return { medicalrequest, doctor };
                    })
                );
                console.log("requestsWithDoctorsDetails : ", medicalRequestsWithDoctorDetails);
                setMedicalRequests(medicalRequestsWithDoctorDetails);
            } catch (error) {
                console.error('Error fetching medical requests or doctors:', error);
            }
        };

        fetchData();
    }, []);

    const handleChatClick = () => {
        console.log('Chat button clicked');
    };

    const handleDeleteClick = () => {
        console.log('Delete button clicked');
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table aria-label="medical request table">
                <TableHead>
                    <TableRow>
                        <TableCell>Request</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicalRequests.map((request, index) => (
                        <TableRow key={index}>
                            <TableCell>{request.medicalrequest.requestName}</TableCell>
                            <TableCell>{request.medicalrequest.requestDescription}</TableCell>
                            <TableCell>{request.medicalrequest.creationTime}</TableCell>
                            <TableCell>{request.medicalrequest.status}</TableCell>
                            <TableCell>
                                <Tooltip title={`Chat with patient`}>
                                    <Button onClick={() => handleChatClick()}><ChatIcon /></Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Delete Request">
                                    <Button onClick={() => handleDeleteClick()}><DeleteIcon /></Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DoctorMedicalRequestList;