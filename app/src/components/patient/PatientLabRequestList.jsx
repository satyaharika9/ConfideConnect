import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';

import labRequestService from "../../services/labrequestService";
import labService from "../../services/labService";


const PatientLabRequestList = () => {

    const user = useSelector((state) => state.user);

    const [labRequests, setLabRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const labrequests = await labRequestService.getLabRequestsForPatient(user.user.patientId);
                const requestsWithLabsDetails = await Promise.all(
                    labrequests.map(async labrequest => {
                        const lab = await labService.getLab(labrequest.labId);
                        return { labrequest, lab };
                    })
                );
                console.log("requestsWithLabsDetails : ", requestsWithLabsDetails);
                setLabRequests(requestsWithLabsDetails);
            } catch (error) {
                console.error('Error fetching lab requests or labs:', error);
            }
        };

        fetchData();
    }, []);

    const handleChatClick = () => {
        console.log('Chat button clicked');
    };

    const handleDownloadClick = () => {
        console.log('Download button clicked');
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
                        <TableCell>Lab</TableCell>
                        <TableCell>Report</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {labRequests.map((request, index) => (
                        <TableRow key={index}>
                            <TableCell>{request.labrequest.requestName}</TableCell>
                            <TableCell>{request.labrequest.requestDescription}</TableCell>
                            <TableCell>{request.labrequest.createdDate}</TableCell>
                            <TableCell>{request.labrequest.status}</TableCell>
                            <TableCell>{request.lab.name}
                                <Tooltip title={`Chat with ${request.lab.name} lab`}>
                                    <Button onClick={() => handleChatClick()}><ChatIcon /></Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Download Report">
                                    <Button onClick={() => handleDownloadClick()}><GetAppIcon /></Button>
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

export default PatientLabRequestList;